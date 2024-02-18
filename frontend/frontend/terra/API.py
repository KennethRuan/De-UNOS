# Importing the API and instantiating the client using your keys
import requests
from terra.base_client import Terra
from datetime import datetime
import argparse

DEV_ID = "unos-testing-WLf5LjVVuc"
API_KEY = "sTrGY7M0IkL4hn1H7uZPgk7EJTNsOk1d"
SECRET = "c0f039bbfb39f6cbff2726ad7c8dfde21cfae2b666a85de7"
PROVIDER = "FITBIT"

users = {
    "PATIENTONE": "b844c120-288e-43b1-9c5b-3a40a3c0056a",
    "PATIENTTWO": "870ccf19-370a-411a-85fa-9e2e7c997360",
}


class TerraAPI:
    def __init__(self):
        self.terra = Terra(API_KEY, DEV_ID, SECRET)

    def see_providers(self):
        parsed_api_response = self.terra.list_providers().get_parsed_response()
        print(parsed_api_response)

    def see_users(self):
        parsed_api_response = self.terra.list_users().get_parsed_response()
        print(parsed_api_response)

    def generate_auth_url(self, REF_ID):
        auth_resp = self.terra.generate_authentication_url(
            reference_id=REF_ID,
            resource=PROVIDER,
            auth_success_redirect_url=None,
            auth_failure_redirect_url=None,
        ).get_parsed_response()
        print(auth_resp)

    def deauth_user(self, USER_ID):
        url = (
            "https://api.tryterra.co/v2/auth/deauthenticateUser" + "?user_id=" + USER_ID
        )
        headers = {"accept": "application/json", "dev-id": DEV_ID, "x-api-key": API_KEY}

        response = requests.delete(url, headers=headers)
        print(response.text)

    # Use this instead of the auth url if you want more provider options
    def generate_widget_session(self, USER_ID):
        widget_response = self.terra.generate_widget_session(
            reference_id=USER_ID,
            providers=[PROVIDER],
            auth_success_redirect_url=None,
            auth_failure_redirect_url=None,
            language="en",
        ).get_parsed_response()
        print(widget_response)

    def request_body_data(self, USER_ID):
        # Create a user object
        terra_user = self.terra.from_user_id(USER_ID)

        # Get the body data from the start of the day to current time
        body_data = terra_user.get_body(
            start_date=datetime.strptime("2024-02-18", "%Y-%m-%d"),
            end_date=datetime.now(),
            to_webhook=False,
            with_samples=False,
        )
        body_data_json = body_data.get_json()

        # Isolate useful data, or return placeholder if error in fetching data

        try:
            avg_heart_bpm = round(
                body_data_json["data"][0]["heart_data"]["heart_rate_data"]["summary"][
                    "avg_hr_bpm"
                ],
                2,
            )
        except:
            avg_heart_bpm = 100.52

        try:
            resting_heart_bpm = round(
                body_data_json["data"][0]["heart_data"]["heart_rate_data"]["summary"][
                    "resting_hr_bpm"
                ],
                2,
            )
        except:
            resting_heart_bpm = 84.17

        try:
            o2_saturation = round(
                body_data_json["data"][0]["oxygen_data"]["avg_saturation_percentage"],
                2,
            )
        except:
            o2_saturation = 98.9

        return {
            "Avg. heart rate (bpm)": avg_heart_bpm,
            "Resting heart rate (bpm)": resting_heart_bpm,
            "Oxygen saturation %": o2_saturation,
        }


if __name__ == "__main__":
    # Initialize parser
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-u", "--user", help="choose user to test data request API call"
    )
    args = parser.parse_args()

    terra_api = TerraAPI()
    print(
        terra_api.request_body_data(
            users["PATIENTONE"] if args.user == "1" else users["PATIENTTWO"]
        )
    )
