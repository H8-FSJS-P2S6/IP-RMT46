

# Go Or No Weather API Documentation

## Public

### Endpoints:

List of available endpoints:

- `GET /artikel`
- `GET /artikel/:id`
- `GET /categories`
- `GET /categories/:id`
- `GET /weathers/location-detail/:city`
- `GET /weathers/current/:city`
- `GET /uv/current/:city`

### 1. GET /artikel

Description:

- List of all artikel
- It can be filtered by category ID

Request:

- Params

```json
{
  "category": "integer",
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 7,
        "title": "Hujan Badai di Bogor",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "UserId": 1,
        "imgUrl": "http://image.url/badai.png",
        "CategoryId": 3,
        "createdAt": "2024-03-16T14:41:52.409Z",
        "updatedAt": "2024-03-16T15:11:02.878Z"
    }
]
```

### 2. GET/artikel/:id

Description:

- Get Specific Artikel by id

_Response (200 - OK)_

```json
{
    "id": 7,
    "title": "Hujan Badai di Bogor",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "UserId": 1,
    "imgUrl": "http://image.url/badai.png",
    "CategoryId": 3,
    "createdAt": "2024-03-16T14:41:52.409Z",
    "updatedAt": "2024-03-16T15:11:02.878Z"
}
```

### 3. GET /categories

Description:

- List of all categories

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Sunny",
        "createdAt": "2024-03-14T17:56:51.644Z",
        "updatedAt": "2024-03-14T17:56:51.644Z"
    }
]
```

### 4. GET /categories/:id

Description:

- Get specific categories

Request:

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Sunny",
    "createdAt": "2024-03-14T17:56:51.644Z",
    "updatedAt": "2024-03-14T17:56:51.644Z"
}
```

### 5. GET /weathers/location-detail/:city

Description:

- Get detail of location based on city

Request:

- Params

```json
{
  "city": "string",
}
```

_Response (200 - OK)_

```json
{
    "id": 1648473,
    "name": "Bogor",
    "latitude": -6.59444,
    "longitude": 106.78917,
    "elevation": 245,
    "feature_code": "PPL",
    "country_code": "ID",
    "admin1_id": 1642672,
    "timezone": "Asia/Jakarta",
    "population": 800000,
    "country_id": 1643084,
    "country": "Indonesia",
    "admin1": "West Java"
}
```

### 6. GET /weathers/current/:city

Description:

- Get current weather based on city

Request:

- Params

```json
{
  "city": "string",
}
```

_Response (200 - OK)_

```json
{
    "latitude": -6.5,
    "longitude": 106.625,
    "generationtime_ms": 0.07295608520507812,
    "utc_offset_seconds": 25200,
    "timezone": "Asia/Jakarta",
    "timezone_abbreviation": "WIB",
    "elevation": 247,
    "current_units": {
        "time": "iso8601",
        "interval": "seconds",
        "temperature_2m": "°C",
        "relative_humidity_2m": "%",
        "apparent_temperature": "°C",
        "is_day": "",
        "precipitation": "mm",
        "rain": "mm",
        "cloud_cover": "%",
        "wind_speed_10m": "km/h",
        "wind_direction_10m": "°"
    },
    "current": {
        "time": "2024-03-17T21:00",
        "interval": 900,
        "temperature_2m": 23.5,
        "relative_humidity_2m": 91,
        "apparent_temperature": 27.8,
        "is_day": 0,
        "precipitation": 0,
        "rain": 0,
        "cloud_cover": 11,
        "wind_speed_10m": 4.3,
        "wind_direction_10m": 265
    }
}
```

### 7. GET /uv/current/:city

Description:

- Get current uv based on city

Request:

- Params

```json
{
  "city": "string",
}
```

_Response (200 - OK)_

```json
{
    "uv": 2.3884,
    "uv_time": "2024-03-17T09:03:39.638Z",
    "uv_max": 14.8142,
    "uv_max_time": "2024-03-17T05:02:32.302Z",
    "ozone": 257.1,
    "ozone_time": "2023-04-12T15:04:31.773Z",
    "safe_exposure_time": {
        "st1": 70,
        "st2": 84,
        "st3": 112,
        "st4": 140,
        "st5": 223,
        "st6": 419
    },
    "sun_info": {
        "sun_times": {
            "solarNoon": "2024-03-17T05:02:32.302Z",
            "nadir": "2024-03-16T17:02:32.302Z",
            "sunrise": "2024-03-16T22:58:34.436Z",
            "sunset": "2024-03-17T11:06:30.169Z",
            "sunriseEnd": "2024-03-16T23:00:43.245Z",
            "sunsetStart": "2024-03-17T11:04:21.360Z",
            "dawn": "2024-03-16T22:37:45.536Z",
            "dusk": "2024-03-17T11:27:19.069Z",
            "nauticalDawn": "2024-03-16T22:13:34.682Z",
            "nauticalDusk": "2024-03-17T11:51:29.923Z",
            "nightEnd": "2024-03-16T21:49:22.898Z",
            "night": "2024-03-17T12:15:41.707Z",
            "goldenHourEnd": "2024-03-16T23:26:05.544Z",
            "goldenHour": "2024-03-17T10:38:59.061Z"
        },
        "sun_position": {
            "azimuth": 1.6107765294375702,
            "altitude": 0.5136730864729974
        }
    }
}
```

&nbsp;

## Authentication

### Endpoints:

List of available endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/login/google`
- `GET /auth/userinfo`
- `GET /auth/user/:id`

### 1. POST /auth/register

Description:

- Register a user with basic authentication, it require email and password in request body

Request:


- body:

```json
{
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": 4,
    "email": "test123@gmail.com",
    "phoneNumber": "08123432123",
    "address": "Jalan Bangka no 55",
    "sso": false
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Email already exists!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "invalid email format"
}
OR
{
  "message": "password must be at least 6 characters"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

### 2. POST /auth/login

Description:

- Login to get access_token

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Credential login is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

### 3. POST /auth/login/google

Description:

- Login with google

Request:

- body:

```json
{
  "googleToken": "string",
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

### 4. GET /auth/userinfo

Description:

- Get userinfo, this require access_token

Request:

- headers
```json
{
  "Authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
    "id": 4,
    "email": "test123@gmail.com",
    "phoneNumber": "08123432123",
    "address": "Jalan Bangka no 55",
    "sso": false
}
```

### 5. GET /auth/user/:id

Description:

- Get user info based on id

Request:

- params
```json
{
  "id": "integer"
}
```

- headers
```json
{
  "Authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
    "id": 4,
    "email": "test123@gmail.com",
    "phoneNumber": "08123432123",
    "address": "Jalan Bangka no 55",
    "sso": false
}
```

&nbsp;

## Category

### Endpoints:

List of available endpoints:

- `POST /categories`
- `PUT /categories/:id"`
- `DELETE /categories/:id"`

### 1. POST /categories

Description:

- Create a categoty, this endpoint need authententication

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 7,
  "name": "Rain",
  "updatedAt": "2024-03-02T05:00:19.877Z",
  "createdAt": "2024-03-02T05:00:19.877Z"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Category already exists!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

### 2. PUT /categories/:id

Description:

- Update a Category

Request:

- params:
```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 7,
  "name": "Rain",
  "updatedAt": "2024-03-02T05:00:19.877Z",
  "createdAt": "2024-03-02T05:00:19.877Z"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Category already exists!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

### 3. DELETE /categories/:id

Description:

- Delete a category

Request:

- params:
```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category id 6 has been deleted!"
}
```

&nbsp;

## Artikel

### Endpoints:

List of available endpoints:

- `POST /artikel`
- `PUT /artikel/:id"`
- `DELETE /artikel/:id"`

### 1. POST /artikel

Description:

- Create a artikel, this endpoint need authententication

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "description": "string",
  "imgUrl": "string",
  "CategoryId": "integer",
  "UserId": "integer",
}
```

_Response (200 - OK)_

```json
{
    "id": 7,
    "title": "Hujan Badai di Bogor",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "UserId": 1,
    "imgUrl": "http://image.url/badai.png",
    "CategoryId": 3,
    "createdAt": "2024-03-16T14:41:52.409Z",
    "updatedAt": "2024-03-16T15:11:02.878Z"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Artikel already exists!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title/description/UserId/imgUrl/CategoryId cannot be empty!"
}
```

### 2. PUT /artikel/:id

Description:

- Update a Artikel

Request:

- params:
```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "description": "string",
  "imgUrl": "string",
  "CategoryId": "integer",
  "UserId": "integer",
}
```

_Response (200 - OK)_

```json
{
    "id": 7,
    "title": "Hujan Badai di Bogor",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "UserId": 1,
    "imgUrl": "http://image.url/badai.png",
    "CategoryId": 3,
    "createdAt": "2024-03-16T14:41:52.409Z",
    "updatedAt": "2024-03-16T15:11:02.878Z"
}
```

### 3. DELETE /artikel/:id

Description:

- Delete a artikel

Request:

- params:
```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Artikel id 6 has been deleted!"
}
```

&nbsp;

### Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
