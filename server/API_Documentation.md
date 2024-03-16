# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `POST /hunt`
- `POST /shop`
- `PUT /top-up`
- `POST /generate-midtrans-token`
- `GET /pokedex`
- `GET /pokedex/:id`
- `PUT /pokedex/:id/`
- `DELETE /pokedex/:id`

&nbsp;

## 1. POST /register

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
  "username": "string",
  "email": "string",
  "password": "string",
  "gender": "string",
  "age": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "username": "test",
  "email": "test@gmail.com",
  "gender": "male",
  "age": 17
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email/username is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
},
...
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "credential": "string",
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
  "message": "email/username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /google-login

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Login from google success"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email/username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 4. POST /hunt

Description:
- Post pokemon into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body: 

```json
[
  {
    "name": "string",
    "type": "string",
    "pokedex": "integer",
    "attack": "integer",
    "hp": "integer",
    "weight": "integer",
    "height": "integer",
    "captureRate": "integer",
    "imagePokedex": "string",
    "imageBattleFront": "string",
    "imageBattleBack": "string",
    "UserId": "integer"
  }
]
```

_Response (201 - Created)_

```json
[
  {
    "name": "squirtle",
    "type": "water",
    "pokedex": 7,
    "attack": 48,
    "hp": 44,
    "weight": 90,
    "height": 5,
    "captureRate": 48,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif",
    "UserId": 1
  }
]
```

&nbsp;

## 5. POST /shop

Description:
- POST pokemon 1 or 10 array of object into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "squirtle",
    "type": "water",
    "pokedex": 7,
    "attack": 48,
    "hp": 44,
    "weight": 90,
    "height": 5,
    "captureRate": 48,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif",
    "UserId": 1
  },
  {
    "name": "pikachu",
    "type": "electric",
    "pokedex": 55,
    "attack": 89,
    "hp": 90,
    "weight": 67,
    "height": 2,
    "captureRate": 176,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/8.gif",
    "UserId": 1
  },
  {
    "name": "piglet",
    "type": "flying",
    "pokedex": 199,
    "attack": 79,
    "hp": 57,
    "weight": 70,
    "height": 2,
    "captureRate": 67,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/77.gif",
    "UserId": 1
  },
  ...,
]
```

&nbsp;

## 6. PUT /top-up

Description:
- PATCH top up coins into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully payment. You add 1000 coins",
}
```

&nbsp;

## 7. PUT /generate-midtrans-token

Description:
- POST new token midtrans

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
    {
        "token": "5cf56e84-3e53-4b66-9555-39fbc9282952",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/5cf56e84-3e53-4b66-9555-39fbc9282952"
    }
}
```

&nbsp;

## 8. GET /pokedex

Description:
- GET my pokemon from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "squirtle",
    "type": "water",
    "pokedex": 7,
    "attack": 48,
    "hp": 44,
    "weight": 90,
    "height": 5,
    "captureRate": 48,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif",
    "UserId": 1
  },
  {
    "name": "pikachu",
    "type": "electric",
    "pokedex": 55,
    "attack": 89,
    "hp": 90,
    "weight": 67,
    "height": 2,
    "captureRate": 176,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/8.gif",
    "UserId": 1
  },
  {
    "name": "piglet",
    "type": "flying",
    "pokedex": 199,
    "attack": 79,
    "hp": 57,
    "weight": 70,
    "height": 2,
    "captureRate": 67,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/77.gif",
    "UserId": 1
  },
  ...,
]
```

&nbsp;

## 9. GET /pokedex/:id

Description:
- GET pokemon by id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "name": "squirtle",
  "type": "water",
  "pokedex": 7,
  "attack": 48,
  "hp": 44,
  "weight": 90,
  "height": 5,
  "captureRate": 48,
  "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif",
  "UserId": 1
}
```

&nbsp;

## 10. PUT /pokedex/:id

Description:
- PUT pokemon by id into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body: 

```json
{
  "name":"string",
  "imagePokedex":"string",
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "MySquirtle",
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png",
  }
]
```

&nbsp;

## 11. DELETE /pokedex/:id

Description:
- Delete pokemon by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "squirtel successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthenticated)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Unauthorized)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
