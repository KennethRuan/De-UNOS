import reflex as rx

style = {
    "box_shadow": "inset 0 0 0 0 #ffffff",
    "color": "#ffffff",
    "margin": "0 -.25rem",
    "padding": "0 .25rem",
    "font_size": "60px",
    "transition": "color .3s ease-in-out, box-shadow .3s ease-in-out",
    "animation": "floating 4s ease-in-out infinite",
    ":hover": {
        "box_shadow": "inset 1000px 0 0 0 #0090FF",
        "color": "white",
        "cursor": "default",
    },
    "@keyframes floating": {
        "0%, 100%": {"transform": "translate(0,  0px)"},
        "50%": {"transform": "translate(0, 15px)"},
    },
}


def landing():
    return rx.center(
        rx.vstack(
            rx.heading("empower hearts with de-unos.", style=style),
            rx.button(
                "Be part of a world where organ transplants are easier than ever.",
                size="3",
                on_click=rx.redirect("/login"),
                cursor="pointer",
            ),
            gap="90px",
        ),
        height="100vh",
    )
