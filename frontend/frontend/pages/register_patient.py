import reflex as rx
from frontend.components.internal_template import internal_template
from frontend.data.patient_data import data


class RegisterState(rx.State):
    searched: bool = False

    def search(self):
        self.searched = True


def patient_table(data):
    return rx.table.row(
        rx.table.column_header_cell(data[0]),
        rx.table.cell(data[1]),
    )


def register_patient():
    return internal_template(
        rx.box(
            rx.heading("Register a patient", margin_bottom="36px"),
            rx.tooltip(
                rx.text("Patient ID", cursor="default"),
                content="This is the patient's identifier, like a hospital record number.",
                align="start",
                delay_duration=300,
            ),
            rx.hstack(
                rx.box(
                    rx.input(name="patient_id", variant="surface", size="2"),
                    width="50%",
                ),
                rx.button("Search", on_click=RegisterState.search),
            ),
            rx.cond(
                RegisterState.searched,
                # TODO: add a delay / loading state (animation)
                rx.vstack(
                    rx.text(
                        "Patient data found. The following information will be uploaded to our secure blockchain network. Please review patient vitals before proceeding."
                    ),
                    rx.table.root(
                        rx.table.body(
                            rx.foreach(
                                data[0],  # TODO: function to change whose data shows up
                                patient_table,
                            ),
                        ),
                        width="50%",
                    ),
                ),
            ),
        )
    )
