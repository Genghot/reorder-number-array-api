# Reorder Number in Array API

## Description
This is an Express API that allows users to reorder an array of integers based on specified criteria. Users can send a request to sort the numbers either in ascending or descending order.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install the necessary dependencies

## API Documentation

### Base URL
http://localhost:3000

### Endpoints

#### POST /reorder
Reorders an array of integers.

##### Request Body
- `numbers`: Array of integers (required)
- `order`: String that specifies the order (required, must be either 'ascending' or 'descending')

##### Response
- **200 OK**
  - Description: Successfully reordered the numbers
  - Example Response:
    ```json
    {
      "sorted_numbers": [2, 3, 5, 8]
    }
    ```
- **400 Bad Request**
  - Description: Invalid input
  - Example Response:
    ```json
    {
      "error": "Input must be an array of integers and a valid order."
    }
    ```
- **500 Internal Server Error**
  - Description: A generic error message when an unexpected condition was encountered.

## Swagger Documentation

To access the API documentation, navigate to:
http://localhost:3000/swagger

## Running the Application

Run the following command to start the server:
```
node app.js
```

The server will be available on http://localhost:3000. 

## Dependencies

- express: A web framework for Node.js
- body-parser: Middleware to parse incoming request bodies
- swagger-ui-express: Middleware for serving Swagger UI
- swagger-jsdoc: Generates Swagger documentation from JSDoc comments

## Author

Your Name Here