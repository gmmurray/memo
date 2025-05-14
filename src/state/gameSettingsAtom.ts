import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { colorThemes } from '../constants/themes/colorThemes';
import { getThemeOrThrow } from '../constants/themes/utils';
import { resetGameAtom } from './gameStateAtom';

// #region 🎯 Difficulty Presets
export const DIFFICULTY_PRESETS = {
  easy: {
    gridSize: 4,
    maxMoves: -1,
    timeLimit: -1,
  },
  medium: {
    gridSize: 6,
    maxMoves: 90,
    timeLimit: -1,
  },
  hard: {
    gridSize: 8,
    maxMoves: 120,
    timeLimit: 120,
  },
};
// #endregion

// #region 🧩 Types
export type GameDifficulty = keyof typeof DIFFICULTY_PRESETS | 'custom';

export type GameSettings = {
  difficulty: GameDifficulty;
  gridSize: number;
  maxMoves: number;
  timeLimit: number;
  themeId: TileTheme['id'];
};

export type TileTheme = {
  id: string;
  label: string;
  type: 'color' | 'emoji' | 'image';
  values: string[]; // hex for color themes
  difficultyTag?: 'hard'; // optional tag for special classification
};
// #endregion

// #region 📦 Settings Atom
const GAME_SETTINGS_KEY = 'MEMO_GAME_SETTINGS';

const INITIAL_SETTINGS_STATE: GameSettings = {
  ...DIFFICULTY_PRESETS.easy,
  difficulty: 'easy',
  themeId: colorThemes[0].id,
};

export const gameSettingsAtom = atomWithStorage<GameSettings>(
  GAME_SETTINGS_KEY,
  INITIAL_SETTINGS_STATE,
);
// #endregion

// #region 📈 Derived Atoms
export const totalTilesAtom = atom(get => {
  const { gridSize } = get(gameSettingsAtom);
  return gridSize * gridSize;
});

export const numPairsAtom = atom(get => get(totalTilesAtom) / 2);

export const selectedThemeAtom = atom(get => {
  const { themeId } = get(gameSettingsAtom);
  const numPairs = get(numPairsAtom);
  return getThemeOrThrow(themeId, numPairs);
});

export const selectedThemeTypeAtom = atom(get => get(selectedThemeAtom).type);
// #endregion

// #region ⚙️ Settings Update Atoms
export const updateGameSettingAtom = atom(
  null,
  (get, set, update: { key: keyof GameSettings; value: number | string }) => {
    const { key, value } = update;

    const prevSettings = get(gameSettingsAtom);
    const normalizedValue =
      key === 'difficulty' ? value : normalizeSettingValue(value);

    if (prevSettings[key] === normalizedValue) {
      return;
    }

    const isPreset =
      normalizedValue !== 'custom' && isDifficultyPreset(normalizedValue);
    if (key === 'difficulty' && isPreset) {
      const preset = DIFFICULTY_PRESETS[normalizedValue];
      set(gameSettingsAtom, prev => ({
        ...prev,
        difficulty: normalizedValue as GameDifficulty,
        ...preset,
      }));
    } else {
      set(gameSettingsAtom, prev => ({
        ...prev,
        [key]: normalizeSettingValue(normalizedValue),
        difficulty: 'custom',
      }));
    }

    set(resetGameAtom);
  },
);

export const updateThemeAtom = atom(null, (get, set, themeId: string) => {
  const currentTheme = get(selectedThemeAtom);
  if (currentTheme.id === themeId) {
    return;
  }

  const numPairs = get(numPairsAtom);
  const nextTheme = getThemeOrThrow(themeId, numPairs);

  set(gameSettingsAtom, prev => ({
    ...prev,
    themeId: nextTheme.id,
  }));

  set(resetGameAtom);
});
// #endregion

// #region 🎲 Utility Functions
const normalizeSettingValue = (v: number | string) => (v === 0 ? -1 : v);

const isDifficultyPreset = (
  value: string | number,
): value is keyof typeof DIFFICULTY_PRESETS => {
  return value in DIFFICULTY_PRESETS;
};

// #endregion
