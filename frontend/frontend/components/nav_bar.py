import reflex as rx
from frontend.components.nav_item import nav_item


class IterState(rx.State):
    route: list[dict] = [
        {"name": "Home", "icon": "heart", "link": "/dashboard"},
        {"name": "Register a patient", "icon": "heart", "link": "/register/patient"},
        {"name": "Register a donor", "icon": "heart", "link": "/register/donor"},
    ]


def nav_items_mapped(route):
    # TODO: minor issue: icon not working
    return nav_item(route["name"], route["icon"], route["link"])


def nav_bar():
    return rx.box(rx.foreach(IterState.route, nav_items_mapped), width="100%")
