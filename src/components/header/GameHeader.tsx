import { Box, Button, Card, Heading, Stack, Text } from '@chakra-ui/react';
import {
  gameStateAtom,
  resetGameAtom,
  startGameAtom,
} from '../../state/gameStateAtom';
import { useAtomValue, useSetAtom } from 'jotai';

function GameHeader() {
  const gameState = useAtomValue(gameStateAtom);
  return (
    <Card.Root>
      <Card.Body>
        <Heading size="3xl">Memo.</Heading>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Text
            fontSize="md"
            color="fg.muted"
            alignSelf={{ base: 'start', lg: 'end' }}
          >
            Patterns. Colors. Shapes. We all know them, but how well can you
            remember them? Let's find out.
          </Text>
          <Box ml={{ base: undefined, lg: 'auto' }}>
            {gameState.gamePhase === 'idle' ? <StartGame /> : <ResetGame />}
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

export default GameHeader;

const StartGame = () => {
  const startGame = useSetAtom(startGameAtom);
  return <Button onClick={startGame}>Start</Button>;
};

const ResetGame = () => {
  const resetGame = useSetAtom(resetGameAtom);
  return (
    <Button onClick={resetGame} className="secondary">
      Reset
    </Button>
  );
};
