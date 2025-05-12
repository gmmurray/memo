import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Fragment, useCallback } from 'react';
import { PiPlay, PiPlayFill } from 'react-icons/pi';
import {
  gameStateAtom,
  resetGameAtom,
  startGameAtom,
} from '../../state/gameStateAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import classes from './GameGridOverlay.module.css';
import { formatSecondsDuration } from '../../lib/dayjs/dayjs';

function GameGridOverlay() {
  const { gamePhase, moves, elapsedSeconds } = useAtomValue(gameStateAtom);
  const startGame = useSetAtom(startGameAtom);
  const resetGame = useSetAtom(resetGameAtom);

  const handleRestartGame = useCallback(() => {
    resetGame();
    startGame();
  }, [resetGame, startGame]);

  if (gamePhase === 'playing') return null;

  return (
    <Center className={classes.overlay}>
      <Stack>
        {gamePhase === 'idle' && <StartGame onClick={startGame} />}
        {gamePhase === 'lost' && <LostGame onClick={handleRestartGame} />}
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
    <button onClick={onClick} className={classes.play}>
      <PiPlay size="40" />
    </button>
  );
};

type LostGameProps = {
  onClick: () => unknown;
};
const LostGame = ({ onClick }: LostGameProps) => {
  return (
    <Fragment>
      <Heading size="xl">You lost</Heading>
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
      <Heading size="xl">You won!</Heading>
      <div>{`${moves} move${moves === 1 ? '' : 's'}`}</div>
      <div>{formatSecondsDuration(elapsedSeconds)}</div>
      <Button onClick={onClick}>
        <PiPlayFill /> New game
      </Button>
    </Fragment>
  );
};
