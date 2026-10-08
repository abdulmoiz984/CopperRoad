export { showMessage, toast } from './showMessage';
export { shareText } from './share';

/** Flattens a backend validation payload into Formik's `setErrors` shape. */
export function formatBackendErrors(errors) {
  if (!errors) return {};
  return Object.keys(errors).reduce((acc, key) => {
    const value = errors[key];
    acc[key] = Array.isArray(value) ? value[0] : String(value);
    return acc;
  }, {});
}

/** Client-side id for records the mock API invents. */
export function localId(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** `CR-M-1042` style order ids, matching the web's placeOrder. */
export function orderId() {
  return `CR-M-${Math.floor(1000 + Math.random() * 9000)}`;
}

/** `CR-2026-1842` style application references. */
export function applicationId() {
  return `CR-2026-${Math.floor(2000 + Math.random() * 7000)}`;
}

/** `$28` with no cents, as the shop prices read on the web. */
export function money(amount) {
  return `$${Number(amount || 0).toFixed(0)}`;
}

/** `$28.00` where the checkout totals need cents. */
export function moneyExact(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}
