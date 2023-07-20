import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider
      theme={extendTheme({
        intialColorMode: "dark",
        styles: {
          global: (props) => ({
            body: {
              bg: "#212121",
            },
            "*": {
              color: "#ffffff!important",
            },
          }),
        },
      })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
