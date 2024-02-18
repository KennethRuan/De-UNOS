/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext } from "/utils/context"
import { Event, getBackendURL, getRefValue, getRefValues, isTrue } from "/utils/state"
import { Box as RadixThemesBox, Button as RadixThemesButton, Dialog as RadixThemesDialog, Flex as RadixThemesFlex, Heading as RadixThemesHeading, Text as RadixThemesText, TextField as RadixThemesTextField } from "@radix-ui/themes"
import env from "/env.json"
import { Root as RadixFormRoot } from "@radix-ui/react-form"
import NextHead from "next/head"



export function Button_f143a763019a11a5eb4039c4de0240e2 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_9399c150f17bad15b5c1b37eeea9341f = useCallback((_e) => addEvents([Event("_redirect", {path:`/dashboard`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"width": "100%"}} onClick={on_click_9399c150f17bad15b5c1b37eeea9341f} size={`3`} type={`submit`}>
  {`Submit`}
</RadixThemesButton>
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
  <RadixFormRoot className={`Root`} css={{"backgroundColor": "#FFFFFF66", "borderRadius": "12px", "border": "2px solid #FFFFFF99", "width": "35%", "height": "60%", "display": "flex"}}>
  <RadixThemesFlex align={`start`} css={{"height": "100%", "width": "100%", "padding": "48px", "gap": "36px", "flexDirection": "column"}} gap={`2`}>
  <RadixThemesHeading css={{"fontFamily": "Montserrat", "fontWeight": "bold"}} size={`7`}>
  {`Sign in to our platform`}
</RadixThemesHeading>
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
  <RadixThemesTextField.Input name={`password`} size={`3`} variant={`surface`}/>
</RadixThemesBox>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <Button_f143a763019a11a5eb4039c4de0240e2/>
</RadixThemesFlex>
</RadixFormRoot>
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
