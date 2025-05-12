import { Card, Tabs } from '@chakra-ui/react';

import GameSettings from './settings/GameSettings';
import GameStats from './stats/GameStats';

function GameInfo() {
  return (
    <Card.Root>
      <Card.Body>
        <Tabs.Root defaultValue="stats">
          <Tabs.List>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="stats">
            <GameStats />
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
