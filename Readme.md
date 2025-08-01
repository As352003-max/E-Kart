# E-Kart

E-Kart is a full-stack e-commerce web application that enables users to browse products, manage their shopping cart, place orders, and for admins to manage inventory. Built with modern technologies, E-Kart provides a seamless online shopping experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (register, login, JWT-based sessions)
- Product listing, search, and filtering
- Shopping cart management
- Secure checkout and order placement
- Order history and management
- Admin dashboard for product and order management

## Tech Stack

### Frontend

- **React.js**: UI development
- **Redux**: State management
- **React Router**: Routing
- **Axios**: API requests
- **Bootstrap / Material-UI**: Styling

### Backend

- **Node.js**: Server runtime
- **Express.js**: REST API framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication

### Other Tools

- **Git**: Version control
- **Postman**: API testing

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/E-Kart-main.git
    cd E-Kart-main
    ```

2. **Install dependencies**
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**

    - Copy `.env.example` to `.env` in the backend folder and fill in your configuration.

4. **Start the backend server**
    ```bash
    cd backend
    npm start
    ```

5. **Start the frontend**
    ```bash
    cd ../frontend
    npm start
    ```

6. **Access the app**

    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:5000`

## Folder Structure

```
E-Kart-main/
  ├── backend/
  │   ├── models/
  │   ├── routes/
  │   ├── controllers/
  │   └── server.js
  └── frontend/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── App.js
        └── package.json
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
