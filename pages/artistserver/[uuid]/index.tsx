import { Container, Box, Flex, Heading, Text, Divider } from '@chakra-ui/layout';
import { StarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { ResponsiveBar } from '@nivo/bar';
import orderBy from 'lodash.orderby';

import Button from '../../../components/Button';

import { getArtist } from '../../api/artist';
import { useArtist } from '../../../queries';

const Index = ({ uuid, artist }) => {
  const { freshArtist } = useArtist(uuid, artist);

  console.log(freshArtist);
  if (!artist) return null;
  return (
    <Container maxW="container.xl" p={0}>
      <Flex direction={{ base: 'column', xl: 'row' }}>
        <Flex
          minH={{ base: 350, xl: 700 }}
          w={{ base: '100%', xl: '35%' }}
          overflow="hidden"
          position="relative"
          background="black"
          display="flex"
          justify="center"
          align="center"
        >
          <Image
            src={artist.image}
            alt={(freshArtist || artist).name}
            layout="fill"
            objectFit="contain"
          />
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} width={{ base: '100%', xl: '65%' }}>
          <Box
            backgroundColor="white"
            minH={350}
            px={{ base: 4, md: 10 }}
            py={{ base: 6, md: 14 }}
            width={{ base: '100%', xl: '60%' }}
          >
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
              <Flex wrap="wrap">
                {(artist.subgenres || []).map((subgenre) => (
                  <Button
                    border="1px solid #bbb"
                    pl={2}
                    pr={2}
                    pt={1}
                    pb={1}
                    mr={2}
                    mb={2}
                    key={subgenre.name}
                  >
                    {subgenre.name}
                  </Button>
                ))}
              </Flex>
            </Flex>
            <Divider mt={8} borderBottomWidth={2} borderColor="black" />
          </Box>
          <Flex
            backgroundColor="#efefef"
            minWidth="40%"
            direction="column"
            px={{ base: 4, md: 10 }}
            py={{ base: 6, md: 14 }}
          >
            <Text mt="auto" mb={4}>
              MOST POPULAR IN
            </Text>
            <Box h={250} position="relative">
              <ResponsiveBar
                data={orderBy((freshArtist || artist).popularity, 'percentage')}
                keys={['percentage']}
                indexBy="city"
                margin={{ top: 0 }}
                padding={0.5}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  const uuid = ctx.params.uuid;
  const response = await getArtist(uuid);
  const artist = ((response || {}).artist || {}).data || null;

  return {
    props: { uuid, artist },
  };
}

export default Index;
