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
import "leaflet/dist/leaflet.css";
                import dynamic from 'next/dynamic'
                const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
                
const Circle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });

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
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

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
  <MapContainer center={[37.42823, -122.168861]} css={{"height": "100%", "width": "100%", "customStyle": {"height": "100%", "width": "100%"}}} scrollWheelZoom={true} style={{"height": "100%", "width": "100%"}} zoom={13}>
  <TileLayer attribution={`&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`} css={{"customStyle": null}} url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}/>
  <Circle center={[40.7128, -74.006]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[34.0522, -118.2437]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[41.8781, -87.6298]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[29.7604, -95.3698]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[33.4484, -112.074]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9526, -75.1652]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[29.4241, -98.4936]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7157, -117.1611]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7767, -96.797]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.3382, -121.8863]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.2672, -97.7431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.3322, -81.6557]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.7749, -122.4194]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.7684, -86.1581]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9612, -82.9988]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7555, -97.3308]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.2271, -80.8431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[47.6062, -122.3321]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.7392, -104.9903]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[38.9072, -77.0369]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[42.3601, -71.0589]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[31.7619, -106.485]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[42.3314, -83.0458]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[36.1627, -86.7816]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.1495, -90.049]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[45.5051, -122.675]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.4676, -97.5164]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[36.1699, -115.1398]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[38.2527, -85.7585]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.2904, -76.6122]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[43.0389, -87.9065]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.0844, -106.6504]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.2226, -110.9747]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[36.7372, -119.7871]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[33.4152, -111.8315]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[34.0529, -118.2437]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[40.712, -74.0135]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[33.4484, -112.074]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9526, -75.1652]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.7749, -122.4194]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[29.7604, -95.3698]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[47.6062, -122.3321]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.2271, -80.8431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[41.8781, -87.6298]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7157, -117.1611]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[40.7128, -74.006]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[34.0522, -118.2437]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[41.8781, -87.6298]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[29.7604, -95.3698]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[33.4484, -112.074]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9526, -75.1652]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[29.4241, -98.4936]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7157, -117.1611]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7767, -96.797]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.3382, -121.8863]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.2672, -97.7431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.3322, -81.6557]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7555, -97.3308]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9612, -82.9988]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.2271, -80.8431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.7749, -122.4194]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.7684, -86.1581]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[47.6062, -122.3321]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.3382, -121.8863]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.2672, -97.7431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[30.3322, -81.6557]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[32.7555, -97.3308]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.9612, -82.9988]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.2271, -80.8431]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[37.7749, -122.4194]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.7684, -86.1581]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[47.6062, -122.3321]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.7392, -104.9903]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[38.9072, -77.0369]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[42.3601, -71.0589]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[31.7619, -106.485]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[36.1627, -86.7816]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[42.3314, -83.0458]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.4676, -97.5164]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[45.5051, -122.675]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[36.1699, -115.1398]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.1495, -90.049]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[38.2527, -85.7585]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[39.2904, -76.6122]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[43.0389, -87.9065]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
  <Circle center={[35.0844, -106.6504]} css={{"customStyle": null}} pathOptions={{"color": "blue"}} radius={10000}/>
</MapContainer>
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
