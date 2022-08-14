# Authentication System

A Simple Authentication System node-express REST API Application, implementing role based authorization and restriction.

## Developed With

- NodeJs
- ExpressJs
- MongoDb
- Mongoose

## Routes

| Routes                                    | Description                  | Auth roles                  |
| ----------------------------------------- | ---------------------------- | --------------------- ------|
| [POST] /api/v1/auth/register              | Create a new user            | none                        |
| [POST] /api/v1/auth/login                 | Login a user                 | none                        |
| [POST] /api/v1/auth/forgotPassword        | Sends a password reset email | none                        |
| [POST] /api/v1/auth/resetPassword/:token  | Reset password form handler  | none                        |
| [GET] /api/v1/users/                      | Get all users                | admin, manager              |
| [GET] /api/v1/users/:id                   | Get a user by Id             | admin, manager, staff       |
| [PUT] /api/v1/users/:id                   | Update a user's account      | admin, manager              |
| [DELETE] /api/v1/users/:id                | Delete a user's account      | admin                       |
