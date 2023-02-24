import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme({
      intialColorMode: 'dark',
      styles: {
        global: (props) => ({
          body: {
            bg: 'radial-gradient(circle, rgba(71, 10, 145,1) 0%, rgba(109, 14, 198,1) 100%)',
          },
          '*': {
            color: '#ffffff!important'
          },
        }),
      },
    })}>
      <Component {...pageProps} />
    </ChakraProvider >
  );
}
