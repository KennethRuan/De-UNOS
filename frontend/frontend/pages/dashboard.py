import reflex as rx
from frontend.components.internal_template import internal_template
from reflex.style import Style

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

class HeatmapLayer(LeafletLib):
    library = "react-leaflet"
    tag = "HeatmapLayer"

    def _get_custom_code(self) -> str:
        return """import HeatmapLayer from 'react-leaflet-heatmap-layer-v3';"""

    # Define additional properties required for the HeatmapLayer
    points: rx.Var[list[list[float]]]  # List of points with [lat, lng]
    max_zoom: rx.Var[int]  # Maximum zoom level for the heatmap
    max: rx.Var[int]  # Maximum point intensity
    radius: rx.Var[int]  # Radius of influence for each data point in pixels


class UseMap(LeafletLib):
    library = "react-leaflet"
    tag = "useMap"

map_container = MapContainer.create
tile_layer = TileLayer.create
use_map = UseMap.create
# heatmap_layer = HeatmapLayer.create


def dashboard():
    # Define your heatmap data
    heatmap_data = [
        [37.7749, -122.4194,  0.2],  # [lat, lng, intensity]
        [34.0522, -118.2437,  0.3],
        # ... more data points ...
    ]

    return internal_template(
        map_container(
            tile_layer(
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ),
            # heatmap_layer(
            #     points=heatmap_data,
            #     max_zoom=18,
            #     max=1,
            #     radius=25,
            # ),
            center=[37.428230, -122.168861],
            zoom=13,
            scroll_wheel_zoom=True,
            height="100%",
            width="100%",
        ),
    )

