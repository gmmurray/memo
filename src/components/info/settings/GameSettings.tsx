import { Card, Collapsible, Stack } from '@chakra-ui/react';
import {
  DIFFICULTY_PRESETS,
  GameDifficulty,
  gameSettingsAtom,
  updateGameSettingAtom,
} from '../../../state/gameSettingsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import StandardSelect from '../../../lib/chakra-ui/components/StandardSelect';

function GameSettings() {
  const gameSettings = useAtomValue(gameSettingsAtom);
  const setGameDifficulty = useSetAtom(updateGameSettingAtom);
  const isCustomDifficulty = gameSettings.difficulty === 'custom';

  return (
    <Stack gap="4">
      <StandardSelect
        title="Difficulty"
        placeholder="Select a difficulty"
        value={gameSettings.difficulty}
        onChange={value =>
          setGameDifficulty({
            key: 'difficulty',
            value: value as GameDifficulty,
          })
        }
        items={difficultyOptions}
      />

      <StandardSelect
        title="Theme"
        placeholder="Select a theme"
        value={gameSettings.difficulty}
        onChange={value =>
          setGameDifficulty({
            key: 'difficulty',
            value: value as GameDifficulty,
          })
        }
        items={difficultyOptions}
      />

      <Collapsible.Root open={isCustomDifficulty}>
        <Collapsible.Content>
          <Card.Root variant="subtle">
            <Card.Body gap="2">
              <StandardSelect
                title="Grid size"
                placeholder="Select a grid size"
                value={gameSettings.gridSize.toString()}
                onChange={value =>
                  setGameDifficulty({
                    key: 'gridSize',
                    value: Number(value),
                  })
                }
                items={gridOptions}
              />
              <StandardSelect
                title="Move limit"
                placeholder="Select a move limit"
                value={gameSettings.maxMoves.toString()}
                onChange={value =>
                  setGameDifficulty({
                    key: 'maxMoves',
                    value: Number(value),
                  })
                }
                items={maxMovesOptions}
              />
            </Card.Body>
          </Card.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}

export default GameSettings;

const difficultyOptions = [
  ...Object.keys(DIFFICULTY_PRESETS).map(key => ({
    label: key,
    value: key,
  })),
  {
    label: 'custom',
    value: 'custom',
  },
];

const gridOptions = Object.values(DIFFICULTY_PRESETS).map(({ gridSize }) => ({
  label: `${gridSize}x${gridSize}`,
  value: gridSize.toString(),
}));

const maxMovesOptions = [
  {
    label: 'easy (none)',
    value: DIFFICULTY_PRESETS.easy.maxMoves.toString(),
  },
  {
    label: 'medium',
    value: DIFFICULTY_PRESETS.medium.maxMoves.toString(),
  },
  {
    label: 'hard',
    value: DIFFICULTY_PRESETS.hard.maxMoves.toString(),
  },
];
