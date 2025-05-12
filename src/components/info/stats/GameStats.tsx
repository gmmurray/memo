import { HStack, Progress, Stack, Stat } from '@chakra-ui/react';
import { gameStateAtom, matchCountAtom } from '../../../state/gameStateAtom';

import { formatSecondsDuration } from '../../../lib/dayjs/dayjs';
import { gameSettingsAtom } from '../../../state/gameSettingsAtom';
import { useAtomValue } from 'jotai';

function GameStats() {
  const { moves, elapsedSeconds } = useAtomValue(gameStateAtom);
  const { maxMoves } = useAtomValue(gameSettingsAtom);
  const numMatches = useAtomValue(matchCountAtom);
  return (
    <Stack>
      <Stat.Root size="lg">
        <Stat.Label>Moves</Stat.Label>
        <Stat.ValueText>{`${moves}`}</Stat.ValueText>
        {maxMoves !== -1 && (
          <Progress.Root
            value={moves}
            max={maxMoves}
            colorPalette={progressColor(moves / maxMoves)}
          >
            <HStack gap="5">
              <Progress.Track flex="1">
                <Progress.Range />
              </Progress.Track>
              <Progress.ValueText>{maxMoves}</Progress.ValueText>
            </HStack>
          </Progress.Root>
        )}
      </Stat.Root>
      <Stat.Root size="lg">
        <Stat.Label>Time</Stat.Label>
        <Stat.ValueText>{formatSecondsDuration(elapsedSeconds)}</Stat.ValueText>
      </Stat.Root>
      <Stat.Root size="lg">
        <Stat.Label>Matches</Stat.Label>
        <Stat.ValueText>{numMatches}</Stat.ValueText>
      </Stat.Root>
    </Stack>
  );
}

export default GameStats;

const progressColor = (value: number) => {
  if (value >= 0.9) {
    return 'red';
  } else if (value >= 0.75) {
    return 'yellow';
  }

  return undefined;
};
