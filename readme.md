# Authentication System

A Simple Authentication System node-express REST API Application, implementing role based authorization and restriction.

## Developed With

- NodeJs
- ExpressJs
- MongoDb
- Mongoose

## Routes

| Routes                                    | Description                  | Auth roles                  |
| ----------------------------------------- | ---------------------------- | --------------------------- |
| [POST] /api/v1/auth/register              | Create a new user            | none                        |
| [POST] /api/v1/auth/login                 | Login a user                 | none                        |
| [POST] /api/v1/auth/forgotPassword        | Sends a password reset email | none                        |
| [POST] /api/v1/auth/resetPassword/:token  | Reset password form handler  | none                        |
| [GET] /api/v1/users/                      | Get all users                | admin, manager              |
| [GET] /api/v1/users/:id                   | Get a user by Id             | admin, manager, staff       |
| [PUT] /api/v1/users/:id                   | Update a user's account      | admin, manager              |
| [DELETE] /api/v1/users/:id                | Delete a user's account      | admin                       |
![Register User](https://user-images.githubusercontent.com/81367700/184553118-9a41bf78-aca1-4773-ad2a-e804f04ced38.png)
![Login User](https://user-images.githubusercontent.com/81367700/184553157-409958be-3970-4f61-8cf0-6c82f5c6ad2c.png)
![forgot password](https://user-images.githubusercontent.com/81367700/184553182-13eb584b-50b2-4540-abca-b441d6d5bbcc.png)
![reset password](https://user-images.githubusercontent.com/81367700/184553409-368bd1d2-7ef5-474f-87db-dbeeb5d4c515.png)
![Unaauthorized User](https://user-images.githubusercontent.com/81367700/184553585-09bf31c9-2261-40df-a02f-4830c8ea1522.png)
![Restricted](https://user-images.githubusercontent.com/81367700/184553595-08f8397f-f654-4d97-9556-700c4f4a379d.png)
