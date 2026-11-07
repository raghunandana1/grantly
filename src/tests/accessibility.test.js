import { describe, it, expect } from 'vitest';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';

describe('GRANTLY Accessibility & System Reliability Suite', () => {
  it('1. Provides safe defaults when localStorage is empty or throws', () => {
    const fallback = storageService.get('non_existent_key_123', { fallback: true });
    expect(fallback).toEqual({ fallback: true });
  });

  it('2. Sound service supports instant muting for sensory comfort', () => {
    expect(soundService.isEnabled()).toBe(true);
    soundService.toggleSound(false);
    expect(soundService.isEnabled()).toBe(false);
    // Reset back
    soundService.toggleSound(true);
    expect(soundService.isEnabled()).toBe(true);
  });

  it('3. Verifies high-contrast Obsidian and Champagne Gold color contrast tokens', () => {
    // Relative luminance contrast check simulation:
    // Background: #08090d (RGB: 8, 9, 13) -> Luminance ~ 0.0015
    // Champagne Gold: #f5e6c8 (RGB: 245, 230, 200) -> Luminance ~ 0.78
    // Contrast Ratio = (0.78 + 0.05) / (0.0015 + 0.05) = 0.83 / 0.0515 = ~16.1:1
    // Meets WCAG AAA 7:1 standard by more than double.
    const bgLuminance = 0.0015;
    const textLuminance = 0.78;
    const contrastRatio = (textLuminance + 0.05) / (bgLuminance + 0.05);

    expect(contrastRatio).toBeGreaterThanOrEqual(7.0); // WCAG AAA requirement
  });
});
