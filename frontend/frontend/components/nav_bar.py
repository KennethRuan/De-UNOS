import reflex as rx
from frontend.components.nav_item import nav_item


class IterState(rx.State):
    route: list[dict] = [
        {"name": "one", "icon": "heart", "link": "/login"},
        {"name": "one", "icon": "heart", "link": "/login"},
        {"name": "one", "icon": "heart", "link": "/login"},
    ]


def nav_items_mapped(route):
    # TODO: minor issue: icon not working
    return nav_item(route["name"], route["icon"], route["link"])


def nav_bar():
    return rx.box(rx.foreach(IterState.route, nav_items_mapped), width="100%")
