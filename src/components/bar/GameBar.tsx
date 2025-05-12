import {
  gameStateAtom,
  resetGameAtom,
  startGameAtom,
} from '../../state/gameStateAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import { formatSecondsDuration } from '../../lib/dayjs/dayjs';
import { gameSettingsAtom } from '../../state/gameSettingsAtom';

function GameBar() {
  const { moves, elapsedSeconds, gamePhase } = useAtomValue(gameStateAtom);
  const { maxMoves } = useAtomValue(gameSettingsAtom);
  return (
    <article>
      <div
        className="grid"
        style={{
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ marginBottom: 0 }}>{`${moves} move${
            moves === 1 ? '' : 's'
          }`}</p>
          {maxMoves !== -1 && (
            <progress
              value={maxMoves - moves}
              max={maxMoves}
              style={{ marginBottom: 0 }}
            />
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 0 }}>
            {formatSecondsDuration(elapsedSeconds)}
          </p>
          {maxMoves !== -1 && (
            <progress
              value={maxMoves - moves}
              max={maxMoves}
              style={{ marginBottom: 0 }}
            />
          )}
        </div>
        <div style={{ textAlign: 'end' }}>
          {gamePhase === 'idle' ? <StartGame /> : <ResetGame />}
        </div>
      </div>
    </article>
  );
}

export default GameBar;

const StartGame = () => {
  const startGame = useSetAtom(startGameAtom);
  return <button onClick={startGame}>Start</button>;
};

const ResetGame = () => {
  const resetGame = useSetAtom(resetGameAtom);
  return (
    <button onClick={resetGame} className="secondary">
      Reset
    </button>
  );
};
