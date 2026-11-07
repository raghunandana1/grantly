import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

/**
 * Resilient Persistent State Hook with localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storageService.get(key, initialValue);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    storageService.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
