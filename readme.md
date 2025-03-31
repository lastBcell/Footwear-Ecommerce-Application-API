# Footwear Ecommerce Application API

## Overview
This API provides endpoints for managing a footwear ecommerce application. It allows users to perform operations such as viewing products, managing orders, and handling user authentication.

## Features
- **Product Management**: View, add, update, and delete products.
- **Order Management**: Create, view, update, and cancel orders.
- **User Authentication**: Register, login, and manage user accounts.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/footwear-ecommerce-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd footwear-ecommerce-api
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. Access the API at `http://localhost:3000`.

## Endpoints
- **Products**
  - `GET /products` - Retrieve all products
  - `POST /products` - Add a new product
  - `PUT /products/:id` - Update a product
  - `DELETE /products/:id` - Delete a product

- **Orders**
  - `GET /orders` - Retrieve all orders
  - `POST /orders` - Create a new order
  - `PUT /orders/:id` - Update an order
  - `DELETE /orders/:id` - Cancel an order

- **Users**
  - `POST /register` - Register a new user
  - `POST /login` - User login

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
