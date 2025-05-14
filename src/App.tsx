import { Box, Container, Flex, Stack } from '@chakra-ui/react';

import GameGrid from './components/grid/GameGrid';
import GameHeader from './components/header/GameHeader';
import GameInfo from './components/info/GameInfo';

function App() {
  return (
    <>
      <Container maxW="6xl" py="10">
        <Stack gap="20px">
          <GameHeader />
          <Flex direction={['column', 'row']} gap="20px">
            <Box w="100%" maxW="600px" flexShrink={0}>
              <GameGrid />
            </Box>

            <Box flex="1" w="100%">
              <GameInfo />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

export default App;
