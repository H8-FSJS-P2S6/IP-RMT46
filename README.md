# IP-RMT46

Link web: https://ip-mf-d750f.web.app
API server: https://project.mf-cyberse.online/

# API DOCS

## Rest API Endpoints

List of available endpoints:

    
    GET /pub
    GET /pub/:id

    POST /register
    POST /login

    GET /contents
    POST /contents
    PUT /contents/:id
    DELETE /contents/:id

    GET /categories
    GET /categories/:id
    POST /categories
    PUT /categories/:id
    DELETE /categories/:id
    
## GET /pub

Get public data.

_Response (200 - OK)_

    {
        data: [
            {
                "id": "string",
                "title": "string",
                "translations": [Array]
            },
            ...,
        ],
        "meta": 
            {
            "current_page": "1",
            "last_page": 35,
            "total_items": 697,
            "per_page": 20
            }
    }
    
## GET /pub/:id
Get specific public data by Id.

- Request Params:

    ```
    {
        id: integer
    }
    ```

_Response (200-OK)_

    
    {
        "id": "integer",
        "title": "string",
        "hadeeth": "text",
        "attribution": "string",
        "grade": "string",
        "explanation": "text",
        "hints": [Array],
        "categories": [Array],
        "translations": [Array]
    }

## POST /register
Register a new user

- Request Body
  
    ```
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

    _Response (200 - OK)_ 
    ```
    {
        "username": "string",
        "email" : "string"
    }

## POST /login
Log in an existing user

- Request Body
  
    ```
    {
      "email": "string",
      "password": "string"
    }
    ```

    _Response (200 - OK)_
    ```
    {
      "accessToken": "<access_token>"
    }
    ```

## GET /contents
Get all contents

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

    [
      {
        "id": "integer",
        "title": "string",
        "description": "text",
        "UserId": "integer",
        "CategoryId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "Category": {
            "id": "integer",
            "name": "String",
            "createdAt": "date",
            "updatedAt": "date"
        }
      }
    ]

## GET /contents/:id
Get content by id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
        "id" : "integer"
    }

_Response (200 - OK)_

    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }

## POST /contents
Create a new content

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Body_
    
    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }

_Response (200 - OK)_

    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }


## PUT /contents/:id
Update content by Id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
      "id": "integer"
    }

_Request Body_
    
    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }

_Response (200 - OK)_

    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }


## DELETE /contents/:id
Delete content by Id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
      "id": "integer"
    }

_Request Body_
    
    {
        "title" : "string",
        "description" : "text",
        "CategoryId" : "integer:
    }

_Response (200 - OK)_

    {
        message: `Deleted content <content.title>`
    }

## GET /categories
Get all categories

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

    [
      {
        "name": "string"
      },
      ...,
    ]

## GET /categories/:id
Get specific category by Id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
        "id" : "integer"
    }

_Response (200 - OK)_

    {
        "name" : "string"
    }

## POST /categories
Create a new category (only admin)

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Body_

    {
      "name": "string"
    }

_Response (200 - OK)_

    {
      "name": "string"
    }

## PUT /categories/:id
Update category by Id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
      "id": "integer"
    }

_Request Body_
    
    {
      "name": "string"
    }

_Response (200 - OK)_

    {
      "name": "string"
    }


## DELETE /categories/:id
Delete category by Id

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Request Params_

    {
      "id": "integer"
    }

_Request Body_
    
    {
      "name": "string"
    }

_Response (200 - OK)_

    {
      "name": "string"
    }
