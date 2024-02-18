import reflex as rx
from frontend.components.internal_template import internal_template


def dashboard():
    return internal_template(rx.heading("Welcome, Hospital"))
