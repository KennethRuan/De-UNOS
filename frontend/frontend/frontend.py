"""Welcome to Reflex! This file outlines the steps to create a basic app."""

from frontend.pages.login import login
from frontend.pages.dashboard import dashboard
from frontend.pages.register_patient import register_patient

import reflex as rx

style = {
    rx.heading: {"font_family": "Montserrat", "font_weight": "bold"},
    "font_family": "Montserrat",
    "font_size": "16px",
    "background_image": "radial-gradient(circle, #0078cc, #4a94d6, #77afdf, #a3cbe8, #d1e5f2)",
    "::selection": {
        "background_color": "#a3cbe8",
    },
}


def index() -> rx.Component:
    return rx.center(
        rx.text("we are going to put a beautiful landing here"),
        height="100vh",
    )


app = rx.App(
    style=style,
    stylesheets=[
        "fonts/montserrat.css",
    ],
    theme=rx.theme(
        appearance="light",
        accent_color="blue",
    ),
)
app.add_page(index)
app.add_page(login)
app.add_page(dashboard)
app.add_page(register_patient, route="/register-patient")