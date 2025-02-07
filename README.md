# Final Backend Project

This project is the final result of the Backend course, developed to demonstrate the skills acquired in Node.js and Express. The main objective is to create a RESTful API that manages a fashion system, allowing CRUD operations on products and users, as well as user authentication and authorization.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Execution](#execution)
- [Main Endpoints](#main-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Product Management**: Create, read, update, and delete products.
- **User Management**: Register, log in, and update user profiles.
- **Authentication and Authorization**: Implementation of JWT for secure user authentication.
- **Error Handling**: Centralized error management for consistent responses.
- **API Documentation**: Detailed endpoint documentation using Swagger.

## Technologies Used

- [Node.js](https://nodejs.org/): JavaScript runtime for server-side applications.
- [Express](https://expressjs.com/): Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/): NoSQL database for data storage.
- [Mongoose](https://mongoosejs.com/): ODM for MongoDB and Node.js.
- [JSON Web Tokens (JWT)](https://jwt.io/): Standard for secure user authentication.
- [Swagger](https://swagger.io/): API documentation tool.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Tutesuarez/Proyecto_Final_Backend.git
   cd Proyecto_Final_Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables**:

   Create a `.env` file in the project root and define the following variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_jwt_secret
   ```

   Make sure to replace `your_database_name` and `your_jwt_secret` with your actual values.

## Execution

To start the server in development mode:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

## Main Endpoints

Here are some of the main API endpoints:

- **Products**:
  - `GET /api/products`: Get all products.
  - `GET /api/products/:id`: Get a product by ID.
  - `POST /api/products`: Create a new product.
  - `PUT /api/products/:id`: Update an existing product.
  - `DELETE /api/products/:id`: Delete a product.

- **Users**:
  - `POST /api/users/register`: Register a new user.
  - `POST /api/users/login`: Log in a user.
  - `GET /api/users/profile`: Get the authenticated user's profile.

For complete API documentation, visit `http://localhost:3000/api-docs` once the server is running.

## Testing

Tests can be executed using [Jest](https://jestjs.io/). To run tests:

```bash
npm test
```

## Deployment

The project is set up for deployment on [Render](https://render.com/). You can access the deployed version at: [https://fashion-backend-a1oz.onrender.com/](https://fashion-backend-a1oz.onrender.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a Pull Request
