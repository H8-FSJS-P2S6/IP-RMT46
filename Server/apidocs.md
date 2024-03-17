# Burger Bites API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `POST /register`
- `POST /login`
- `GET /burgers`
- `POST /burgers`
- `GET /burgers/:burgerId`
- `PUT /burgers/:burgerId`
- `DELETE /burgers/:burgerId`
- `PATCH /burgers/:burgerId/image`
- `GET /users`
- `PATCH /users/profile`
- `GET /cart`
- `POST /cart/:burgerId`
- `DELETE /cart/:burgerId`
- `PATCH /cart/purchase`
- `POST /cart/generateMidTransToken`
- `POST /google-login`

### 1. GET /

#### Description:

Show Welcome to the Burger Bites API

#### Request:

*Response (200 - OK)*
```json
{
  "message": "Welcome to the Burger Bites API"
}
```

### 2. POST /register

#### Description:

Register

#### Request:

*Response (200 - OK)*
```json
{
    "name": "string",
    "email": "string",
    "role": "string"
}
```
*Response (400 - Bad Request)*
```json
{
    "message": "Name is required"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Role is required"
}

```
### 3. POST /login

#### Description:

Login

#### Request:

- body:
```json
{
    "email": "string",
    "password": "string",
}
```
*Response (200 - OK)*
```json
{
  "access_token": "string"
}
```
*Response (400 - Bad Request)*
```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```
*Response (401 - Unauthorized)*
```json
{
    "message": "Invalid email or password"
}
```

### 4. GET /burgers

#### Description:

Get all burgers from database

#### Request:

*Response (200 - OK)*
```json
[
    {
        "id": "integer",
        "name": "string",
        "desc": "string",
        "price": "integer",
        "veg": "boolean",
        "images": "string",
        "createdAt": "string",
        "updatedAt": "string",
    },
    {
        "id": "integer",
        "name": "string",
        "desc": "string",
        "price": "integer",
        "veg": "boolean",
        "images": "string",
        "createdAt": "string",
        "updatedAt": "string",
    },
    ...,
]
```
### 5. POST /burgers

#### Description:

Add burger to the database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
- body:
```json
{
    "name": "string",
    "desc": "string",
    "price": "integer",
    "veg": "boolean",
    "images": "string"
  }
```
*Response (201 - Created)*
```json
    {
        "message": "string",
        "burgerData": {
            "id": "integer",
            "name": "string",
            "desc": "string",
            "price": "integer",
            "veg": "boolean",
            "images": "string",
            "createdAt": "string",
            "updatedAt": "string",
        }
    }
```
*Response (400 - Bad Request)*
```json
{
    "message": "Name is required"
}
OR
{
    "message": "Description is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Veg status is required"
}
OR
{
    "message": "Image file is required"
}
```
### 6. GET /burgers/:burgerId

#### Description:

Get burger based on the burger id from database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
- params:
```json
{
  "id": "integer (required)"
}
```
*Response (200 - OK)*
```json
    {
        "id": "integer",
        "name": "string",
        "desc": "string",
        "price": "integer",
        "veg": "boolean",
        "images": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
```
*Response (404 - Not Found)*
```json
{
    "message": "Burger not found"
}
```
### 7. PUT /burgers/:burgerId

#### Description:

Update burger based on the burger id from database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
- params:
```json
{
  "id": "integer (required)"
}
```
*Response (200 - OK)*
```json
    {
    "message": "Burger has been updated"
    }
```
*Response (404 - Not Found)*
```json
{
    "message": "Data not found"
}
```
*Response (400 - Bad Request)*
```json
{
    "message": "Name is required"
}
OR
{
    "message": "Description is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Veg status is required"
}
OR
{
    "message": "Image file is required"
}
```
*Response (403 - Forbidden)*
```json
{
    "message": "Forbidden"
}
```
### 8. DELETE /burgers/:burgerId

#### Description:

Delete burger based on the burger id from database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
- params:
```json
{
  "id": "integer (required)"
}
```
*Response (200 - OK)*
```json
    {
    "message": "Burger has been deleted"
    }
```
*Response (404 - Not Found)*
```json
{
    "message": "Data not found"
}
```
*Response (403 - Forbidden)*
```json
{
    "message": "Forbidden"
}
```
### 9. PATCH /burgers/:burgerId/image

#### Description:

Update the burger image based on the job id from database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
- params:
```json
{
  "id": "integer (required)"
}
```
*Response (200 - OK)*
```json
{
    "message": "Image successfully updated"
}
```
*Response (404 - Not Found)*
```json
{
    "message": "Burger not found"
}
```
### 10. GET /users

#### Description:

Get logged in user from database

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
*Response (200 - OK)*
```json

    {
        "name": "string",
        "email": "string",
        "role": "string",
        "imageUrl": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }

```
### 11. PATCH /users/profile

#### Description:

Update user profile image

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```
*Response (200 - OK)*
```json
{
    "message": "Image successfully updated"
}
```
*Response (404 - Not Found)*
```json
{
    "message": "Data not found"
}
```

### 12. GET /cart

#### Description:

Get all items in the cart for the logged in user

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```

*Response (200 - OK)*
```json
    [
    {
        "id": "integer",
        "quantity": "integer",
        "UserId": "integer",
        "BurgerId": "integer",
        "purchased": "boolean",
        "purchasedAt": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    {
        "id": "integer",
        "quantity": "integer",
        "UserId": "integer",
        "BurgerId": "integer",
        "purchased": "boolean",
        "purchasedAt": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    ...,
]
```

### 13. POST /cart/:burgerId

#### Description:

Add burger to the cart

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```

- body:
```json
{
    "quantity": "integer",
}
```
*Response (201 - Created)*
```json
{
    "message": "Burger successfully added to cart",
    "burgerData": {
        "id": "integer",
        "name": "string",
        "desc": "string",
        "price": "integer",
        "veg": "boolean",
        "images": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}

```
*Response (400 - Bad Request)*
```json
{
    "message": "Quantity is required"
}
```
*Response (404 - Not Found)*
```json
{
    "message": "Data not found"
}
```

### 14. DELETE /cart/:burgerId

#### Description:

Delete items from cart

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```

*Response (200 - OK)*
```json
{
    "message": "Burger successfully removed from cart"
}
```

*Response (404 - Not Found)*
```json
{
    "message": "Data not found"
}
```

### 15. PATCH /cart/purchase

#### Description:

Update purchased status and purchasedAt date in cart after successful payment

#### Request:

- headers:
```json
{
  "Authorization": "Bearer <your token>"
}
```

*Response (200 - OK)*
```json
    {
    "message": "Burger has been purchased"
}
```

### 16. POST /cart/generateMidTransToken

#### Description:

Create midtrans token

#### Request:

*Response (201 - Created)*
```json
{
    "token": "string"
}
```

### 17. POST /cart/google-login

#### Description:

Create google login token

#### Request:

*Response (201 - Created)*
```json
{
    "token": "string"
}
```

### Global Error

#### Description:

Global errors when accessing the endpoints

#### Request:

*Response (401 - Unauthorized)*
```json
{
    "message": "Invalid token"
}
```
*Response (500 - Internal Server Error)*
```json
{
  "message": "Internal server error"
}
```