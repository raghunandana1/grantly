# Grantly Accessibility & WCAG 2.1 AAA Compliance

## Standards & Benchmarks
- **WCAG 2.1 Level AAA**: All primary foreground text (`#f5e6c8`, `#ffffff`) against the obsidian canvas (`#08090d`) achieves a contrast ratio exceeding **16.1:1** (minimum required is 7.0:1).
- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, and `<footer>` elements.
- **Skip Link**: Top-level `<a href="#main-content">` ensures keyboard-first navigation without tab cycling.
- **Touch Target Ergonomics**: Minimum $44 \times 44\text{px}$ touch bounding boxes across all interactive controls.
- **Screen Reader Support**: Complete ARIA landmarks, `aria-expanded`, `aria-haspopup`, `aria-live="polite"` dynamic region updates, and `role="dialog"`.
