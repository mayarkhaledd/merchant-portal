export function generateId() {
  return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
}
