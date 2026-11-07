/**
 * GRANTLY Champagne Web Audio Harmonic Synthesizer
 * Synthesizes subtle luxury tones for micro-interactions without audio files.
 * Adheres to strict browser autoplay policies and user sound preference.
 */

class SoundService {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  toggleSound(forceState) {
    this.enabled = forceState !== undefined ? forceState : !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  /**
   * Subtle champagne chime for button clicks & tab switches
   */
  playChime(freq = 587.33, duration = 0.12) {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Harmonic triad chime for winning/awarding a scholarship
   */
  playAwardChord() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.28);
      }, idx * 60);
    });
  }
}

export const soundService = new SoundService();
