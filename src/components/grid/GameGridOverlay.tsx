import { Button, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { Fragment, useCallback } from 'react';
import {
  GameLossReason,
  gameStateAtom,
  resetGameAtom,
  startGameAtom,
} from '../../state/gameStateAtom';
import { PiPlay, PiPlayFill } from 'react-icons/pi';
import { useAtomValue, useSetAtom } from 'jotai';

import { formatSecondsDuration } from '../../lib/dayjs/dayjs';

function GameGridOverlay() {
  const { gamePhase, moves, elapsedSeconds, gameLossReason } =
    useAtomValue(gameStateAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  const handleRestartGame = useCallback(() => {
    resetGame();
    startGame();
  }, [resetGame, startGame]);

  if (gamePhase === 'playing') return null;

  return (
    <Center
      inset="0"
      pos="absolute"
      bgColor="rgba(0, 0, 0, 0.8)"
      gap="1rem"
      borderRadius="var(--chakra-radii-l3)"
      textAlign="center"
    >
      <Stack>
        {gamePhase === 'idle' && <StartGame onClick={startGame} />}
        {gamePhase === 'lost' && (
          <LostGame onClick={handleRestartGame} reason={gameLossReason} />
        )}
        {gamePhase === 'won' && (
          <WonGame
            moves={moves}
            elapsedSeconds={elapsedSeconds}
            onClick={handleRestartGame}
          />
        )}
      </Stack>
    </Center>
  );
}

export default GameGridOverlay;

type StartGameProps = {
  onClick: () => unknown;
};
const StartGame = ({ onClick }: StartGameProps) => {
  return (
    <button onClick={onClick} style={{ cursor: 'pointer', color: 'white' }}>
      <PiPlay size="40" />
    </button>
  );
};

type LostGameProps = {
  onClick: () => unknown;
  reason: GameLossReason;
};
const LostGame = ({ onClick, reason }: LostGameProps) => {
  const reasonText =
    !!reason && gameLossReasonMap[reason] ? gameLossReasonMap[reason] : null;
  return (
    <Fragment>
      <Heading size="xl" color="red">
        You lost
      </Heading>
      {reasonText && <Text color="white">{reasonText}</Text>}
      <Button onClick={onClick}>
        <PiPlayFill /> Try again
      </Button>
    </Fragment>
  );
};

type WonGameProps = {
  onClick: () => unknown;
  moves: number;
  elapsedSeconds: number;
};
const WonGame = ({ onClick, moves, elapsedSeconds }: WonGameProps) => {
  return (
    <Fragment>
      <Heading size="xl" color="white">
        You won!
      </Heading>
      <Text color="white">{`${moves} move${moves === 1 ? '' : 's'}`}</Text>
      <Text color="white">{formatSecondsDuration(elapsedSeconds)}</Text>
      <Button onClick={onClick}>
        <PiPlayFill /> New game
      </Button>
    </Fragment>
  );
};

const gameLossReasonMap = {
  moves: 'You ran out of moves',
  time: 'You ran out of time',
  manual: null,
};
