import { Container, Box, Flex, Heading, Text, Divider } from '@chakra-ui/layout';
import { StarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import Button from '../../../components/Button';

import { getArtist } from '../../api/artist';
import { getArtists } from '../../api/artists';
import { useArtist } from '../../../queries';

const Index = ({ uuid, artist }) => {
  const { freshArtist } = useArtist(uuid, artist);

  // console.log(artist);
  // console.log(freshArtist);

  return (
    <Container maxW="container.xl" p={0}>
      <Flex direction="column">
        <Box minH={350} w="100%" overflow="hidden" position="relative">
          <Image
            src={artist.image}
            alt={(freshArtist || artist).name}
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
          />
        </Box>
        <Box backgroundColor="white" minH={350} px={4} py={6}>
          <Button color="black" border="2px solid">
            BOOKING REQUEST
          </Button>
          <Heading as="h1" my={4}>
            {artist.name}
          </Heading>
          <Flex>
            <Button
              color="white"
              backgroundColor="black"
              border="2px solid"
              leftIcon={<StarIcon />}
            >
              FOLLOW
            </Button>
            <Button color="white" backgroundColor="black" border="2px solid" pl={2} pr={2}>
              <ExternalLinkIcon />
            </Button>
          </Flex>
          <Box>
            <Text color="#aaa" mt={4}>
              ORIGIN
            </Text>
            <Button border="1px solid #bbb" pl={2} pr={2} pt={1} pb={1}>
              {artist.country.name}
            </Button>
          </Box>
          <Box>
            <Text color="#aaa" mt={4}>
              GENRE
            </Text>
            <Button border="1px solid #bbb" pl={2} pr={2} pt={1} pb={1}>
              {artist.genre.name}
            </Button>
          </Box>
          <Flex direction="column">
            <Text color="#aaa" mt={4}>
              SUBGENRES
            </Text>
            <Flex>
              {(artist.subgenres || []).map((subgenre) => (
                <Button
                  border="1px solid #bbb"
                  pl={2}
                  pr={2}
                  pt={1}
                  pb={1}
                  mr={4}
                  key={subgenre.name}
                >
                  {subgenre.name}
                </Button>
              ))}
            </Flex>
          </Flex>
          <Divider mt={8} borderBottomWidth={2} borderColor="black" />
        </Box>
        <Box backgroundColor="#efefef"></Box>
      </Flex>
    </Container>
  );
};

export async function getStaticProps(ctx) {
  const uuid = ctx.params.uuid;
  const response = await getArtist(uuid);

  return {
    props: { uuid, artist: response.artist.data },
    revalidate: 3600, // In seconds
  };
}

export async function getStaticPaths() {
  const { artists } = await getArtists();
  const paths = artists.map((artist) => ({
    params: { uuid: artist.artist_uuid },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default Index;
