import { storage } from './api';

const MOCK_DELAY = 200;

export function mockResolve(data, delay = MOCK_DELAY) {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export function mockReject(message, status = 400, delay = MOCK_DELAY) {
  return new Promise((_, reject) =>
    setTimeout(() => reject({ response: { status, data: { message } }, message }), delay),
  );
}

export function readTable(key, fallback) {
  const raw = storage.getString(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeTable(key, value) {
  storage.set(key, JSON.stringify(value));
  return value;
}
