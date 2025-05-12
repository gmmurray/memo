import { Container, SimpleGrid, Stack } from '@chakra-ui/react';

import GameBar from './components/bar/GameBar';
import GameGrid from './components/grid/GameGrid';
import GameHeader from './components/header/GameHeader';
import GameInfo from './components/info/GameInfo';
import GameInfoOld from './components/info/GameInfoOld';
import classes from './App.module.css';
import clsx from 'clsx';

function App() {
  return (
    <>
      <Container maxW="6xl" padding="20px">
        <Stack gap="20px">
          <GameHeader />
          <SimpleGrid columns={2} gap="20px" minChildWidth="sm">
            <GameGrid />
            <GameInfo />
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}

export default App;
