#!/usr/bin/env node
/**
 * Static sweep over src/ that the bundler cannot do for us.
 *
 *   1. every file parses
 *   2. every relative import resolves to a real file
 *   3. every *named* import exists in the target's exports, following
 *      `export * from` through barrels
 *   4. every navigation target is a route registered in the stack/tabs
 *   5. every Icon `name` is a real Lucide glyph
 *
 * Metro only proves 1 and 2 — a missing named export is `undefined` at
 * runtime, and a bad route or glyph name only shows up when you open the
 * screen. Run with `node scripts/verify.js`.
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const EXTS = ['.js', '.jsx', '.json'];

const problems = [];
const fail = (file, msg) => problems.push(`${path.relative(ROOT, file)}: ${msg}`);

/* ------------------------------------------------------------------ files */

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js') || e.name.endsWith('.jsx')) out.push(p);
  }
  return out;
}

const files = [...walk(SRC), path.join(ROOT, 'App.js'), path.join(ROOT, 'index.js')].filter(f =>
  fs.existsSync(f),
);

/* ----------------------------------------------------------------- parsing */

const asts = new Map();
for (const f of files) {
  try {
    asts.set(
      f,
      parser.parse(fs.readFileSync(f, 'utf8'), {
        sourceType: 'module',
        plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining', 'nullishCoalescingOperator'],
      }),
    );
  } catch (e) {
    fail(f, `parse error — ${e.message}`);
  }
}

/* --------------------------------------------------------------- resolving */

function resolve(fromFile, spec) {
  if (!spec.startsWith('.')) return null; // package; Metro's problem
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const c of [base, ...EXTS.map(e => base + e), ...EXTS.map(e => path.join(base, 'index' + e))]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return undefined; // unresolvable
}

/* ----------------------------------------------------------------- exports */

const exportCache = new Map();

function exportsOf(file, seen = new Set()) {
  if (exportCache.has(file)) return exportCache.get(file);
  if (seen.has(file)) return new Set();
  seen.add(file);

  const names = new Set();
  const ast = asts.get(file);
  if (!ast) {
    // .json or unparsed — assume anything goes rather than cry wolf
    exportCache.set(file, null);
    return null;
  }

  for (const node of ast.program.body) {
    if (node.type === 'ExportDefaultDeclaration') names.add('default');
    else if (node.type === 'ExportNamedDeclaration') {
      for (const s of node.specifiers || []) names.add(s.exported.name);
      const d = node.declaration;
      if (!d) continue;
      if (d.type === 'FunctionDeclaration' || d.type === 'ClassDeclaration') names.add(d.id.name);
      if (d.type === 'VariableDeclaration') {
        for (const decl of d.declarations) {
          // `export const Foo = …`
          if (decl.id.type === 'Identifier') names.add(decl.id.name);
          // `export const { a, b } = slice.actions`
          if (decl.id.type === 'ObjectPattern') {
            for (const p of decl.id.properties) {
              if (p.type === 'ObjectProperty' && p.value.type === 'Identifier') names.add(p.value.name);
              else if (p.type === 'RestElement' && p.argument.type === 'Identifier') names.add(p.argument.name);
            }
          }
        }
      }
    } else if (node.type === 'ExportAllDeclaration') {
      const target = resolve(file, node.source.value);
      if (target) {
        const sub = exportsOf(target, seen);
        if (sub === null) {
          exportCache.set(file, null); // opaque re-export, give up cleanly
          return null;
        }
        for (const n of sub) if (n !== 'default') names.add(n);
      } else if (target === undefined) {
        fail(file, `export * from unresolvable '${node.source.value}'`);
      }
    }
  }
  exportCache.set(file, names);
  return names;
}

/* ----------------------------------------------------- imports: 2 + 3 */

for (const [file, ast] of asts) {
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') continue;
    const spec = node.source.value;
    const target = resolve(file, spec);
    if (target === null) continue; // package
    if (target === undefined) {
      fail(file, `cannot resolve '${spec}'`);
      continue;
    }
    const available = exportsOf(target);
    if (available === null) continue;
    for (const s of node.specifiers) {
      const want = s.type === 'ImportDefaultSpecifier' ? 'default' : s.type === 'ImportSpecifier' ? s.imported.name : null;
      if (want && !available.has(want)) {
        fail(file, `'${spec}' has no export '${want}'`);
      }
    }
  }
}

/* -------------------------------------------------------- routes: 4 */

const navFile = path.join(SRC, 'navigation', 'StackNavigator.js');
const routes = new Set();
for (const f of [navFile, path.join(SRC, 'navigation', 'RootStack.js')]) {
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/<(?:Stack|Tab)\.Screen\s+name="([^"]+)"/g)) routes.add(m[1]);
}
// bottom-tab names live in the TABS table in chrome.js
const chrome = path.join(SRC, 'components', 'chrome.js');
if (fs.existsSync(chrome)) {
  for (const m of fs.readFileSync(chrome, 'utf8').matchAll(/name:\s*'([A-Z][A-Za-z]+)'/g)) routes.add(m[1]);
}

if (routes.size === 0) problems.push('no routes found — the route scan needs updating');

for (const [file, ast] of asts) {
  const src = fs.readFileSync(file, 'utf8');
  // `replace` is qualified: a bare `.replace('…')` is almost always String#replace.
  for (const m of src.matchAll(/\.(?:navigate|push)\(\s*'([^']+)'|\bnavigation\.replace\(\s*'([^']+)'/g)) {
    const name = m[1] || m[2];
    if (!routes.has(name)) fail(file, `navigates to unregistered route '${name}'`);
  }
  for (const m of src.matchAll(/name:\s*'([A-Z][A-Za-z]*Screen)'/g)) {
    if (!routes.has(m[1])) fail(file, `reset/route object names unregistered route '${m[1]}'`);
  }
}

/* --------------------------------------------------------- glyphs: 5 */

const glyphs = new Set(Object.keys(require('@react-native-vector-icons/lucide/glyphmaps/Lucide.json')));
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/(?:<Icon[^>]*?\sname=|\bicon:\s*|\bicon=)["']([a-z][a-z0-9-]+)["']/g)) {
    if (!glyphs.has(m[1])) fail(file, `unknown Lucide glyph '${m[1]}'`);
  }
}

/* ------------------------------------------------------------------ report */

console.log(`checked ${files.length} files, ${routes.size} routes, ${glyphs.size} glyphs`);
if (problems.length === 0) {
  console.log('ALL CLEAR');
  process.exit(0);
}
console.log(`\n${problems.length} problem(s):`);
for (const p of problems) console.log('  ' + p);
process.exit(1);
