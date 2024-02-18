import reflex as rx
from frontend.components.internal_template import internal_template
from reflex.style import Style
import json
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.io import to_json
import random
from geopy.geocoders import Nominatim

class LeafletLib(rx.Component):
    def _get_imports(self):
        return {}

    @classmethod
    def create(cls, *children, **props):
        custom_style = props.pop("style", {})

        # Transfer style props to the custom style prop.
        for key, value in props.items():
            if key not in cls.get_fields():
                custom_style[key] = value

        # Create the component.
        return super().create(
            *children,
            **props,
            custom_style=Style(custom_style),
        )

    def _add_style(self, style):
        self.custom_style = self.custom_style or {}
        self.custom_style.update(style)  # type: ignore

    def _render(self):
        out = super()._render()
        return out.add_props(style=self.custom_style).remove_props("custom_style")

class MapContainer(LeafletLib):
    library = "react-leaflet"
    tag = "MapContainer"

    center: rx.Var[list[float]]
    zoom: rx.Var[int]
    scroll_wheel_zoom: rx.Var[bool]

    def _get_custom_code(self) -> str:
        return """import "leaflet/dist/leaflet.css";
                import dynamic from 'next/dynamic'
                const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
                """

class TileLayer(LeafletLib):
    library = "react-leaflet"
    tag = "TileLayer"

    def _get_custom_code(self) -> str:
        return """const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });"""

    attribution: rx.Var[str]
    url: rx.Var[str]

class Marker(LeafletLib):
    library = "react-leaflet"
    tag = "Marker"

    def _get_custom_code(self) -> str:
        return """const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });"""

    position: rx.Var[list[float]]
    icon: rx.Var[dict]


class Popup(LeafletLib):
    library = "react-leaflet"
    tag = "Popup"

    def _get_custom_code(self) -> str:
        return """const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });"""

class Circle(LeafletLib):
    library = "react-leaflet"
    tag = "Circle"

    def _get_custom_code(self) -> str:
        return """const Circle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });"""

    center: rx.Var[list[float]]  # Center of the circle as [lat, lng]
    radius: rx.Var[int]  # Radius of the circle in meters
    path_options: rx.Var[dict]  # Options for the circle path

class UseMap(LeafletLib):
    library = "react-leaflet"
    tag = "useMap"

map_container = MapContainer.create
tile_layer = TileLayer.create
use_map = UseMap.create
marker = Marker.create
popup = Popup.create
circle = Circle.create

def dashboard():
    patients = [
        [40.7128, -74.0060],   # New York City
        [34.0522, -118.2437],  # Los Angeles
        [41.8781, -87.6298],   # Chicago
        [29.7604, -95.3698],   # Houston
        [33.4484, -112.0740],  # Phoenix
        [39.9526, -75.1652],   # Philadelphia
        [29.4241, -98.4936],   # San Antonio
        [32.7157, -117.1611],  # San Diego
        [32.7767, -96.7970],   # Dallas
        [37.3382, -121.8863],  # San Jose
        [30.2672, -97.7431],   # Austin
        [30.3322, -81.6557],   # Jacksonville
        [37.7749, -122.4194],  # San Francisco
        [39.7684, -86.1581],   # Indianapolis
        [39.9612, -82.9988],   # Columbus
        [32.7555, -97.3308],   # Fort Worth
        [35.2271, -80.8431],   # Charlotte
        [47.6062, -122.3321],  # Seattle
        [39.7392, -104.9903],  # Denver
        [38.9072, -77.0369],   # Washington
        [42.3601, -71.0589],   # Boston
        [31.7619, -106.4850],  # El Paso
        [36.1627, -86.7816],   # Nashville
        [42.3314, -83.0458],   # Detroit
        [35.4676, -97.5164],   # Oklahoma City
        [45.5051, -122.6750],  # Portland
        [36.1699, -115.1398],  # Las Vegas
        [35.1495, -90.0490],   # Memphis
        [38.2527, -85.7585],   # Louisville
        [40.7128, -74.0060],
        [34.0522, -118.2437],
        [41.8781, -87.6298],
        [29.7604, -95.3698],
        [33.4484, -112.0740],
        [39.9526, -75.1652],
        [29.4241, -98.4936],
        [32.7157, -117.1611],
        [32.7767, -96.7970],
        [37.3382, -121.8863],
        [30.2672, -97.7431],
        [30.3322, -81.6557],
        [37.7749, -122.4194],
        [39.7684, -86.1581],
        [39.9612, -82.9988],
        [32.7555, -97.3308],
        [35.2271, -80.8431],
        [47.6062, -122.3321],
        [39.7392, -104.9903],
        [38.9072, -77.0369],
        [42.3601, -71.0589],
        [31.7619, -106.4850],
        [42.3314, -83.0458],
        [36.1627, -86.7816],
        [35.1495, -90.0490],
        [45.5051, -122.6750],
        [35.4676, -97.5164],
        [36.1699, -115.1398],
        [38.2527, -85.7585],
        [39.2904, -76.6122],
        [43.0389, -87.9065],
        [35.0844, -106.6504],
        [32.2226, -110.9747],
        [36.7372, -119.7871],
        [33.4152, -111.8315],
        [34.0529, -118.2437],
        [40.7120, -74.0135],
        [33.4484, -112.0740],
        [39.9526, -75.1652],
        [37.7749, -122.4194],
        [29.7604, -95.3698],
        [47.6062, -122.3321],
        [35.2271, -80.8431],
        [41.8781, -87.6298],
        [32.7157, -117.1611],
        [40.7128, -74.0060],  # New York City
        [34.0522, -118.2437],  # Los Angeles
        [41.8781, -87.6298],  # Chicago
        [29.7604, -95.3698],  # Houston
        [33.4484, -112.0740],  # Phoenix
        [39.9526, -75.1652],  # Philadelphia
        [29.4241, -98.4936],  # San Antonio
        [32.7157, -117.1611],  # San Diego
        [32.7767, -96.7970],  # Dallas
        [37.3382, -121.8863],  # San Jose
        [30.2672, -97.7431],  # Austin
        [30.3322, -81.6557],  # Jacksonville
        [32.7555, -97.3308],  # Fort Worth
        [39.9612, -82.9988],  # Columbus
        [35.2271, -80.8431],  # Charlotte
        [37.7749, -122.4194],  # San Francisco
        [39.7684, -86.1581],  # Indianapolis
        [47.6062, -122.3321],  # Seattle
         [37.3382, -121.8863],  # San Jose
        [30.2672, -97.7431],  # Austin
        [30.3322, -81.6557],  # Jacksonville
        [32.7555, -97.3308],  # Fort Worth
        [39.9612, -82.9988],  # Columbus
        [35.2271, -80.8431],  # Charlotte
        [37.7749, -122.4194],  # San Francisco
        [39.7684, -86.1581],  # Indianapolis
        [47.6062, -122.3321],  # Seattle
        [39.7392, -104.9903],  # Denver
        [38.9072, -77.0369],  # Washington
        [42.3601, -71.0589],  # Boston
        [31.7619, -106.4850],  # El Paso
        [36.1627, -86.7816],  # Nashville
        [42.3314, -83.0458],  # Detroit
        [35.4676, -97.5164],  # Oklahoma City
        [45.5051, -122.6750],  # Portland
        [36.1699, -115.1398],  # Las Vegas
        [35.1495, -90.0490],  # Memphis
        [38.2527, -85.7585],  # Louisville
        [39.2904, -76.6122],
        [43.0389, -87.9065],  # Milwaukee
        [35.0844, -106.6504],  # Albuquerque
    ]

    circles = [
        circle(center=p, radius=10000, path_options={'color': 'blue'})
        for p in patients
    ]

    return internal_template(
        map_container(
            tile_layer(
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ),
            *circles,  # Unpack the list of circles with tooltips into individual arguments
            center=[37.428230, -122.168861],
            zoom=13,
            scroll_wheel_zoom=True,
            height="100%",
            width="100%",
        ),
    )

# class State(rx.State):
#     us_cities = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/us-cities-top-1k.csv")

#     @rx.var
#     def fig_map(self) -> go.Figure:
#         if self.us_cities.empty:
#             return go.Figure()
#         else:
#             fig = px.scatter_mapbox(self.us_cities, lat="lat", lon="lon", hover_name="City",
#                                     color_discrete_sequence=["blue"], zoom=3, height=300)
#             fig.update_layout(mapbox_style="open-street-map")
#             fig.update_layout(margin={"r": 0, "t": 0, "l": 0, "b": 0})

#             return fig

#     @rx.var
#     def fig_layout(self) -> dict:
#         return json.loads(str(to_json(self.fig_map.layout)))


# def dashboard():
#     return internal_template(
#         # rx.color_mode_button(rx.color_mode_icon(), float="right"),
#         rx.plotly(data=State.fig_map, layout=State.fig_layout),
#     )

