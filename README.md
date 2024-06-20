![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

# Assignment: REST API

Develop a RESTful API that provides weather forecasts based on
user queries, including location, date, and time. Utilize HTTP methods like GET to retrieve
forecasts and POST to submit queries

## Implemented functionality

The client can submit a query to the API with a location, date, and time. The API will process the query (processing is
just simulated for simplicity) and return a response with the query details and the forecasted weather information. The
client can then check the status of the query and retrieve the forecasted weather information once the query is
completed. If no time is specified, the API will return the average weather for the day.  
Currently the client only supports simply registering and logging in to the API as well as displaying some example fixed
data.

## How it works: authentication

Authentication is handled using
the [`rest_framework_simplejwt`](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#usage)
package. Users can register and log in to the API to access its services.  
Here is the basic flow of how the authentication works:

1. ### Register
    - Users can register by sending a POST request to the `/api/auth/register/` endpoint with their email, username, and
      password.
    - The API will return a response with the user's details.
    - The request body should be in the following format:
        ```json
        {
            "username": "username",
            "password1": "password",
            "password2": "password",
            "email": "email"
        }
        ```

2. ### Login

    - Users can log in by sending a POST request to the `/api/auth/token/` endpoint with their username and password.
    - The request body should be in the following format:
         ```json
         {
             "username": "username",
             "password": "password"
         }
         ```
    - The response will include two tokens: `access` and `refresh`. Example:
       ```json
       {
           "refresh": "token1",
           "access": "token2"
       }
       ```
    - The `access` token is used to authenticate requests to protected endpoints. It expires after a short period.
    - The `refresh` token can be used to request a new `access` token when the current one expires.
3. ### Refresh Token
    - To get a new access token, send a POST request to the `/api/auth/token/refresh/` endpoint with the `refresh`
      token. Example:
        ```json
        {
            "refresh": "token1"
        }
    - The response will include a new `access` token. Example:
        ```json
        {
            "access": "token3"
        }
        ```

4. ### Accessing Protected Endpoints
    - To access protected endpoints, include the `access` token in the `Authorization` header of the request. Example:
      ```
        http https://{server}/api/protected-endpoint/ "Authorization Bearer {access_token}"
      ```

## Weather API Endpoints:

| Endpoint             | HTTP Method | CRUD Method | Result                     |
|----------------------|-------------|-------------|----------------------------|
| `/api/locations`     | GET         | READ        | Get all locations          |
| `/api/locations/:id` | GET         | READ        | Get a single location      |
| `/api/queries`       | POST        | CREATE      | Submit a new query         |
| `/api/queries/:id`   | GET         | READ        | Get the details of a query |

## Example Workflow

1. ### User Submits a Query:
   Request:

   ```
   http POST /api/queries Content-Type: application/json Authorization: Bearer {access_token}
   {
       "location": "Jamieton",
       "date": "2024-06-10",
       "time": "14:00"
   }
   ```

   Response:

   ```json
   {
        "id": "123456",
        "status": "processing"
   }
    ```

2. ### User Checks Query Status:

   Request:

   ```
   http GET /api/queries/123456 Authorization: Bearer {access_token}
   ```

   Response:

   ```json
   {
        "id": 602,
        "user": "filippo",
        "submitted_at": "2024-06-18T18:00:23.312437Z",
        "status": "Completed",
        "result": {
            "id": 765,
            "location": {
                "id": 4,
                "name": "Jamieton",
                "latitude": -46.7436955,
                "longitude": -33.963824
            },
            "date": "2024-06-10",
            "time": "14:00",
            "temperature": 13.614285714285714,
            "description": "Partly Cloudy"
    }
   }
   ```

## Data generation

The data has been generated with a maintenance command that can be run with the following command:

```shell
python manage.py generate_test_data
```

The script is located in the `backend/forecasts/management/commands/generate_test_data.py` file. It uses
the `factory_boy` library (which relies on Faker) to generate random data for the locations and the weather forecasts.
Factories are defined in the `backend/forecasts/factories.py` file.