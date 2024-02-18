/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getBackendURL, isTrue } from "/utils/state"
import { Avatar as RadixThemesAvatar, Box as RadixThemesBox, Button as RadixThemesButton, Dialog as RadixThemesDialog, Flex as RadixThemesFlex, Heading as RadixThemesHeading, ScrollArea as RadixThemesScrollArea, Table as RadixThemesTable, Text as RadixThemesText, TextField as RadixThemesTextField, Theme as RadixThemesTheme, Tooltip as RadixThemesTooltip } from "@radix-ui/themes"
import env from "/env.json"
import "@radix-ui/themes/styles.css"
import theme from "/utils/theme.js"
import { HeartIcon as LucideHeartIcon } from "lucide-react"
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react"
import NextHead from "next/head"



export function Button_dcbd04123d4dc37514170884752ab085 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__register_state = useContext(StateContexts.state__register_state)

  const on_click_e3d9cdf370b7582c49aec65130296d47 = useCallback((_e) => addEvents([Event("state.register_state.search", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton disabled={isTrue(((state__register_state.searched) === (true))) ? true : false} onClick={on_click_e3d9cdf370b7582c49aec65130296d47}>
  {`Search`}
</RadixThemesButton>
  )
}

export function Button_fdfb9abde1a99e327c82452dc6a3dd0c () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_2fd35f581ac6d709ce2966c88c7c5818 = useCallback((_e) => addEvents([Event("_redirect", {path:`/login`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"width": "100%"}} onClick={on_click_2fd35f581ac6d709ce2966c88c7c5818} size={`3`} variant={`soft`}>
  {`Log out`}
</RadixThemesButton>
  )
}

export function Box_ce99669a547baa4edf67d2d8cd289c3c () {
  const state__iter_state = useContext(StateContexts.state__iter_state)
  const [addEvents, connectError] = useContext(EventLoopContext);


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

export function Textfield__input_4ab8906c8305fb234e7e1f9e73ad4767 () {
  const state__register_state = useContext(StateContexts.state__register_state)


  return (
    <RadixThemesTextField.Input css={{"cursor": isTrue(((state__register_state.searched) === (true))) ? `not-allowed` : `auto`}} disabled={isTrue(((state__register_state.searched) === (true))) ? true : false} name={`patient_id`} size={`2`} variant={`surface`}/>
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

export function Fragment_ef2beb56ca90b8d51f8f0643ed7d7237 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__register_state = useContext(StateContexts.state__register_state)


  return (
    <Fragment>
  {isTrue(state__register_state.searched) ? (
  <Fragment>
  <RadixThemesBox>
  <RadixThemesText as={`p`} css={{"marginTop": "24px"}}>
  {`Patient data found. Please input what organ is in need.`}
</RadixThemesText>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <RadixThemesBox css={{"width": "50%"}}>
  <RadixThemesTextField.Input css={{"cursor": isTrue(((state__register_state.organ_inputted) === (true))) ? `not-allowed` : `auto`}} disabled={isTrue(((state__register_state.organ_inputted) === (true))) ? true : false} name={`organ`} size={`2`} variant={`surface`}/>
</RadixThemesBox>
  <RadixThemesButton disabled={isTrue(((state__register_state.organ_inputted) === (true))) ? true : false} onClick={(_e) => addEvents([Event("state.register_state.input_organ", {})], (_e), {})}>
  {`Submit`}
</RadixThemesButton>
</RadixThemesFlex>
  <Fragment>
  {isTrue(state__register_state.organ_inputted) ? (
  <Fragment>
  <RadixThemesBox>
  <RadixThemesText as={`p`} css={{"marginTop": "24px", "marginBottom": "12px"}}>
  {`Valid organ has been requested. The following information will be uploaded to our secure blockchain network.`}
</RadixThemesText>
  <RadixThemesFlex css={{"display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesTable.Root css={{"width": "50%"}}>
  <RadixThemesTable.Body>
  {Object.entries({"Patient ID:": "0f0327a7-9e4f", "Age": 20, "Height (cm)": 152, "Blood Type": "A", "Pediatric Status": "No", "Location": "Houston, Texas", "MELD Score": 14, "HLA-B27 Antibodies": "Positive", "Terra Wearable ID": "b844c120-288e-43b1-9c5b-3a40a3c0056a"}).map((data, index_2b12b2927cea2a6931ab22f742f79862) => (
  <RadixThemesTable.Row key={index_2b12b2927cea2a6931ab22f742f79862}>
  <RadixThemesTable.ColumnHeaderCell>
  {data[0]}
</RadixThemesTable.ColumnHeaderCell>
  <RadixThemesTable.Cell>
  {data[1]}
</RadixThemesTable.Cell>
</RadixThemesTable.Row>
))}
  <RadixThemesTable.Row>
  <RadixThemesTable.ColumnHeaderCell>
  {`Organ Needed`}
</RadixThemesTable.ColumnHeaderCell>
  <RadixThemesTable.Cell>
  {`Kidney`}
</RadixThemesTable.Cell>
</RadixThemesTable.Row>
</RadixThemesTable.Body>
</RadixThemesTable.Root>
</RadixThemesFlex>
  <RadixThemesText as={`p`} css={{"marginTop": "24px", "marginBottom": "12px"}}>
  {`Please review patient vitals before proceeding.`}
</RadixThemesText>
  <Stat>
  <StatLabel>
  {`Example Stat`}
</StatLabel>
  <StatNumber>
  {`100 bpm`}
</StatNumber>
  <StatHelpText>
  {`Description`}
</StatHelpText>
</Stat>
</RadixThemesBox>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
</RadixThemesBox>
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
  <RadixThemesBox css={{"backgroundColor": "#FFFFFF66", "borderRadius": "12px", "border": "2px solid #FFFFFF99", "width": "80%", "height": "80%", "display": "flex"}}>
  <RadixThemesBox css={{"backgroundColor": "white", "width": "25%", "borderRadius": "10px 0 0 10px", "padding": "36px"}}>
  <RadixThemesFlex align={`start`} css={{"width": "100%", "height": "100%", "flexDirection": "column"}} gap={`2`}>
  <RadixThemesHeading color={`blue`} css={{"fontFamily": "Montserrat", "fontWeight": "bold"}} size={`8`}>
  {`organs plz`}
</RadixThemesHeading>
  <RadixThemesBox css={{"width": "100%", "height": "64px", "padding": "0 8px", "backgroundColor": "#EEEEEE", "display": "flex", "gap": "12px", "alignItems": "center", "borderRadius": "12px"}}>
  <RadixThemesAvatar fallback={`RX`} radius={`full`} src={`/avatar.png`} variant={`solid`}/>
  {`Organ Donor`}
</RadixThemesBox>
  <Box_ce99669a547baa4edf67d2d8cd289c3c/>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <Button_fdfb9abde1a99e327c82452dc6a3dd0c/>
</RadixThemesFlex>
</RadixThemesBox>
  <RadixThemesBox css={{"width": "80%", "height": "100%", "padding": "48px 36px"}}>
  <RadixThemesScrollArea scrollbars={`vertical`} type={`scroll`}>
  <RadixThemesHeading css={{"marginBottom": "36px", "fontFamily": "Montserrat", "fontWeight": "bold"}}>
  {`Register a patient`}
</RadixThemesHeading>
  <RadixThemesTooltip align={`start`} content={`This is the patient's identifier, like a hospital record number.`} delayDuration={300}>
  <RadixThemesText as={`p`} css={{"cursor": "default"}}>
  {`Please input the Patient ID.`}
</RadixThemesText>
</RadixThemesTooltip>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <RadixThemesBox css={{"width": "50%"}}>
  <Textfield__input_4ab8906c8305fb234e7e1f9e73ad4767/>
</RadixThemesBox>
  <Button_dcbd04123d4dc37514170884752ab085/>
</RadixThemesFlex>
  <Fragment_ef2beb56ca90b8d51f8f0643ed7d7237/>
</RadixThemesScrollArea>
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
