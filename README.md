# Memo

Memo started as an excuse to try [Jotai](https://jotai.org/). I wanted to understand how atom-based state management feels in practice, and a memory matching game seemed like a good fit — enough state complexity to be interesting, not so much that it buries the thing you're actually trying to learn.

It turns out Jotai is a really natural way to model game logic. The core game state lives in a handful of atoms, and the rules — checking matches, tracking moves, watching for win/loss conditions — are just derived atoms that react to changes. There's a clean separation between "what happened" and "what does that mean" that I found satisfying to work with. Settings persist to localStorage through `atomWithStorage`, which is about two lines of code.

The game itself is straightforward. Flip tiles, find pairs. I added difficulty presets (easy, medium, hard) and a custom mode where you can dial in grid size, move limits, and time limits. A few friends and I played it for a while, which was a good excuse to keep polishing it.

**Themes**

There are 8 tile themes across three types:

- **Colors** — 4 palettes ranging from a classic set to gradients and a retro neon look
- **Emoji** — flags, food, and faces
- **Images** — memes, obviously

The theme system is generic enough that adding new ones is just dropping values into an array.

**Stack**

React 19, TypeScript, Vite, Chakra UI. Jotai handles all game and settings state. Vitest for testing. The whole thing is a static SPA with no backend.
