import { Box, Card, Container, Flex, Stack } from '@chakra-ui/react';

import GameGrid from './components/grid/GameGrid';
import GameGridOverlay from './components/grid/GameGridOverlay';
import GameHeader from './components/header/GameHeader';
import GameInfo from './components/info/GameInfo';

function App() {
  return (
    <>
      <Container maxW="6xl" py="10">
        <Stack gap="20px">
          <GameHeader />
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap="20px"
            alignItems={{ base: 'center', lg: 'initial' }}
          >
            <Card.Root
              w="100%"
              maxW={{ base: 'unset', lg: '600px' }}
              flexShrink={0}
            >
              <Card.Body
                w="100%"
                h="100%"
                p="0"
                alignItems={{ base: 'center', lg: 'initial' }}
                position="relative"
              >
                <GameGrid />
                <GameGridOverlay />
              </Card.Body>
            </Card.Root>

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
