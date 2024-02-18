"""Welcome to Reflex! This file outlines the steps to create a basic app."""

from frontend.pages.landing import landing
from frontend.pages.login import login
from frontend.pages.dashboard import dashboard
from frontend.pages.register_patient import register_patient
from frontend.pages.register_donor import register_donor
from frontend.pages.data_table import data_table

import reflex as rx

style = {
    rx.heading: {"font_family": "Montserrat", "font_weight": "bold"},
    "font_family": "Montserrat",
    "font_size": "16px",
    "color": "#1D3053",
    "background_image": "/background.jpg",
    "background_repeat": "no_repeat",
    "background_size": "cover",
    # "background_image": "radial-gradient(circle, #0078cc, #4a94d6, #77afdf, #a3cbe8, #d1e5f2)",
    "::selection": {
        "background_color": "#a3cbe8",
    },
}


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
app.add_page(landing, route="/", title="De-UNOS")
app.add_page(login, title="De-UNOS")
app.add_page(dashboard, title="De-UNOS")
app.add_page(register_patient, route="/register/patient", title="De-UNOS")
app.add_page(register_donor, route="/register/donor", title="De-UNOS")
app.add_page(data_table, route="/data-table", title="De-UNOS")
