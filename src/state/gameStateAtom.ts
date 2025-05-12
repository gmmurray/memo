import { NUM_TO_MATCH, SHOW_DURATION } from '../constants/game';
import { gameSettingsAtom, numPairsAtom } from './gameSettingsAtom';

import { COLOR_POOL } from '../constants/colors';
import { atom } from 'jotai';
import { nanoid } from 'nanoid';
import { shuffle } from '../utils/shuffle';

let hideTileTimeout: ReturnType<typeof setTimeout> | null = null;
let gameClockInterval: ReturnType<typeof setInterval> | null = null;

export const stopGameClock = () => {
  if (gameClockInterval) {
    clearInterval(gameClockInterval);
    gameClockInterval = null;
  }
};

export type GameTileState = {
  id: string;
  value: string;
  isMatched: boolean;
};

export type GameState = {
  tiles: Record<string, GameTileState>;
  tileOrder: string[];
  selectedTileIds: string[];
  gamePhase: GamePhase;
  moves: number;
  elapsedSeconds: number;
};

const initialGameState: GameState = {
  tiles: {},
  tileOrder: [],
  selectedTileIds: [],
  gamePhase: 'idle',
  moves: 0,
  elapsedSeconds: 0,
};

export type GamePhase = 'idle' | 'playing' | 'won' | 'lost';

export const gameStateAtom = atom<GameState>({
  ...initialGameState,
});

export const startGameAtom = atom(null, (get, set) => {
  const tiles: GameState['tiles'] = {};
  const tileIds: string[] = [];

  const numPairs = get(numPairsAtom);

  // this gives us the correct number of tile values
  const values = generateTileValues(numPairs).flatMap(v => [v, v]);

  for (let i = 0; i < values.length; i++) {
    const tile: GameTileState = {
      id: nanoid(),
      value: values[i],
      isMatched: false,
    };
    tiles[tile.id] = tile;
    tileIds.push(tile.id);
  }

  const tileOrder = shuffleTiles(tileIds);

  set(gameStateAtom, {
    tiles,
    tileOrder,
    selectedTileIds: [],
    moves: 0,
    gamePhase: 'playing',
    elapsedSeconds: 0,
  });

  if (gameClockInterval) {
    clearInterval(gameClockInterval);
  }

  gameClockInterval = setInterval(() => {
    set(gameStateAtom, prev => ({
      ...prev,
      elapsedSeconds: prev.elapsedSeconds + 1,
    }));
  }, 1000);
});

export const resetGameAtom = atom(null, (_, set) => {
  stopGameClock();

  set(gameStateAtom, prev => ({
    ...prev,
    ...initialGameState,
  }));
});

export const isGameLostAtom = atom(get => {
  const maxMoves = get(gameSettingsAtom).maxMoves;
  if (maxMoves === -1) {
    return false;
  }

  return get(gameStateAtom).moves + 1 > get(gameSettingsAtom).maxMoves;
});

export const isMaxSelectedTilesAtom = atom(
  get => get(gameStateAtom).selectedTileIds.length === NUM_TO_MATCH,
);

export const isSelectedMatchAtom = atom(get => {
  const { tiles, selectedTileIds } = get(gameStateAtom);

  if (!get(isMaxSelectedTilesAtom)) {
    return false;
  }

  const values = selectedTileIds.map(id => tiles[id].value);
  const allSameValue = values.every(val => val === values[0]);

  const allIdsUnique = new Set(selectedTileIds).size === selectedTileIds.length;

  return allSameValue && allIdsUnique;
});

export const matchCountAtom = atom(get => {
  const { tiles } = get(gameStateAtom);
  return (
    Object.values(tiles).filter(tile => tile.isMatched).length / NUM_TO_MATCH
  );
});

export const gameStepAtom = atom(null, (get, set, tileId: string) => {
  // handle player selecting a new tile before selectedTileIds clears
  if (hideTileTimeout) {
    clearTimeout(hideTileTimeout);
    hideTileTimeout = null;

    set(gameStateAtom, prev => ({
      ...prev,
      selectedTileIds: [],
    }));
  }

  const { selectedTileIds, tiles, moves, gamePhase } = get(gameStateAtom);

  const nextMoves = moves + 1;
  const tile = tiles[tileId];

  // early guards
  if (
    tile.isMatched ||
    selectedTileIds.includes(tileId) ||
    get(isMaxSelectedTilesAtom) ||
    gamePhase === 'won' ||
    gamePhase === 'lost'
  ) {
    return;
  }

  // check if the game is lost before proceeding
  if (get(isGameLostAtom)) {
    stopGameClock();
    set(gameStateAtom, prev => ({
      ...prev,
      gamePhase: 'lost',
      selectedTileIds: [],
    }));
    return;
  }

  const nextSelectedTileIds = [...selectedTileIds, tileId];

  // apply move
  set(gameStateAtom, prev => ({
    ...prev,
    moves: nextMoves,
    selectedTileIds: nextSelectedTileIds,
  }));

  // wait for next tile if not max yet
  if (!get(isMaxSelectedTilesAtom)) {
    return;
  }

  // evaluate possible match
  if (get(isSelectedMatchAtom)) {
    // if its a match, set respective tiles to isMatched:true and clear selectedTileIds
    const nextTiles = { ...tiles };
    nextSelectedTileIds.forEach(id => {
      nextTiles[id].isMatched = true;
    });

    const allMatched = Object.values(nextTiles).every(tile => tile.isMatched);

    const nextGamePhase: GamePhase = allMatched ? 'won' : 'playing';
    if (nextGamePhase === 'won') {
      stopGameClock();
    }

    set(gameStateAtom, prev => ({
      ...prev,
      tiles: nextTiles,
      selectedTileIds: [],
      gamePhase: nextGamePhase,
    }));
  } else {
    // otherwise, unselect everything after SHOW_DURATION ms
    hideTileTimeout = setTimeout(() => {
      hideTileTimeout = null;
      set(gameStateAtom, prev => ({ ...prev, selectedTileIds: [] }));
    }, SHOW_DURATION);
  }
});

const generateTileValues = (numPairs: number) => {
  const shuffled = shuffleColors();
  const colors = shuffled.slice(0, numPairs);
  return colors;
};

const shuffleColors = () => {
  return shuffle(COLOR_POOL);
};

const shuffleTiles = (order: string[]) => {
  return shuffle(order);
};
