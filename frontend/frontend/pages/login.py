import reflex as rx


def login():
    return rx.center(
        rx.box(
            rx.vstack(
                rx.vstack(
                    rx.heading("Sign in to our ", rx.text.em("platform"), size="7"),
                    rx.text("Trusted by healthcare professionals around the world."),
                    gap="12px",
                ),
                rx.box(
                    rx.text("Email"),
                    rx.input(name="email", variant="surface", size="3"),
                    width="100%",
                ),
                rx.box(
                    rx.text("Password"),
                    rx.input(name="password", variant="surface", size="3"),
                    width="100%",
                ),
                rx.spacer(),
                rx.button(
                    "Submit",
                    type="submit",
                    size="3",
                    width="100%",
                    on_click=rx.redirect("/dashboard"),
                ),
                height="100%",
                width="100%",
                padding="48px",
                gap="36px",
            ),
            background_color="#FFFFFF66",
            border_radius="12px",
            border="2px solid #FFFFFF80",
            width="30%",
            height="65%",
            display="flex",
        ),
        height="100vh",
    )
