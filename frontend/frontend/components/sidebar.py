import reflex as rx
from frontend.components.header import header
from frontend.components.nav_bar import nav_bar


def sidebar() -> rx.Component:
    return rx.vstack(
        header(),
        rx.box(
            rx.avatar(
                src="/avatar.png",
                variant="solid",
                radius="full",
                fallback="RX",
            ),
            "Organ Donor",
            width="100%",
            height="64px",
            padding="0 8px",
            background_color="#EEEEEE",
            display="flex",
            gap="12px",
            align_items="center",
            border_radius="12px",
        ),
        nav_bar(),
        rx.spacer(),
        rx.button(
            "Log out",
            variant="soft",
            size="3",
            width="100%",
            on_click=rx.redirect("/login"),
        ),
        width="100%",
        height="100%",
    )
