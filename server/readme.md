# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Cors
- Bcrypt
- jsonwebtoken
- multer
- sequelize
- sequelize-cli
- nodemailer
- dotEnv
- Swagger-ui-express
- swagger-autogen
- mysql2
- cookie-parser

---

## URL

_Server_

```
http://localhost:5000
```

## Run Server

_Server_

```
"npm start" or "node index.js" or "nodemon index.js"

```

---

## ENV FILE

change .env.example to .env

```
APP_PORT=3000
SECRET_KEY=SECRET
SECRET_KEY_FOR_FORGET_PASSWORD=sangatrahasia
SECRET_KEY_VERIFY_EMAIL=sangatsangatrahasia
NODE_ENV=development
MY_EMAIL=email@email.com
EMAIL_PASSWORD=password_key
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unathourize)_

```
"Unathourize"
```

_Response (401 - forbidden)_

```
"Forbidden"
```

---

# RESTful endpoints

## Swagger DOC

http://localhost:3000/doc/

## GLOBAL ROUTE

### POST /api/login

> login

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email":email,
    "password":password
}
```

_Response (200)_

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImhyIiwiaWF0IjoxNzAwMjA0ODcxfQ.3MSK5zuJFsfcTyKd1ZJPfpRt2Wm9GP1vIx25w6XfcdQ",
    "message": "Login success"
}
```

_response(400,bad request)_

```
"invalid email or password"

```

---

### POST /api/register

> register

_Request Header_

```
not needed
```

_Request Body_

```
{
    "fullName":name,
    "email":email,
    "password":password,
    "role":role
}
```

_Response (200)_

```
{
    "data": {
        "id": 3,
        "email": "hr3@user.com",
        "password": "$2b$10$xD1Hw1uCDPBIOgC59WClGOdFJqifcvVrXzafXPkiBPs9./3hFm7Pu",
        "fullName": "test aja",
        "role": "hr",
        "updatedAt": "2023-11-17T07:10:03.159Z",
        "createdAt": "2023-11-17T07:10:03.159Z",
        "isEmailAuth": false
    },
    "message": "success register as: hr"
}
```

_Response (409)_

```
"user with that email already existed"
```

---

### POST /api/forgot-password

> forgot password

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email":email
}
```

_Response (200)_

```
{
 message: "Check your email for forgot password",
}
```

_Response (400, bad request)_

```
 "Your email is not verify, you must send again with fullname"

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### POST /api/set-reset-password/

> set password with new password

_Request Params_

```
not needed
```

_Request Header_

```
bearer token
```

_Request Body_

```
{
    "new_password":"string"
}
```

_Response (200)_

```
{
    message:
          "success reset password",
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### POST /api/verify-email

> Verify email

_Request Header_

```
Bearer Token
```

_Request Body_

```
{email:email}
```

_Response (200)_

```
{ message: "OTP sent to email" }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### PATCH /api/set-verify-email/:token

> set Verify email true

_Request Params_

```
 <Token>
```

_Request Header_

```
Bearer Token
```

_Request Body_

```
{otp:otp}
```

_Response (200)_

```
{ message: "Success Verify" }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

_Response (404, forbidden)_

```
 {message:"OTP invalid"}

```

---

### GET /api/get-profile

> get profile

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 2,
        "fullName": "abang HR",
        "email": "hr123@user.com",
        "role": "hr",
        "password": "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        "isVerify": false,
        "createdAt": "2023-11-17T09:09:51.000Z",
        "updatedAt": "2023-11-17T09:09:51.000Z"
    },
    "message": "success"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### PUT /api/edit-profile

> edit profile

_Request Header_

```
not needed
```

_Request Body_

```
{email:email}
or
{fullName:fullName}
...
```

_Response (200)_

```
{
      data: result,
      message: "success edit profile",
    }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### GET /api/refresh

> edit profile

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
      token: token,
      message: "success",
    }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### DELETE /api/art/delete/:artId

_Request Params_

```

<artId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{ message: "deleted" }

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

### POST /api/art/add-to-favorit/:artId

_Request Params_

```

<artId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{ message: "success" }

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

_Response (409)_

```

{
    "message": "art already in favorite"
}

```

### DELETE api/art/delete-from-favorit/:artId

_Request Params_

```

<artId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{ message: "success" }

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

## ARTIST ROUTE

### POST /api/artist/art/add

> add art

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "title": STRING,
      "description": TEXT,
      "image": FILE IMAGE,
      "categoryId": INTEGER,
      "userId": INTEGER,
}
```

_Response (201)_

```
{
    "data": {
      "title": STRING,
      "description": TEXT,
      "imagePath": STRING,
      "isAcc": BOOLEAN,
      "categoryId": INTEGER,
      "userId": INTEGER,
    },
    "message": "created"
}

```

### POST /api/artist/art/add

> add art

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "name": STRING,
}
```

_Response (201)_

```
{
    "data": {
      "title": STRING,
    },
    "message": "success"
}

```

### PUT /api/artist/art/update/:artId

> Get update art

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "title": STRING,
      "description": TEXT,
      "image": FILE IMAGE,
      "categoryId": INTEGER,
      "userId": INTEGER,
}
```

_Response (200)_

```
{
    "message": "updated"
}

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

## Admin ROUTE

### GET /api/admin/user

> Get all user

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "data": [
        {
            fullName: STRING,
            email: STRING,
            password: STRING,
            role: STRING,
            isVerify: BOOLEAN,
        },{
            fullName: STRING,
            email: STRING,
            password: STRING,
            role: STRING,
            isVerify: BOOLEAN,
        }
    ],
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### PATCH /api/admin/art/acc/:artId

> acc art

_Request Params_

```

/<artId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

_Response (409)_

```

{
    "message": "Art already Acc by admin"
}

```

---

### PATCH /api/admin/art/refuse/:artId

> refuse art

_Request Params_

```

/<artId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

_Response (409)_

```

{
    "message": "Art already not acc by admin"
}

```

---

### DELETE api/admin/category/delete/:categoryId

> delete category

_Request Params_

```

<categoryId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "deleted Category"
}
```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### DELETE api/admin/user/delete/:userId

> delete category

_Request Params_

```

<userId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "deleted Account"
}
```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### PATCH /api/admin/user/change-role/:userId

> refuse art

_Request Params_

```

/<userId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---
