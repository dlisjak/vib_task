import { Container } from '@chakra-ui/layout';

import { useArtists } from '../queries';

const Index = () => {
  const { artists } = useArtists();

  console.log(artists);

  return (
    <Container maxW="container.xl">
      <h1>Vib</h1>
    </Container>
  );
};

export default Index;
