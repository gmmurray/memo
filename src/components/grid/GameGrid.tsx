import { Box, Card } from '@chakra-ui/react';
import {
  GameTileState,
  gameStateAtom,
  gameStepAtom,
} from '../../state/gameStateAtom';
import {
  gameSettingsAtom,
  selectedThemeTypeAtom,
} from '../../state/gameSettingsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import GameGridOverlay from './GameGridOverlay';
import GameTile from './GameTile';
import { useMemo } from 'react';

function GameGrid() {
  const { gridSize } = useAtomValue(gameSettingsAtom);
  const {
    tiles,
    tileOrder,
    selectedTileIds: selectedTiles,
    gamePhase,
  } = useAtomValue(gameStateAtom);
  const selectTile = useSetAtom(gameStepAtom);
  const themeType = useAtomValue(selectedThemeTypeAtom);

  const ids = useMemo(
    () =>
      gamePhase === 'idle'
        ? Array.from({ length: gridSize * gridSize }, (_, i) => `idle-${i}`)
        : tileOrder,
    [gamePhase, gridSize, tileOrder],
  );

  return (
    <Card.Root
      w={['100%', '100%']}
      maxW="600px"
      aspectRatio="1 / 1"
      overflow="hidden"
      borderRadius="0.5rem"
      position="relative"
    >
      <Card.Body w="100%" h="100%">
        <Box
          w="100%"
          mx="auto"
          display="grid"
          gap="4px"
          gridTemplateColumns={`repeat(${gridSize}, 1fr)`}
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
                type={themeType}
              />
            );
          })}
        </Box>
        <GameGridOverlay />
      </Card.Body>
    </Card.Root>
  );
}

export default GameGrid;
