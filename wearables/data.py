from terra.base_client import Terra
from datetime import datetime


API_KEY = "sTrGY7M0IkL4hn1H7uZPgk7EJTNsOk1d"
DEV_ID = "unos-testing-WLf5LjVVuc"
SECRET = "c0f039bbfb39f6cbff2726ad7c8dfde21cfae2b666a85de7"

def see_providers(terra):
    parsed_api_response = terra.list_providers().get_parsed_response()
    print(parsed_api_response)

def see_users(terra):
    parsed_api_response = terra.list_users().get_parsed_response()
    print(parsed_api_response)

def create_widget_session(terra):
    widget_response = terra.generate_widget_session(
        reference_id="Patient One",
        providers=["FITBIT"],
        auth_success_redirect_url="https://en.wikipedia.org/wiki/Success",
        auth_failure_redirect_url="https://en.wikipedia.org/wiki/Failure",
        language="en"
    ).get_parsed_response()

    print(widget_response)

def get_nutrition_data(terra):
    # Create a user object
    USER_ID = "Patient One"
    terra_user = terra.from_user_id(USER_ID)

    # Get the nutrition data from start date to current time
    nutrition_resp = terra_user.get_(start_date=datetime.strptime('2023-03-29','%Y-%m-%d'), end_date=datetime.now(), to_webhook = False )
    nutrition_resp_json = nutrition_resp.get_json()
    print(nutrition_resp_json)

def get_health

if __name__ == "__main__":
    terra = Terra(API_KEY, DEV_ID, SECRET)
    see_users(terra)
    get_data(terra)

