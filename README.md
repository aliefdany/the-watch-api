# Watch Catalog API

Welcome to the **Watch Catalog API** — a RESTful API built with [NestJS](https://nestjs.com/) to manage and explore a luxurious collection of watches. This API provides endpoints for authentication, catalog management, and querying watch data with ease.

---

## Table of Contents

- [Watch Catalog API](#watch-catalog-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
  - [API Documentation](#api-documentation)
    - [Endpoints Overview](#endpoints-overview)
      - [Authentication](#authentication)
      - [Watch Management](#watch-management)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Start the Server](#start-the-server)
  - [Development](#development)
    - [Code Formatting and Linting](#code-formatting-and-linting)
    - [Testing](#testing)
  - [License](#license)

---

## Features

- **Authentication**: Secure login with JWT.
- **Watch Management**:
  - Add new watches to the catalog.
  - Update and retrieve specific watches.
  - Query watches by brand, search terms, and pagination.
- **Scalable Architecture**: Built with NestJS for modular and scalable development.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: `>=20.x`
- **PostgreSQL** or **SQLite**: Recommended database.

### Clone the Repository

```bash
git clone https://github.com/aliefdany/watch-catalog-api.git
cd watch-catalog-api
```

---

## API Documentation

This project is documented using [OpenAPI](https://swagger.io/). You can access the live documentation in your local environment after running the application:

- **Swagger UI**: `http://localhost:3000/api`

### Endpoints Overview

#### Authentication

- **POST** `/v1/auth/login`: Authenticate and retrieve a JWT token.

#### Watch Management

- **GET** `/v1/watches`: Retrieve a list of watches with optional filters.
- **POST** `/v1/watches`: Add a new watch to the catalog.
- **GET** `/v1/watches/{id}`: Retrieve a single watch by ID.
- **PATCH** `/v1/watches/{id}`: Update details of an existing watch.

---

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env` file:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. Apply database migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Seed the database (if applicable):
   ```bash
   npx prisma db seed
   ```

---

## Usage

### Start the Server

- **Development Mode**:

  ```bash
  npm run start:dev
  ```

- **Production Mode**:

  ```bash
  npm run start:prod
  ```

- **Swagger Documentation**:
  Access Swagger UI at `http://localhost:3000/api`.

---

## Development

### Code Formatting and Linting

- Format code:
  ```bash
  npm run format
  ```
- Lint code:
  ```bash
  npm run lint
  ```

### Testing

- Run the unit tests using Jest:

```bash
npm run test
```

- Run the end-to-end tests using Jest:

```bash
npm run test:e2e
```

---

## License

This project is licensed under the **UNLICENSED** license. Feel free to contact the author for more details.

---
