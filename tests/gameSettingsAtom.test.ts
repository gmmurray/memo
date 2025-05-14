// tests/gameSettingsAtom.test.ts

import {
  DIFFICULTY_PRESETS,
  GameSettings,
  gameSettingsAtom,
  selectedThemeTypeAtom,
  updateGameSettingAtom,
  updateThemeAtom,
} from '../src/state/gameSettingsAtom';
import {
  GamePhase,
  GameState,
  gameStateAtom,
} from '../src/state/gameStateAtom';
import { beforeEach, describe, expect, it } from 'vitest';

import { colorThemes } from '../src/constants/themes/colorThemes';
import { emojiThemes } from '../src/constants/themes/emojiThemes';
import { getDefaultStore } from 'jotai';
import { imageThemes } from '../src/constants/themes/imageThemes';

const initialSettings: GameSettings = {
  ...DIFFICULTY_PRESETS.easy,
  difficulty: 'easy',
  themeId: colorThemes[0].id,
};

const playingGameState: GameState = {
  tiles: {},
  tileOrder: [],
  selectedTileIds: [],
  moves: 0,
  elapsedSeconds: 0,
  gamePhase: 'playing' as GamePhase,
  gameLossReason: null,
};

describe('gameSettingsAtom', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
    store.set(gameSettingsAtom, initialSettings);
    store.set(gameStateAtom, { ...playingGameState });
  });

  it('should initialize with easy preset', () => {
    const settings = store.get(gameSettingsAtom);
    expect(settings.gridSize).toBe(DIFFICULTY_PRESETS.easy.gridSize);
    expect(settings.maxMoves).toBe(DIFFICULTY_PRESETS.easy.maxMoves);
    expect(settings.timeLimit).toBe(DIFFICULTY_PRESETS.easy.timeLimit);
    expect(settings.difficulty).toBe('easy');
  });

  it('should update to medium difficulty and apply its preset', () => {
    store.set(updateGameSettingAtom, { key: 'difficulty', value: 'medium' });
    const settings = store.get(gameSettingsAtom);
    expect(settings.gridSize).toBe(DIFFICULTY_PRESETS.medium.gridSize);
    expect(settings.maxMoves).toBe(DIFFICULTY_PRESETS.medium.maxMoves);
    expect(settings.timeLimit).toBe(DIFFICULTY_PRESETS.medium.timeLimit);
    expect(settings.difficulty).toBe('medium');
  });

  it('should update to hard difficulty and apply its preset', () => {
    store.set(updateGameSettingAtom, { key: 'difficulty', value: 'hard' });
    const settings = store.get(gameSettingsAtom);
    expect(settings.gridSize).toBe(DIFFICULTY_PRESETS.hard.gridSize);
    expect(settings.maxMoves).toBe(DIFFICULTY_PRESETS.hard.maxMoves);
    expect(settings.timeLimit).toBe(DIFFICULTY_PRESETS.hard.timeLimit);
    expect(settings.difficulty).toBe('hard');
  });

  it('should set difficulty to custom when updating a single setting', () => {
    store.set(updateGameSettingAtom, { key: 'gridSize', value: 5 });
    const settings = store.get(gameSettingsAtom);
    expect(settings.gridSize).toBe(5);
    expect(settings.difficulty).toBe('custom');
  });

  it('should reset the game if settings are changed during gameplay', () => {
    store.set(updateGameSettingAtom, { key: 'maxMoves', value: 42 });
    const gameState = store.get(gameStateAtom);
    expect(gameState.gamePhase).toBe('idle');
  });

  it('should normalize 0 to -1 for maxMoves and timeLimit', () => {
    store.set(updateGameSettingAtom, { key: 'maxMoves', value: 0 });
    let settings = store.get(gameSettingsAtom);
    expect(settings.maxMoves).toBe(-1);

    store.set(updateGameSettingAtom, { key: 'timeLimit', value: 0 });
    settings = store.get(gameSettingsAtom);
    expect(settings.timeLimit).toBe(-1);
  });

  it('should not reset game if setting is unchanged', () => {
    const prevSettings = store.get(gameSettingsAtom);
    store.set(updateGameSettingAtom, {
      key: 'maxMoves',
      value: prevSettings.maxMoves,
    });

    const nextState = store.get(gameStateAtom);
    expect(nextState.gamePhase).toBe('playing');
  });

  it('should preserve settings when setting difficulty to custom directly', () => {
    const prevSettings = store.get(gameSettingsAtom);
    store.set(updateGameSettingAtom, { key: 'difficulty', value: 'custom' });
    const nextSettings = store.get(gameSettingsAtom);
    expect(nextSettings.difficulty).toBe('custom');
    expect(nextSettings.gridSize).toBe(prevSettings.gridSize);
    expect(nextSettings.maxMoves).toBe(prevSettings.maxMoves);
    expect(nextSettings.themeId).toBe(prevSettings.themeId);
  });

  it('should treat unknown difficulty as custom update', () => {
    store.set(updateGameSettingAtom, { key: 'difficulty', value: 'extreme' });
    const settings = store.get(gameSettingsAtom);
    expect(settings.difficulty).toBe('custom');
  });

  it('should set theme if it is changed', () => {
    store.set(updateThemeAtom, colorThemes[1].id);
    const settings = store.get(gameSettingsAtom);
    expect(settings.themeId).toBe(colorThemes[1].id);
  });

  it('should reset the game if theme is changed during gameplay', () => {
    store.set(updateThemeAtom, colorThemes[1].id);
    const gameState = store.get(gameStateAtom);
    expect(gameState.gamePhase).toBe('idle');
  });

  it('should not reset game if theme is unchanged', () => {
    store.set(updateThemeAtom, colorThemes[0].id);
    const nextState = store.get(gameStateAtom);
    expect(nextState.gamePhase).toBe('playing');
  });

  it('should throw if an invalid theme is provided', () => {
    expect(() => store.set(updateThemeAtom, '123')).toThrow();
  });

  it('should return the correct theme type', () => {
    store.set(updateThemeAtom, colorThemes[0].id);
    expect(store.get(selectedThemeTypeAtom)).toBe(colorThemes[0].type);

    store.set(updateThemeAtom, imageThemes[0].id);
    expect(store.get(selectedThemeTypeAtom)).toBe(imageThemes[0].type);

    store.set(updateThemeAtom, emojiThemes[0].id);
    expect(store.get(selectedThemeTypeAtom)).toBe(emojiThemes[0].type);
  });
});
