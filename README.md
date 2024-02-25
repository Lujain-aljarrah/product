# E-commerce-app 

This repository contains an Express.js application for managing products, ingredients, and orders, along with Swagger documentation for the API endpoints. The application is containerized using Docker.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Set up environment variables:

    Setup  the `.env` file in the root directory and define the following variables:

    ```env
    SERVICE=<your-email-service>
    USER=<your-email-user>
    PASS=<your-email-password>
    RECEIVER=<email-receiver>
    ```

    Replace placeholders with appropriate values:
    - `<your-email-service>`: Your email service provider (e.g., Gmail, Yahoo).
    - `<your-email-user>`: Your email address.
    - `<your-email-password>`: Your email account password.
    - `<email-receiver>`: Email address to receive notifications.

3. Run the using docker
 ```bash
docker-compose up --build
```


## API Documentation

Swagger documentation is available for the API endpoints. You can access it at `/api-docs` endpoint when the server is running.

## Email Notifications

The application includes functionality to send email notifications for low stock of an ingredient. Ensure that the email service details are provided in the `.env` file for this feature to work correctly.

## Endpoints

### Products

- `GET /products`: Retrieve all products.
- `POST /products`: Create a new product.
- `GET /products/:id`: Retrieve a specific product by ID.
- `PUT /products/:id`: Update a specific product by ID.
- `DELETE /products/:id`: Delete a specific product by ID.

### Ingredients

- `GET /ingredients`: Retrieve all ingredients.
- `POST /ingredients`: Create a new ingredient.
- `GET /ingredients/:id`: Retrieve a specific ingredient by ID.
- `PUT /ingredients/:id`: Update a specific ingredient by ID.
- `DELETE /ingredients/:id`: Delete a specific ingredient by ID.

### Orders

- `GET /order`: Retrieve all orders.
- `POST /order`: Create a new order.

## Testing

The repository includes a test folder for unit and integration tests. However, it is currently incomplete. You can complete it in the future to ensure the correctness of the application.
