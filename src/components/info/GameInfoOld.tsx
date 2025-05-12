import {
  DIFFICULTY_PRESETS,
  GameDifficulty,
  gameSettingsAtom,
  updateGameSettingAtom,
} from '../../state/gameSettingsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import classes from './GameInfoOld.module.css';

function GameInfoOld() {
  const gameSettings = useAtomValue(gameSettingsAtom);
  const setGameDifficulty = useSetAtom(updateGameSettingAtom);
  const isCustomDifficulty = gameSettings.difficulty === 'custom';
  return (
    <div className={classes.wrapper}>
      <hgroup>
        <h1>Memo.</h1>
        <p>
          Patterns. Colors. Shapes. We all know them, but how well can you
          remember them? Let&apos;s find out.
        </p>
      </hgroup>
      <hr />
      <div className="grid">
        <div>
          <select
            name="difficulty"
            aria-label="difficulty"
            value={gameSettings.difficulty}
            onChange={e =>
              setGameDifficulty({
                key: 'difficulty',
                value: e.target.value as GameDifficulty,
              })
            }
          >
            <option selected disabled value="">
              difficulty
            </option>
            {Object.keys(DIFFICULTY_PRESETS).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
            <option value="custom">custom</option>
          </select>
        </div>
        <div>
          <details className="dropdown">
            <summary>theme</summary>
            <ul>
              <li>
                <a onClick={() => alert('hi')}>hi</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
      {isCustomDifficulty && (
        <div className="grid">
          <select
            name="gridSize"
            aria-label="gridSize"
            value={gameSettings.gridSize}
            disabled={!isCustomDifficulty}
            onChange={e =>
              setGameDifficulty({
                key: 'gridSize',
                value: Number(e.target.value),
              })
            }
          >
            <option selected disabled value="">
              grid
            </option>
            {Object.entries(DIFFICULTY_PRESETS).map(([key, preset]) => (
              <option key={key} value={preset.gridSize}>
                {preset.gridSize}x{preset.gridSize}
              </option>
            ))}
          </select>
          <select
            name="maxMoves"
            aria-label="maxMoves"
            value={gameSettings.maxMoves}
            disabled={!isCustomDifficulty}
            onChange={e =>
              setGameDifficulty({
                key: 'maxMoves',
                value: Number(e.target.value),
              })
            }
          >
            <option selected disabled value="">
              move limit
            </option>
            <option value={DIFFICULTY_PRESETS.easy.maxMoves}>
              easy (none)
            </option>
            <option value={DIFFICULTY_PRESETS.medium.maxMoves}>medium</option>
            <option value={DIFFICULTY_PRESETS.hard.maxMoves}>hard</option>
          </select>
        </div>
      )}
      <div>
        <i>
          <small>
            Changing game settings while a game is in progress will reset the
            game
          </small>
        </i>
      </div>
    </div>
  );
}

export default GameInfoOld;
