# Express-User-Auth

A containerized REST API for user authentication using Node.js, Express.js, PostgreSQL, and Docker.

## Features

- User registration
- User login
- User logout

## Tech Stack

![Node.js v20.18.2](https://img.shields.io/badge/Node%20js-v20.18.2-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js v4.21.2](https://img.shields.io/badge/Express%20js-v4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL v17.0](https://img.shields.io/badge/PostgreSQL-v17.0-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker v27.2.0](https://img.shields.io/badge/Docker-v27.2.0-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

### Running with Docker

To set up and run the app using Docker and Docker Compose, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Bibbeep/Express-User-Auth.git
    cd Express-User-Auth
    ```

2. **Create a `.env` file:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    -- To be determined --
    ```

3. **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```

4. **Access the API:**
    You can now access the API at http://localhost:3000 . Open your browser or API client and navigate to the endpoints.


### API Endpoints

- `POST /api/v1/auth/register` - Registers a new user account
- `POST /api/v1/auth/login` - Logs in a user account
- `POST /api/v1/auth/logout` - Logs out a user account
- `GET /api/v1/health` - Retrieves endpoints health check status

### Request/Response Examples

- `POST /api/v1/auth/register` - Registers a new user account

  - Request:
  
  ```bash
  curl -X POST http://localhost:3000/api/v1/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "username": "dummyuser123",
      "email": "test@mail.com",
      "password": "weakpassword321"
    }'
  ```

  - Response (201):
  
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Successfully registered a new user account.",
    "data": {
      "user": {
        "id": 1
      }
    },
    "errors": null
  }
  ```

- `POST /api/v1/auth/login` - Logs in a user account

  - Request:
  ```bash
  curl -X POST http://localhost:3000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@mail.com",
      "password": "weakpassword321"
    }'
  ```

  - Response (200):
  
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully logged in.",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o"
    },
    "errors": null
  }
  ```

- `POST /api/v1/auth/logout` - Logs out a user account

  - Request:
  
  ```bash
  curl -X POST http://localhost:3000/api/v1/auth/logout \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

  - Response (200):
  
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully logged out.",
    "data": null,
    "errors": null
  }
  ```

- `GET /api/v1/health` - Retrieves endpoints health check status

  - Request:
  
  ```bash
  curl -X GET http://localhost:3000/api/v1/health \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

  - Response (200):
  
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully retrieved endpoints health check status.",
    "data": {
      "application": {
        "environment": "development",
        "uptime": "8 hours 27 minutes 6 seconds",
        "memoryUsage": {
          "heapTotal": "149.70 MB",
          "heapUsed": "145.57 MB"
        }
      },
      "database": {
        "postgresql": {
          "connectionStatus": "connected",
          "uptime": "8 hours 27 minutes 6 seconds"
        }
      },
      "cache": {
        "redis": {
          "connectionStatus": "connected",
          "memoryUsage": "10.57 MB",
          "cacheHitMissRatio": "95/5"
        }
      },
      "system": {
        "cpuUsage": [0, 0, 0],
        "totalMemory": "16068.70 MB",
        "freeMemory": "5401.01 MB"
      },
      "timestamp": "2025-01-01T00:00:00.000Z"
    },
    "errors": null
  }
  ```