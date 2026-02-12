# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

무한 월요일 (Infinite Monday) - A text-based time loop RPG game built as a Toss mini app. Players relive the same Monday, making different choices to collect 10 different endings.

## Commands

```bash
yarn dev      # Start development server (granite dev, port 5173)
yarn build    # Production build (granite build → dist/)
yarn lint     # Run ESLint
yarn preview  # Preview production build
yarn deploy   # Deploy to Toss (ait deploy)
```

Type checking: `npx tsc -b`

Package manager: Yarn 4.9.2 (required)

## Architecture

### State Management (Zustand)

Single store in `src/store/gameStore.ts` with two-layer data model:
- **Loop State**: Resets every loop (stats, time, currentScene, flags)
- **Permanent State**: Persists across loops (achievedEndings, totalLoops, unlockedChoices)

### Scene System

All game content in `src/data/scenes.ts` (~1650 lines). Each scene has:
- `id`, `location`, `title`, `description` (string or function for dynamic text)
- `choices` array with `text`, `effect` function, and optional `condition`

Effect helper functions:
- `addTime(minutes)` - Advance game time
- `modifyStats({health?, mental?, reputation?, money?})` - Stat changes
- `setFlag(flag, value)` - Set state flags
- `combine(...effects)` - Compose multiple effects

### Ending Detection

Two paths to endings:
1. Direct ending scenes with `isEnding: true`
2. `ending_check` scene triggers `checkEnding()` which evaluates conditions

### Component Flow

```
App.tsx → Game.tsx (main container)
             ├── Header.tsx (time, loop count)
             ├── StatsBar.tsx (health, mental, reputation, money)
             ├── SceneDisplay.tsx (scene text)
             ├── ChoiceButtons.tsx (player choices)
             ├── EndingScreen.tsx (when ending reached)
             └── CollectionModal.tsx (endings collection)
```

### Data Persistence

`src/hooks/useTossGame.ts` handles save/load:
- Uses Toss SDK Storage API in production
- Falls back to localStorage in development
- Auto-saves on state changes

## Tech Stack

- React 18 + TypeScript (strict mode)
- Zustand for state
- Vite + SWC for builds
- Pure CSS (dark theme, mobile-first, max-width 480px)
- Path alias: `@/*` → `src/*`

## Game Mechanics

Stats (0-100, except money): Health, Mental, Reputation, Money

10 endings: ESCAPE, PROMOTION, LOVE, STARTUP, RICH, ENLIGHTENED, BURNOUT, HOSPITALIZED, FIRED, SECRET

New choices unlock based on `totalLoops` and `achievedEndings` in permanent state.
