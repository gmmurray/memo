import { gameStateAtom, resetGameAtom } from './gameStateAtom';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const GAME_SETTINGS_KEY = 'MEMO_GAME_SETTINGS';

export const DIFFICULTY_PRESETS = {
  easy: {
    gridSize: 4,
    maxMoves: -1,
  },
  medium: {
    gridSize: 6,
    maxMoves: 60,
  },
  hard: {
    gridSize: 8,
    maxMoves: 90,
  },
};

export type GameDifficulty = keyof typeof DIFFICULTY_PRESETS | 'custom';

export type GameSettings = {
  difficulty: GameDifficulty;
  gridSize: number;
  maxMoves: number;
};

export const gameSettingsAtom = atomWithStorage<GameSettings>(
  GAME_SETTINGS_KEY,
  {
    ...DIFFICULTY_PRESETS.easy,
    difficulty: 'easy',
  },
);

export const totalTilesAtom = atom(get => {
  const { gridSize } = get(gameSettingsAtom);
  return gridSize * gridSize;
});

export const numPairsAtom = atom(get => get(totalTilesAtom) / 2);

export const updateGameSettingAtom = atom(
  null,
  (get, set, update: { key: keyof GameSettings; value: number | string }) => {
    const { key, value } = update;
    const isGameInProgress = get(gameStateAtom).gamePhase === 'playing';

    if (key === 'difficulty' && value !== 'custom') {
      const preset =
        DIFFICULTY_PRESETS[value as keyof typeof DIFFICULTY_PRESETS];
      set(gameSettingsAtom, prev => ({
        ...prev,
        difficulty: value as GameDifficulty,
        ...preset,
      }));
    } else {
      set(gameSettingsAtom, prev => ({
        ...prev,
        [key]: value,
      }));
    }

    if (isGameInProgress) {
      set(resetGameAtom);
    }
  },
);
