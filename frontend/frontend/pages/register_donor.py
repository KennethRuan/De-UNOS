import reflex as rx
from frontend.components.internal_template import internal_template
from frontend.components.transitions import fade_in
from requests import post


class DonorState(rx.State):
    form_data: dict = {}
    modal_open: bool = False

    def handle_submit(self, form_data: dict):
        self.form_data = form_data

        if self.form_data["organ"] == "Kidney":
            self.modal_open = True
        # after hitting submit button all data is in the form_data dictionary
        # can use this to add to blockchain
        data = post("http://localhost:3051/api/add-donor", json=form_data)


def register_donor():
    return internal_template(
        rx.form(
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
                    type="submit",
                    # on_click=rx.redirect("/dashboard"),
                ),
                margin_top="48px",
            ),
            rx.dialog.root(
                rx.dialog.content(
                    rx.dialog.title("We've found a match!"),
                    rx.dialog.description(
                        "Your organ has been matched with a patient! A doctor will reach out soon with further instructions.",
                    ),
                    rx.hstack(
                        rx.spacer(),
                        rx.button(
                            "Continue",
                            on_click=rx.redirect("/dashboard"),
                            margin_top="24px",
                        ),
                    ),
                ),
                open=DonorState.modal_open,
            ),
            on_submit=DonorState.handle_submit,
            style=fade_in,
        )
    )
