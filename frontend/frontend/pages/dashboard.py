import reflex as rx
from frontend.components.internal_template import internal_template
import folium


def dashboard():
    return internal_template(rx.heading("Welcome, Hospital"))
