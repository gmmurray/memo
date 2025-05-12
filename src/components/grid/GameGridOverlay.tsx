import { Fragment, useCallback } from 'react';
import {
  gameStateAtom,
  resetGameAtom,
  startGameAtom,
} from '../../state/gameStateAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import { Play } from '@phosphor-icons/react';
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
    <div className={classes.overlay}>
      {gamePhase === 'idle' && <StartGame onClick={startGame} />}
      {gamePhase === 'lost' && <LostGame onClick={handleRestartGame} />}
      {gamePhase === 'won' && (
        <WonGame
          moves={moves}
          elapsedSeconds={elapsedSeconds}
          onClick={handleRestartGame}
        />
      )}
    </div>
  );
}

export default GameGridOverlay;

type StartGameProps = {
  onClick: () => unknown;
};
const StartGame = ({ onClick }: StartGameProps) => {
  return (
    <button onClick={onClick} className={classes.play}>
      <Play size="40" />
    </button>
  );
};

type LostGameProps = {
  onClick: () => unknown;
};
const LostGame = ({ onClick }: LostGameProps) => {
  return (
    <Fragment>
      <h2>You lost</h2>
      <button onClick={onClick} className="secondary">
        Try again
      </button>
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
      <h2>You won!</h2>
      <div>{`${moves} move${moves === 1 ? '' : 's'}`}</div>
      <div>{formatSecondsDuration(elapsedSeconds)}</div>
      <button onClick={onClick} className="">
        New game
      </button>
    </Fragment>
  );
};
