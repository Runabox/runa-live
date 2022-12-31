import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme({
      intialColorMode: 'dark',
      styles: {
        global: (props) => ({
          body: {
            bg: '#000000',
            color: '#ffffff'
          },
        }),
      },
    })}>
      <Component {...pageProps} />
    </ChakraProvider >
  );
}
