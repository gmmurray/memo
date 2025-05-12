import {
  GameTileState,
  gameStateAtom,
  gameStepAtom,
} from '../../state/gameStateAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { Card } from '@chakra-ui/react';
import GameGridOverlay from './GameGridOverlay';
import GameTile from './GameTile';
import classes from './GameGrid.module.css';
import { gameSettingsAtom } from '../../state/gameSettingsAtom';
import { useMemo } from 'react';

function GameGrid() {
  const [{ gridSize }] = useAtom(gameSettingsAtom);
  const {
    tiles,
    tileOrder,
    selectedTileIds: selectedTiles,
    gamePhase,
  } = useAtomValue(gameStateAtom);
  const selectTile = useSetAtom(gameStepAtom);

  const ids = useMemo(
    () =>
      gamePhase === 'idle'
        ? Array.from({ length: gridSize * gridSize }, (_, i) => `idle-${i}`)
        : tileOrder,
    [gamePhase, gridSize, tileOrder],
  );

  return (
    <Card.Root className={classes.wrapper}>
      <Card.Body>
        <div
          className={classes.grid}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {ids.map(id => {
            const tile: GameTileState | undefined = tiles[id];
            const selected = tile ? selectedTiles.includes(id) : false;
            const isShown = selected || !!tile?.isMatched;
            const onClick =
              gamePhase === 'playing' ? () => selectTile(id) : undefined;
            return (
              <GameTile
                key={id}
                value={tile?.value}
                isShown={isShown}
                onClick={onClick}
              />
            );
          })}
        </div>
        <GameGridOverlay />
      </Card.Body>
    </Card.Root>
  );
}

export default GameGrid;
