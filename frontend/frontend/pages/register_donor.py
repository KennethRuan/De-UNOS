import reflex as rx
from frontend.components.internal_template import internal_template
from frontend.components.transitions import fade_in


def register_donor():
    return internal_template(
        rx.scroll_area(
            rx.heading("Register a donor", margin_bottom="36px"),
            rx.vstack(
                rx.box(
                    rx.text("Organ"),
                    rx.input(
                        name="organ",
                        variant="surface",
                        size="2",
                    ),
                    width="50%",
                ),
                rx.hstack(
                    rx.box(
                        rx.text("Age"),
                        rx.input(
                            name="age",
                            variant="surface",
                            size="2",
                        ),
                        width="100%",
                    ),
                    rx.box(
                        rx.text("Height (cm)"),
                        rx.input(
                            name="height",
                            variant="surface",
                            size="2",
                        ),
                        width="100%",
                    ),
                    rx.box(
                        rx.text("Blood Type"),
                        rx.input(
                            name="blood_type",
                            variant="surface",
                            size="2",
                        ),
                        width="100%",
                    ),
                    width="100%",
                    gap="36px",
                ),
                rx.box(
                    rx.text("Location"),
                    rx.input(
                        name="location",
                        variant="surface",
                        size="2",
                    ),
                    width="50%",
                ),
                rx.hstack(
                    rx.box(
                        rx.text("Pediatric Status"),
                        rx.input(
                            name="pediatric_status",
                            variant="surface",
                            size="2",
                        ),
                        width="50%",
                    ),
                    rx.box(
                        rx.text("Antigen Test"),
                        rx.input(
                            name="antigen_test",
                            variant="surface",
                            size="2",
                        ),
                        width="50%",
                    ),
                    width="100%",
                    gap="36px",
                ),
                gap="24px",
            ),
            rx.hstack(
                rx.spacer(),
                rx.button(
                    "Confirm registration",
                    size="3",
                    on_click=rx.redirect("/dashboard"),
                ),
                margin_top="48px",
            ),
            style=fade_in,
        )
    )
