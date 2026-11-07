/**
 * GRANTLY Security & Data Sanitization Service
 * Protects against XSS, script injection, HTML attribute exploits, and malicious payloads.
 */

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  return input
    .replace(/[<>]/g, '') // Strip literal HTML brackets
    .replace(/javascript:/gi, '') // Strip inline JS protocols
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onerror, onload
    .replace(/data:/gi, '') // Strip data URI exploits
    .trim();
}

export function validateNumericRange(value, min = 0, max = 1000000) {
  const num = Number(value);
  if (isNaN(num)) return min;
  return Math.min(max, Math.max(min, num));
}

export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const sanitized = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      sanitized[key] = sanitizeInput(val);
    } else if (typeof val === 'number') {
      sanitized[key] = isNaN(val) ? 0 : val;
    } else {
      sanitized[key] = val;
    }
  }
  return sanitized;
}
