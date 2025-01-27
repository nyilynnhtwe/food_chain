# Restaurant Management API (Learning Project)

This repository is a Node.js Express API built as a learning project to understand how to create a backend system for a restaurant management application. The API includes features like authentication, restaurant management, item management, and order management. It uses Prisma as the ORM and PostgreSQL as the database.

## Features

- **Authentication**: User registration and login with JWT-based authentication.
- **Restaurant Management**: Create, read, update, and delete restaurants.
- **Item Management**: Manage items within restaurants, including creating, reading, updating, and deleting items.
- **Order Management**: Handle customer orders, including creating, assigning, and confirming orders.
- **Role-Based Access Control**: Middleware to ensure only users with specific roles can access certain endpoints.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database management.
- **PostgreSQL**: Relational database.
- **TypeScript**: Superset of JavaScript for type safety.
- **JWT**: JSON Web Tokens for authentication.
- **Nodemailer**: For sending emails.
- **Swagger**: API documentation.

## Project Structure
- backend
  - node_modules
  - prisma
  - src
    - controllers
    - services
    - configs
    - db
    - interfaces
    - middlewares
    - routes
    - utils
    - index.ts
  - .env

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/restaurant-management-api.git
   cd restaurant-management-api/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Copy [.env.example](http://_vscodecontentref_/9) to `.env` and fill in the required values.

4. Run database migrations:

   ```sh
   npx prisma migrate dev
   ```

5. Seed the database:

   ```sh
   npm run seed
   ```

6. Start the development server:
   ```sh
   npm run dev
   ```

### API Documentation

API documentation is available at `http://localhost:8888/api/v1/docs` when the server is running.

## Scripts

- `npm run dev`: Start the development server with nodemon.
- `npm run seed`: Seed the database with initial data.

## Environment Variables

- [ENV](http://_vscodecontentref_/10): Environment (e.g., DEV, PROD).
- [PORT](http://_vscodecontentref_/11): Port number for the server.
- `DATABASE_URL`: PostgreSQL database connection string.
- [JWT_ACCESS_TOKEN_SECRET](http://_vscodecontentref_/12): Secret key for JWT access tokens.
- [JWT_REFRESH_TOKEN_SECRET](http://_vscodecontentref_/13): Secret key for JWT refresh tokens.
- [ADMIN_EMAIL_USER](http://_vscodecontentref_/14): Email user for sending emails.
- [ADMIN_EMAIL_PASS](http://_vscodecontentref_/15): Email password for sending emails.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [202300148@my.apiu.edu](mailto:202300148@my.apiu.edu).

## Obsidian Map

![Obsidian Map](obsidian_map.jpg)
