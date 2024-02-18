/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getBackendURL, isTrue } from "/utils/state"
import { Avatar as RadixThemesAvatar, Box as RadixThemesBox, Button as RadixThemesButton, Dialog as RadixThemesDialog, Flex as RadixThemesFlex, Heading as RadixThemesHeading, Text as RadixThemesText, Theme as RadixThemesTheme } from "@radix-ui/themes"
import env from "/env.json"
import "@radix-ui/themes/styles.css"
import theme from "/utils/theme.js"
import { HeartIcon as LucideHeartIcon } from "lucide-react"
import NextHead from "next/head"



export function Button_82a5d62f7103f34c7e7f99ded989ec1b () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_73cbbcc5d9db9e563330a061e04f36ef = useCallback((_e) => addEvents([Event("_redirect", {path:`/`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"width": "100%"}} onClick={on_click_73cbbcc5d9db9e563330a061e04f36ef} size={`3`} variant={`soft`}>
  {`Log out`}
</RadixThemesButton>
  )
}

export function Box_a171e59a791a189c74452c339bfd24c3 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__iter_state = useContext(StateContexts.state__iter_state)


  return (
    <RadixThemesBox css={{"width": "100%"}}>
  {state__iter_state.route.map((route, index_91bcef38547e506e891a624bdedb9573) => (
  <RadixThemesBox css={{"&:hover": {"backgroundColor": "#0090FF66", "cursor": "pointer"}, "width": "100%", "height": "48px", "padding": "0 8px", "display": "flex", "gap": "12px", "alignItems": "center", "borderRadius": "8px"}} key={index_91bcef38547e506e891a624bdedb9573} onClick={(_e) => addEvents([Event("_redirect", {path:route["link"],external:false})], (_e), {})}>
  <LucideHeartIcon css={{"color": "var(--current-color)"}}/>
  {route["name"]}
</RadixThemesBox>
))}
</RadixThemesBox>
  )
}

export function Fragment_1762bb90abdb81b879b2a22edbbe01a1 () {
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <RadixThemesDialog.Root open={connectError !== null}>
  <RadixThemesDialog.Content>
  <RadixThemesDialog.Title>
  {`Connection Error`}
</RadixThemesDialog.Title>
  <RadixThemesText as={`p`}>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getBackendURL(env.EVENT).href}
</RadixThemesText>
</RadixThemesDialog.Content>
</RadixThemesDialog.Root>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_1762bb90abdb81b879b2a22edbbe01a1/>
  <RadixThemesFlex css={{"height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesBox css={{"backgroundColor": "#FFFFFF66", "borderRadius": "12px", "border": "2px solid #FFFFFF80", "width": "80%", "height": "80%", "display": "flex"}}>
  <RadixThemesBox css={{"backgroundColor": "white", "width": "25%", "borderRadius": "10px 0 0 10px", "padding": "36px"}}>
  <RadixThemesFlex align={`start`} css={{"width": "100%", "height": "100%", "flexDirection": "column"}} gap={`2`}>
  <RadixThemesHeading color={`blue`} css={{"fontFamily": "Montserrat", "fontWeight": "bold"}} size={`8`}>
  {`organs plz`}
</RadixThemesHeading>
  <RadixThemesBox css={{"width": "100%", "height": "64px", "padding": "0 8px", "backgroundColor": "#EEEEEE", "display": "flex", "gap": "12px", "alignItems": "center", "borderRadius": "12px", "marginTop": "24px"}}>
  <RadixThemesAvatar fallback={`RX`} radius={`full`} src={`/avatar.png`} variant={`solid`}/>
  {`Organ Donor`}
</RadixThemesBox>
  <Box_a171e59a791a189c74452c339bfd24c3/>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <Button_82a5d62f7103f34c7e7f99ded989ec1b/>
</RadixThemesFlex>
</RadixThemesBox>
  <RadixThemesBox css={{"width": "80%", "height": "100%", "padding": "48px 36px"}}>
  <RadixThemesHeading css={{"fontFamily": "Montserrat", "fontWeight": "bold"}}>
  {`Welcome, Hospital`}
</RadixThemesHeading>
</RadixThemesBox>
</RadixThemesBox>
</RadixThemesFlex>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
