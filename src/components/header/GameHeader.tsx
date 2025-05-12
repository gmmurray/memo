import { Box, Button, Card, Group, Heading, Text } from '@chakra-ui/react';
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
      <Card.Header>
        <Heading size="3xl">Memo.</Heading>
      </Card.Header>
      <Card.Body>
        <Group>
          <Text fontSize="md" color="fg.muted">
            Patterns. Colors. Shapes. We all know them, but how well can you
            remember them? Let's find out.
          </Text>
          <Box ml="auto">
            {gameState.gamePhase === 'idle' ? <StartGame /> : <ResetGame />}
          </Box>
        </Group>
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
