/** @jsxImportSource @emotion/react */

import '/styles/styles.css'

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import theme from "/utils/theme.js"
import ChakraColorModeProvider from "/components/reflex/chakra_color_mode_provider.js"
import RadixThemesColorModeProvider from "/components/reflex/radix_themes_color_mode_provider.js"
import { Theme as RadixThemesTheme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { Fragment } from "react"


import { EventLoopProvider, StateProvider } from "/utils/context.js";
import { ThemeProvider } from 'next-themes'



function AppWrap({children}) {


  return (
    <ChakraProvider theme={extendTheme(theme)}>
  <ChakraColorModeProvider>
  <RadixThemesColorModeProvider>
  <RadixThemesTheme accentColor={`blue`} appearance={`light`} css={{...theme.styles.global[':root'], ...theme.styles.global.body}}>
  <Fragment>
  {children}
</Fragment>
</RadixThemesTheme>
</RadixThemesColorModeProvider>
</ChakraColorModeProvider>
</ChakraProvider>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="chakra-ui-color-mode" attribute="class">
      <AppWrap>
        <StateProvider>
          <EventLoopProvider>
            <Component {...pageProps} />
          </EventLoopProvider>
        </StateProvider>
      </AppWrap>
    </ThemeProvider>
  );
}

