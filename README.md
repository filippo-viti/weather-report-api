# Assignment: REST API

Develop a RESTful API that provides weather forecasts based on
user queries, including location, date, and time. Utilize HTTP methods like GET to retrieve
forecasts and POST to submit queries

## Authentication

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
   http POST /api/queries Content-Type: application/json
   {
       "location": "New York, NY",
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
   http GET /api/queries/123456
   ```

   Response:

   ```json
   {
        "id": 602,
        "user": "filo",
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
            "date": "2024-06-03",
            "time": null,
            "temperature": 13.614285714285714,
            "description": "Partly Cloudy"
    }
   }
   ```