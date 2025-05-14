// tests/gameStateAtom.test.ts

import {
  DIFFICULTY_PRESETS,
  GameDifficulty,
  GameSettings,
  gameSettingsAtom,
} from '../src/state/gameSettingsAtom';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  gameStateAtom,
  matchCountAtom,
  resetGameAtom,
  startGameAtom,
} from '../src/state/gameStateAtom';

import { colorThemes } from '../src/constants/themes/colorThemes';
import { getDefaultStore } from 'jotai';

const easySettings: GameSettings = {
  ...DIFFICULTY_PRESETS.easy,
  difficulty: 'easy' as GameDifficulty,
  themeId: colorThemes[0].id,
};

describe('gameStateAtom', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
    store.set(gameSettingsAtom, easySettings);
    store.set(gameStateAtom, {
      tiles: {},
      tileOrder: [],
      selectedTileIds: [],
      gamePhase: 'idle',
      moves: 0,
      elapsedSeconds: 0,
      gameLossReason: null,
    });
  });

  it('should initialize game state with tiles and order on start', () => {
    store.set(startGameAtom);
    const state = store.get(gameStateAtom);

    expect(state.gamePhase).toBe('playing');
    expect(Object.keys(state.tiles).length).toBe(16); // 4x4 grid = 8 pairs = 16 tiles
    expect(state.tileOrder.length).toBe(16);
    expect(state.selectedTileIds).toEqual([]);
    expect(state.moves).toBe(0);
  });

  it('should reset game state on reset', () => {
    store.set(startGameAtom);
    store.set(resetGameAtom);
    const state = store.get(gameStateAtom);

    expect(state.gamePhase).toBe('idle');
    expect(state.tiles).toEqual({});
    expect(state.tileOrder).toEqual([]);
    expect(state.selectedTileIds).toEqual([]);
    expect(state.moves).toBe(0);
    expect(state.elapsedSeconds).toBe(0);
    expect(state.gameLossReason).toBe(null);
  });

  it('should calculate match count correctly', () => {
    store.set(startGameAtom);
    const baseState = store.get(gameStateAtom);

    // fake a match of two tiles
    const firstTwoIds = baseState.tileOrder.slice(0, 2);
    const updatedTiles = { ...baseState.tiles };
    firstTwoIds.forEach(id => {
      updatedTiles[id].isMatched = true;
    });
    store.set(gameStateAtom, {
      ...baseState,
      tiles: updatedTiles,
    });

    const count = store.get(matchCountAtom);
    expect(count).toBe(1); // one matched pair
  });
});
