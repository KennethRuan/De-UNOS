import reflex as rx


def login():
    return rx.center(
        rx.form(
            rx.vstack(
                rx.heading("Sign in to our platform", size="7"),
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
            border="2px solid #FFFFFF99",
            width="35%",
            height="60%",
            display="flex",
        ),
        height="100vh",
    )
