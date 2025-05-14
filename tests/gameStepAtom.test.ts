// tests/gameStepAtom.test.ts

import {
  DIFFICULTY_PRESETS,
  GameDifficulty,
  GameSettings,
  gameSettingsAtom,
} from '../src/state/gameSettingsAtom';
import {
  GameState,
  gameStateAtom,
  gameStepAtom,
  startGameAtom,
} from '../src/state/gameStateAtom';
import { beforeEach, describe, expect, it } from 'vitest';

import { colorThemes } from '../src/constants/themes/colorThemes';
import { getDefaultStore } from 'jotai';

const easySettings: GameSettings = {
  ...DIFFICULTY_PRESETS.easy,
  difficulty: 'easy' as GameDifficulty,
  themeId: colorThemes[0].id,
};

describe('gameStepAtom', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
    store.set(gameSettingsAtom, easySettings);
    store.set(startGameAtom);
  });

  it('should select a tile when clicked and add to selectedTileIds', () => {
    const { tileOrder } = store.get(gameStateAtom);
    const firstTile = tileOrder[0];

    store.set(gameStepAtom, firstTile);

    const state = store.get(gameStateAtom);
    expect(state.selectedTileIds).toContain(firstTile);
    expect(state.moves).toBe(1);
  });

  it('should not allow selecting the same tile twice', () => {
    const { tileOrder } = store.get(gameStateAtom);
    const firstTile = tileOrder[0];

    store.set(gameStepAtom, firstTile);
    store.set(gameStepAtom, firstTile); // second click on same tile

    const state = store.get(gameStateAtom);
    expect(state.selectedTileIds.length).toBe(1);
    expect(state.moves).toBe(1);
  });

  it('should mark tiles as matched if values are equal', () => {
    const state = store.get(gameStateAtom);
    const [first, second] = findMatchingPair(state);

    store.set(gameStepAtom, first);
    store.set(gameStepAtom, second);

    const updated = store.get(gameStateAtom);
    expect(updated.tiles[first].isMatched).toBe(true);
    expect(updated.tiles[second].isMatched).toBe(true);
    expect(updated.selectedTileIds.length).toBe(0);
  });

  it('should change gamePhase to won when last pair is matched', () => {
    const state = store.get(gameStateAtom);
    const [first, second] = findMatchingPair(state);

    // match all other tiles
    const tilesToMatch = Object.entries(state.tiles).filter(
      ([id]) => id !== first && id !== second,
    );

    const updatedTiles = { ...state.tiles };
    tilesToMatch.forEach(([id]) => {
      updatedTiles[id].isMatched = true;
    });

    store.set(gameStateAtom, prev => ({
      ...prev,
      tiles: updatedTiles,
    }));

    store.set(gameStepAtom, first);
    store.set(gameStepAtom, second);

    const finalState = store.get(gameStateAtom);
    expect(finalState.gamePhase).toBe('won');
  });
});

function findMatchingPair(state: GameState): [string, string] {
  const entries = Object.entries(state.tiles);
  for (let i = 0; i < entries.length; i++) {
    const [id1, tile1] = entries[i];
    for (let j = i + 1; j < entries.length; j++) {
      const [id2, tile2] = entries[j];
      if (tile1.value === tile2.value && id1 !== id2) {
        return [id1, id2];
      }
    }
  }
  throw new Error('No matching pair found');
}
