import { Card, Tabs } from '@chakra-ui/react';

import GameScore from './score/GameScore';
import GameSettings from './settings/GameSettings';

function GameInfo() {
  return (
    <Card.Root w="100%" h="100%">
      <Card.Body>
        <Tabs.Root defaultValue="score">
          <Tabs.List>
            <Tabs.Trigger value="score">Score</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="score">
            <GameScore />
          </Tabs.Content>
          <Tabs.Content value="settings">
            <GameSettings />
          </Tabs.Content>
        </Tabs.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default GameInfo;
