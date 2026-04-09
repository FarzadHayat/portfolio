# Pet Ghost Design Spec

**Date:** 2026-04-09  
**Status:** Approved

## Summary

Add a cute, friendly "Casper-style" ghost (`👻`) to the portfolio as a fixed widget in the bottom-left corner. The ghost has two modes of interaction: it pops up witty speech bubbles as the visitor scrolls into each section, and it reacts with a bounce animation when clicked. Desktop only.

---

## Component Architecture

**New file:** `src/components/PetGhost.astro`  
**Integration:** Added to `src/layouts/Layout.astro`, inside `<body>`, alongside the existing `FabFlower` and `Dock` components.

The component is fully self-contained — no props, no shared state, no changes to any existing component. It consists of:

```
PetGhost.astro
├── <div id="pet-ghost">         ← fixed, bottom-left, z-50, desktop-only
│   ├── <div id="ghost-bubble">  ← speech bubble, hidden by default
│   └── <span id="ghost-emoji">  ← the 👻 emoji
└── <script>                     ← all behaviour inline, no imports
```

---

## Behaviour

### Idle
The ghost floats gently using a looping CSS `@keyframes` animation (subtle vertical bob with slight rotation). It sits quietly until triggered.

### Section Commentator
On mount, the script queries all major page sections and registers a one-shot `IntersectionObserver` (threshold: `0.3`) on each. When a section enters the viewport, the ghost shows its speech bubble with a pre-written quip. The bubble auto-dismisses after 4 seconds. Each section fires at most once per page load.

### Clickable Pet
Clicking the ghost emoji plays a CSS bounce animation (`scale → overshoot → settle`) and shows a random "happy" message from a small pool. Resets after 2 seconds so it can be clicked again.

---

## Section Quips

| Section | Selector | Quip |
|---|---|---|
| Hero | `section.hero` | *"Welcome, mortal 👻"* |
| Projects | `#projects` | *"These projects are to die for 💀"* |
| Work | `#work` | *"Impressive résumé for a living person"* |
| Education | `#education` | *"Still smarter than me 🎓"* |
| Certifications | `#certifications` | *"Certified haunted engineer 🏅"* |
| Hackathons | `#hackathons` | *"Hacking the afterlife since forever"* |
| Spotify | `#spotify` | *"This human has great taste in music 🎵"* |

**Kept for future (sections currently hidden):**

| Section | Selector | Quip |
|---|---|---|
| About | `#about` | *"A human with good taste!"* |
| Blog | `#blog` | *"Wise words from beyond the grave 📖"* |
| Contact | `#contact` | *"Go on... say hello 👋"* |

**Click messages (random pool):**
- *"Boo! 👀"*
- *"You found me!"*
- *"Pet accepted ✅"*
- *"Hehe 👻"*
- *"Stop that... actually don't"*

---

## Visual Design

- **Ghost element:** `👻` emoji at `text-4xl`. No external assets or SVGs.
- **Positioning:** Container `fixed bottom-6 left-6 z-50 hidden lg:block`; speech bubble `position: fixed; bottom: 5.5rem; left: 2rem` (viewport-anchored to prevent screen-edge clipping)
- **No DaisyUI classes on the ghost itself** — keeps it theme-independent.

### CSS Animations

**Idle float:**
```css
@keyframes ghost-float {
  0%, 100% { transform: translateY(0px) rotate(-3deg); }
  50%       { transform: translateY(-10px) rotate(3deg); }
}
/* applied continuously, ~3s duration, ease-in-out */
```

**Click bounce:**
```css
@keyframes ghost-bounce {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.4) rotate(-10deg); }
  60%  { transform: scale(0.9) rotate(5deg); }
  100% { transform: scale(1); }
}
/* applied on click, ~0.4s duration, removed after */
```

### Speech Bubble
- White background, dark text, small pill shape with a downward-pointing CSS tail
- Fades in with `opacity` + `translateY(-4px → 0)` transition
- Auto-hides after 4 seconds via `setTimeout`

---

## Implementation Approach

**Vanilla JS + CSS animations** — no new dependencies.

All behaviour lives in an inline `<script>` tag inside `PetGhost.astro`. Uses:
- `IntersectionObserver` for section detection
- `classList.add/remove` for triggering CSS animations
- `setTimeout` for auto-dismissing bubbles

---

## Files Changed

| File | Change |
|---|---|
| `src/components/PetGhost.astro` | **New** — the ghost component |
| `src/layouts/Layout.astro` | Import and render `<PetGhost />` |
