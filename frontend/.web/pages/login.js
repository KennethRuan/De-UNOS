/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext } from "/utils/context"
import { Event, getBackendURL, isTrue } from "/utils/state"
import { Box as RadixThemesBox, Button as RadixThemesButton, Dialog as RadixThemesDialog, Em as RadixThemesEm, Flex as RadixThemesFlex, Heading as RadixThemesHeading, Text as RadixThemesText, TextField as RadixThemesTextField } from "@radix-ui/themes"
import env from "/env.json"
import NextHead from "next/head"



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

export function Button_f143a763019a11a5eb4039c4de0240e2 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_9399c150f17bad15b5c1b37eeea9341f = useCallback((_e) => addEvents([Event("_redirect", {path:`/dashboard`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"width": "100%"}} onClick={on_click_9399c150f17bad15b5c1b37eeea9341f} size={`3`} type={`submit`}>
  {`Submit`}
</RadixThemesButton>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_1762bb90abdb81b879b2a22edbbe01a1/>
  <RadixThemesFlex css={{"height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesBox css={{"animation": "fade 1s", "@keyframes fade": {"0%": {"opacity": "0", "transform": "translateY(20px)"}, "100%": {"opacity": "1", "transform": "translateY(0px)"}}, "backgroundColor": "#FFFFFF66", "borderRadius": "12px", "border": "2px solid #FFFFFF80", "width": "30%", "height": "65%", "display": "flex"}}>
  <RadixThemesFlex align={`start`} css={{"height": "100%", "width": "100%", "padding": "48px", "gap": "36px", "flexDirection": "column"}} gap={`2`}>
  <RadixThemesFlex align={`start`} css={{"gap": "12px", "flexDirection": "column"}} gap={`2`}>
  <RadixThemesHeading css={{"fontFamily": "Montserrat", "fontWeight": "bold"}} size={`7`}>
  {`Sign in to our `}
  <RadixThemesEm>
  {`platform`}
</RadixThemesEm>
</RadixThemesHeading>
  <RadixThemesText as={`p`}>
  {`Trusted by healthcare professionals around the world.`}
</RadixThemesText>
</RadixThemesFlex>
  <RadixThemesBox css={{"width": "100%"}}>
  <RadixThemesText as={`p`}>
  {`Email`}
</RadixThemesText>
  <RadixThemesTextField.Input name={`email`} size={`3`} variant={`surface`}/>
</RadixThemesBox>
  <RadixThemesBox css={{"width": "100%"}}>
  <RadixThemesText as={`p`}>
  {`Password`}
</RadixThemesText>
  <RadixThemesTextField.Input name={`password`} size={`3`} type={`password`} variant={`surface`}/>
</RadixThemesBox>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <Button_f143a763019a11a5eb4039c4de0240e2/>
</RadixThemesFlex>
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
