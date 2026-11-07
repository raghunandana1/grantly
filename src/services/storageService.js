/**
 * GRANTLY Resilient LocalStorage Service
 * Wraps browser storage with validation, safe fallbacks, and error boundaries.
 */

export const storageService = {
  get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.warn(`[storageService] Failed to parse item for key "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[storageService] Failed to set item for key "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[storageService] Failed to remove key "${key}":`, e);
    }
  },

  clear() {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn('[storageService] Failed to clear storage:', e);
    }
  },
};
