## Database Configuration

    - A mysql database is configured under config/db.js. The user, password, db name, and host are retrieved from .env file.

## Database Operations

    - Sequelize is used to interact with database. Models are constructed for each table. If join operations are necessary, associations of models are made with 'belongsTo' and 'hasMany' keywords.

## Middlewares

- **asyncWrapper**

  - To avoid repeating same try-catch blocks in each controller function, a single middleware function that possess a single try-catch block which handles the error types effectively, is designed.

- **notFound**
  - For the not implemented routes, a middleware that returns status code of 404 and message "route not exist" is designed.

## Error Handling and Validation

- **Bad Requests**

  - Request bodies and request parameters are validated using a validator package 'Joi'. Validation schemas are created under validation folder for the api routes that requires any request body or request params. If the request is not valid, server returns a response with a status code of 400 indicating the custom bad request message constructe in the related validation schema.

- **Not Found Errors**

  - For the requests requiring any of userId or bookId, user or book is checked if exists. If the user with userId or book with bookId not exists, server returns a response with status code of 404 indicating the not found error.

- **Server Errors**

  - If an error is catched in the controller, if it is not a validation error, server returns a response with a status code of 500.

## Queries

- **Create Table Statements**

  - Under 'db.sql', create table queries may be found that shows the table structure of mysql database.
