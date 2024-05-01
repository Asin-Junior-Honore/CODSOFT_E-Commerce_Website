# Codsoft E-Commerce Website 🌐

Welcome to the Codsoft E-Commerce website project! This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application with integrated payment processing and user authentication. In this documentation, I'll explain the architecture, setup, and features of the project.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Installation and Setup](#installation-and-setup)
5. [Backend Overview](#backend-overview)
6. [Frontend Overview](#frontend-overview)
7. [Payment Integration](#payment-integration)
8. [Authentication and Authorization](#authentication-and-authorization)
9. [Contributing](#contributing)
10. [Contact Information](#contact-information)

---

## Project Overview 📋

This project is an e-commerce platform designed for an internship task at Codsoft. The goal was to create a comprehensive shopping experience with user registration, authentication, product management, and payment integration. Users can browse products, add them to a shopping cart, and complete purchases using Paystack as the payment gateway.

## Technology Stack 🛠️

- **Backend**: Node.js with Express.js
- **Frontend**: React with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Paystack

## Features 🎯

- **User Authentication**: Secure login and signup using JWT.
- **Product Management**: Admin users can add, edit, and delete products.
- **Shopping Cart**: Users can add products to their cart, adjust quantities, and remove items.
- **Payment Integration**: Users can complete purchases with Paystack.
- **Responsive Design**: The frontend is designed to be responsive and work on various devices.
- **Error Handling**: Robust error handling with clear messages for users and developers.

## Installation and Setup ⚙️

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   https://github.com/Asin-Junior-Honore/CODSOFT_E-Commerce_Website.git
   ```

2. **Backend Setup**:

   - Navigate to the server folder:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following environment variables:
     - `PORT`: The port number for the backend server.
     - `MONGODB_URI`: The MongoDB connection string.
     - `JWT_SECRET`: Secret key for JWT.
     - `PAYSTACK_SECRET_KEY`: Your Paystack secret key.
   - Start the backend server:
     ```bash
     npm run devStart
     ```

3. **Frontend Setup**:

   - Navigate to the frontend folder:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm rundev
     ```

4. **Access the Application**:
   - The backend should be running on `http://localhost:<PORT>` (where `<PORT>` is the port number you defined in the `.env` file).
   - The frontend should be running on `http://localhost:3000`.

## Backend Overview 🖥️

The backend is built with Express.js and uses MongoDB for data storage. It has the following features:

- **Routes**:
  - `/auth`: Routes for user authentication (signup, login, logout).
  - `/products`: Routes for product management.
  - `/cart`: Routes for managing the shopping cart.
  - `/orders`: Routes for handling orders and payments and more.
- **Middleware**:
  - `authMiddleware`: Ensures requests are authenticated with a valid JWT.
- **Error Handling**: Centralized error handling to ensure clear error messages.

## Frontend Overview 🖥️

The frontend is built with React and TypeScript. It has the following features:

- **Components**:
  - `Navbar`: Navigation bar with links to different sections of the application.
  - `ProductList`: Displays a list of products.
  - `Hompage`: Displays details of products (but note the products shuffles on every refresh).
  - `Cart`: Shows the user's shopping cart.
  - `Checkout`: Allows users to complete their purchase.
- **Routes**:
  - `/`: Home page with a list of products.
  - `/login`: User login page.
  - `/signup`: User signup page.
  - `/cart`: User's shopping cart.
  - `/checkout`: Checkout page and more.
- **State Management**: Managed using React's built-in state management.

## Payment Integration 💳

The payment gateway used in this project is Paystack. The integration is done in the backend, and the following features are implemented:

- **Initiate Payment**: When a user checks out, a payment request is sent to Paystack.
- **Confirm Payment**: After payment is completed, the backend confirms the payment with Paystack.
- **Secure Transactions**: Sensitive information is not stored in the backend, ensuring secure transactions.

## Authentication and Authorization 🔐

Authentication is done using JWT. The following features are implemented:

- **Signup**: Users can create an account with a username and password.
- **Login**: Users can log in with their credentials and receive a JWT.
- **Protected Routes**: Certain routes require a valid JWT for access.
- **Logout**: Users can log out, invalidating their JWT.

## Contributing 🤝

Contributions are welcome! To contribute to this project, follow these steps:

1. **Fork the Repository**: Create your own fork of the project.
2. **Create a Branch**: Work on your changes in a new branch.
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Commit Your Changes**: Describe your changes in commit messages.
4. **Submit a Pull Request**: Once your changes are complete, submit a pull request for review.

## Contact Information 📧

For questions or further information about this project, please contact:

- **Email**: asinhonore823@gmail.com
- **Website**: (https://asinhonore-mern-e-commerce-app-remote.netlify.app)

Thank you for your interest in my Codsoft E-Commerce internship project solution! I hope you enjoy exploring and contributing to it. If you have any questions or feedback, don't hesitate to reach out. Happy coding! 🌟
