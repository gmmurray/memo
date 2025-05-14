import { Card, Collapsible, Stack, Text } from '@chakra-ui/react';
import {
  DIFFICULTY_PRESETS,
  GameDifficulty,
  gameSettingsAtom,
  updateGameSettingAtom,
  updateThemeAtom,
} from '../../../state/gameSettingsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

import OptionGroupSelect from '../../../lib/chakra-ui/components/OptionGroupSelect';
import StandardNumberInput from '../../../lib/chakra-ui/components/StandardNumberInput';
import StandardSelect from '../../../lib/chakra-ui/components/StandardSelect';
import { allThemes } from '../../../constants/themes';
import { groupBy } from 'es-toolkit';

function GameSettings() {
  const gameSettings = useAtomValue(gameSettingsAtom);
  const setGameDifficulty = useSetAtom(updateGameSettingAtom);
  const setGameTheme = useSetAtom(updateThemeAtom);
  const isCustomDifficulty = gameSettings.difficulty === 'custom';

  return (
    <Stack gap="4">
      <Stack direction={{ base: 'column', md: 'row' }}>
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

        <OptionGroupSelect
          title="Theme"
          placeholder="Select a theme"
          value={gameSettings.themeId}
          onChange={value => setGameTheme(value)}
          groups={themeOptionGroups}
        />
      </Stack>

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
                items={gridSizeOptions}
              />
              <Stack direction={{ base: 'column', md: 'row' }}>
                <StandardNumberInput
                  label="Move limit"
                  value={
                    (gameSettings?.maxMoves ?? 0) > 0
                      ? gameSettings.maxMoves
                      : 0
                  }
                  onChange={value =>
                    setGameDifficulty({ key: 'maxMoves', value })
                  }
                  helperText="Use '0' for no move limit"
                />
                <StandardNumberInput
                  label="Time limit (seconds)"
                  value={
                    (gameSettings?.timeLimit ?? 0) > 0
                      ? gameSettings.timeLimit
                      : 0
                  }
                  onChange={value =>
                    setGameDifficulty({
                      key: 'timeLimit',
                      value,
                    })
                  }
                  helperText="Use '0' for no time limit"
                />
              </Stack>
            </Card.Body>
          </Card.Root>
        </Collapsible.Content>
      </Collapsible.Root>
      <Text fontStyle="italic" color="gray.600">
        Changing settings will also reset the game
      </Text>
    </Stack>
  );
}

export default GameSettings;

type Item = {
  label: string;
  value: string;
};
const difficultyOptions: Item[] = [
  ...Object.keys(DIFFICULTY_PRESETS).map(key => ({
    label: key,
    value: key,
  })),
  {
    label: 'custom',
    value: 'custom',
  },
];

type OptionGroup = { group: string; items: Item[] };
const themeOptionGroups: OptionGroup[] = Object.entries(
  groupBy(allThemes, theme => theme.type),
).map(([group, items]) => ({
  group,
  items: items.map(item => ({
    label: item.label,
    value: item.id,
  })),
}));

const gridSizeOptions: Item[] = Object.values(DIFFICULTY_PRESETS).map(
  ({ gridSize }) => ({
    label: `${gridSize}x${gridSize}`,
    value: gridSize.toString(),
  }),
);
