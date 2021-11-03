import { Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import Link from '../Link';

import { useArtists } from '../../queries';

const fallbackArtists = [
  {
    artist_name: 'Umek',
    artist_uuid: '7c46c4ce-09c0-4f95-b4e1-84ae10bd24ab',
  },
  {
    artist_name: 'Ariana Grande',
    artist_uuid: '563d07d4-1ff7-45b4-85cc-9c9bed8ac9f2',
  },
  {
    artist_name: 'BLACKPINK',
    artist_uuid: '67d55c78-9eac-4968-a4c9-0d1131213df0',
  },
];

const Navigation = () => {
  const { artists } = useArtists();

  return (
    <Container
      maxW="full"
      style={{
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
      }}
      position="relative"
      zIndex={999}
      backgroundColor="black"
      color="white"
      pl={0}
    >
      <Flex align="center">
        <Link href="/" mr={16} position="relative" _hover={{ textDecoration: 'none' }} height={63}>
          <Image src="/logo/logo-v.svg" width={63} height={63} alt="viberate logo" />
        </Link>
        <Flex className="hideOnMobile" py={5}>
          {(artists || fallbackArtists).map(({ artist_name, artist_uuid }) => (
            <Link key={artist_uuid} href={`/artist/${artist_uuid}`} mr={8}>
              {artist_name}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navigation;
