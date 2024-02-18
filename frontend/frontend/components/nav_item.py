import reflex as rx

hover_style = {":hover": {"background_color": "#0090FF66", "cursor": "pointer"}}


def nav_item(name: str, icon: str, link: str) -> rx.Component:
    return rx.box(
        rx.icon(tag="heart"), # this is broken with the iterable
        name,
        style=hover_style,
        width="100%",
        height="48px",
        padding="0 8px",
        display="flex",
        gap="12px",
        align_items="center",
        border_radius="8px",
        on_click=rx.redirect(link),
    )
