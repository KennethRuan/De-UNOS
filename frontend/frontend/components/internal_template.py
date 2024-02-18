import reflex as rx
from frontend.components.sidebar import sidebar


def internal_template(page_content) -> rx.Component:
    return rx.center(
        rx.box(
            rx.box(
                sidebar(),
                background_color="white",
                width="20%",
                border_radius="12px 0 0 12px",
                padding="24px",
            ),
            rx.box(
                page_content,
                width="80%",
                padding="24px",
            ),
            background_color="#FFFFFF66",
            border_radius="12px",
            border="2px solid #FFFFFF99",
            width="80%",
            height="80%",
            display="flex",
        ),
        height="100vh",
    )
