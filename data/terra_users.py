# Importing the API and instantiating the client using your keys
import requests
from terra.base_client import Terra
from datetime import datetime, timedelta
import time
import json
import argparse

DEV_ID = "unos-testing-WLf5LjVVuc"
API_KEY = "sTrGY7M0IkL4hn1H7uZPgk7EJTNsOk1d"
SECRET = "c0f039bbfb39f6cbff2726ad7c8dfde21cfae2b666a85de7"
PROVIDER = "FITBIT"

# Roselyn --> PATIENTONE
# Kenneth --> PATIENTTWO
users = {
    "PATIENTONE": "ec2033ec-e8b8-495c-b498-fcf6d4fe715f",
    "PATIENTTWO": "870ccf19-370a-411a-85fa-9e2e7c997360",
    "DONORONE": "",
    "DONORTWO": "",
}


def see_providers(terra):
    parsed_api_response = terra.list_providers().get_parsed_response()
    print(parsed_api_response)

def see_users(terra):
    parsed_api_response = terra.list_users().get_parsed_response()
    print(parsed_api_response)

def generate_auth_url(terra, REF_ID):
    auth_resp = terra.generate_authentication_url(
        reference_id=REF_ID,
        resource=PROVIDER,
        auth_success_redirect_url=None,
        auth_failure_redirect_url=None,
    ).get_parsed_response()
    print(auth_resp)

def deauth_user(terra, USER_ID):
    url = "https://api.tryterra.co/v2/auth/deauthenticateUser" + "?user_id=" + USER_ID
    headers = {
        "accept": "application/json",
        "dev-id": DEV_ID,
        "x-api-key": API_KEY
    }

    response = requests.delete(url, headers=headers)
    print(response.text)

# Use this instead of the auth url if you want more provider options
def generate_widget_session(terra, USER_ID):
    widget_response = terra.generate_widget_session(
        reference_id=USER_ID,
        providers=[PROVIDER],
        auth_success_redirect_url=None,
        auth_failure_redirect_url=None,
        language="en"
    ).get_parsed_response()
    print(widget_response)

def request_body_data(terra, USER_ID):
    # Create a user object
    terra_user = terra.from_user_id(USER_ID)

    # Get the body data from the start of the day to current time
    body_data = terra_user.get_body(start_date=datetime.strptime('2024-02-17','%Y-%m-%d'), end_date=datetime.now(), to_webhook = False, with_samples = False)
    body_data_json = body_data.get_json()

    # Isolate useful data
    avg_heart_bpm = body_data_json["data"][0]["heart_data"]["heart_rate_data"]["summary"]["avg_hr_bpm"]
    resting_heart_bpm = body_data_json["data"][0]["heart_data"]["heart_rate_data"]["summary"]["resting_hr_bpm"]
    o2_saturation = body_data_json["data"][0]["oxygen_data"]["avg_saturation_percentage"]
    o2_saturation = o2_saturation if o2_saturation != None else 98.9

    return {
        "Avg. heart rate (bpm)": avg_heart_bpm,
        "Resting heart rate (bpm)": resting_heart_bpm,
        "Oxygen saturation %": o2_saturation
    }


if __name__ == "__main__":
    # Initialize parser
    parser = argparse.ArgumentParser()
    parser.add_argument("-u", "--user", help = "choose user to test data request API call")
    args = parser.parse_args()

    terra = Terra(API_KEY, DEV_ID, SECRET)
    print(request_body_data(terra, users["PATIENTONE"] if args.user == '1' else users["PATIENTTWO"]))

