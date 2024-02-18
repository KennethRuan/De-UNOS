import reflex as rx
from frontend.components.internal_template import internal_template
from frontend.data.patient_data import patient_data
from frontend.terra.API import TerraAPI


class RegisterState(rx.State):
    searched: bool = False
    organ_inputted: bool = False
    vitals: dict = {}

    def search(self):
        self.searched = True

    def input_organ(self):
        self.organ_inputted = True
        terra_api = TerraAPI()
        self.vitals = terra_api.request_body_data(patient_data[9]["Terra Wearable ID"])


def patient_table(info):
    return rx.table.row(
        rx.table.column_header_cell(info[0]),
        rx.table.cell(info[1]),
    )


def patient_vitals(info):
    return rx.chakra.stat(
        rx.chakra.stat_label(info[0]),
        rx.chakra.stat_number(info[1]),
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
                                            patient_data[
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
                                margin_bottom="24px",
                            ),
                            rx.hstack(
                                rx.foreach(
                                    RegisterState.vitals,
                                    patient_vitals,
                                ),
                                justify="between",
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
                        ),
                    ),
                ),
            ),
            type="scroll",
            scrollbars="vertical",
        )
    )
