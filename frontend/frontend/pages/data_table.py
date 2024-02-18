import reflex as rx
from frontend.components.internal_template import internal_template
import requests

def getOrBlank(obj, key):
  return obj.get(key) if obj.get(key) else ""

class DataState(rx.State):
  data: list = [[]]

  def fetch_data(self):
      resp = requests.get("http://localhost:3051/api/query-all-patients").json()
      # Extract the patientId, organNeeded, age, height, bloodType, pediatricStatus, location, meldScore, hlaB27Antibodies and terraWearableId from each entry
      # self.data = [[entry.get("patientId"), entry.get("age"), entry.get("height"), entry.get("bloodType"), entry.get("pediatricStatus"), entry.get("location"), entry.get("meldScore"), entry.get("hlaB27Antibodies")] for entry in resp]
      self.data = [[getOrBlank(entry, "patientId"),getOrBlank(entry, "organNeeded"), getOrBlank(entry, "age"), getOrBlank(entry, "height"), getOrBlank(entry, "bloodType"), getOrBlank(entry, "pediatricStatus"), getOrBlank(entry, "location"), getOrBlank(entry, "meldScore"), getOrBlank(entry, "hlaB27Antibodies"), getOrBlank(entry, "terraWearableId")] for entry in resp]
      print(self.data)


# patientId, age, height, bloodType, pediatricStatus, location, meldScore, hlaB27Antibodies
@rx.page(on_load=DataState.fetch_data)
def data_table() -> rx.Component:
    return internal_template(
      rx.flex(
        rx.text("Data Table"),
        rx.data_table(
          data=DataState.data,
          columns=["Patient ID", "Organ", "Age", "Height", "Blood Type", "Pediatric Status", "Location", "Meld Score", "HLA-B27 Antibodies", "Terra Wearable ID"],
          freeze_rows=1,
          row_height=50,
          smooth_scroll_x=True,
          overscroll_x=100,
          max_height="500",
          height="100%",
        ),
        height="100%",
        flexDirection="column"
      )
    )