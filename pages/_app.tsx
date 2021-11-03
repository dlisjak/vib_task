import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '../components/Navigation';

import '../styles/main.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Navigation />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
