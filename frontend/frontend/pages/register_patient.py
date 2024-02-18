import reflex as rx
from frontend.components.internal_template import internal_template
from frontend.data.patient_data import data


class RegisterState(rx.State):
    searched: bool = False
    organ_inputted: bool = False

    def search(self):
        self.searched = True

    def input_organ(self):
        self.organ_inputted = True


def patient_table(data):
    return rx.table.row(
        rx.table.column_header_cell(data[0]),
        rx.table.cell(data[1]),
    )


def register_patient():
    return internal_template(
        rx.scroll_area(
            rx.heading("Register a patient", margin_bottom="36px"),
            rx.tooltip(
                rx.text("Please input the Patient ID.", cursor="default"),
                content="This is the patient's identifier, like a hospital record number.",
                align="start",
                delay_duration=300,
            ),
            rx.hstack(
                rx.box(
                    rx.input(
                        name="patient_id",
                        variant="surface",
                        size="2",
                        disabled=rx.cond(RegisterState.searched == True, True, False),
                        cursor=rx.cond(
                            RegisterState.searched == True, "not-allowed", "auto"
                        ),
                    ),
                    width="50%",
                ),
                rx.button(
                    "Search",
                    on_click=RegisterState.search,
                    disabled=rx.cond(RegisterState.searched == True, True, False),
                ),
            ),
            rx.cond(
                RegisterState.searched,
                # TODO: add a delay / loading state (animation)
                rx.box(
                    rx.text(
                        "Patient data found. Please input what organ is in need.",
                        margin_top="24px",
                    ),
                    rx.hstack(
                        rx.box(
                            rx.input(
                                name="organ",
                                variant="surface",
                                size="2",
                                disabled=rx.cond(
                                    RegisterState.organ_inputted == True, True, False
                                ),
                                cursor=rx.cond(
                                    RegisterState.organ_inputted == True,
                                    "not-allowed",
                                    "auto",
                                ),
                            ),
                            width="50%",
                        ),
                        rx.button(
                            "Submit",
                            on_click=RegisterState.input_organ,
                            disabled=rx.cond(
                                RegisterState.organ_inputted == True, True, False
                            ),
                        ),
                    ),
                    rx.cond(
                        RegisterState.organ_inputted,
                        rx.box(
                            rx.text(
                                "Valid organ has been requested. The following information will be uploaded to our secure blockchain network.",
                                margin_top="24px",
                                margin_bottom="12px",
                            ),
                            rx.center(
                                rx.table.root(
                                    rx.table.body(
                                        rx.foreach(
                                            data[
                                                0
                                            ],  # TODO: function to change whose data shows up
                                            patient_table,
                                        ),
                                        rx.table.row(
                                            rx.table.column_header_cell("Organ Needed"),
                                            rx.table.cell("Kidney"),
                                        ),
                                    ),
                                    width="50%",
                                ),
                            ),
                            rx.text(
                                "Please review patient vitals before proceeding.",
                                margin_top="24px",
                                margin_bottom="12px",
                            ),
                            rx.chakra.stat(
                                rx.chakra.stat_label("Example Stat"),
                                rx.chakra.stat_number("100 bpm"),
                                rx.chakra.stat_help_text("Description"),
                            ),
                        ),
                    ),
                ),
            ),
            type="scroll",
            scrollbars="vertical",
        )
    )
