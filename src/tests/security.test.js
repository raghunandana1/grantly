import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateNumericRange, sanitizeObject } from '../services/securityService';

describe('GRANTLY Security & Data Sanitization Suite', () => {
  it('1. Strips HTML script tags and prevents Cross-Site Scripting (XSS)', () => {
    const maliciousPayload = '<script>alert("XSS")</script>STEM Excellence';
    const cleaned = sanitizeInput(maliciousPayload);
    expect(cleaned).toBe('scriptalert("XSS")/scriptSTEM Excellence');
    expect(cleaned).not.toContain('<');
    expect(cleaned).not.toContain('>');
  });

  it('2. Neutralizes inline javascript: and event handlers', () => {
    const payload = 'javascript:evil() onerror=alert(1)';
    const cleaned = sanitizeInput(payload);
    expect(cleaned).not.toContain('javascript:');
    expect(cleaned).not.toContain('onerror=');
  });

  it('3. Clamps numeric inputs to safe financial bounds', () => {
    expect(validateNumericRange(-5000, 0, 100000)).toBe(0);
    expect(validateNumericRange(250000, 0, 100000)).toBe(100000);
    expect(validateNumericRange('invalid', 1000, 50000)).toBe(1000);
  });

  it('4. Sanitizes deeply nested user objects', () => {
    const userForm = {
      title: '<b>Leadership Award</b>',
      amount: 5000,
      notes: '<img src=x onerror=hack()>',
    };
    const sanitized = sanitizeObject(userForm);
    expect(sanitized.title).toBe('bLeadership Award/b');
    expect(sanitized.notes).not.toContain('<');
    expect(sanitized.amount).toBe(5000);
  });
});
