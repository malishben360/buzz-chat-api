# BUZZ CHAT API Documentation

The BUZZ CHAT API is a real-time chat API that enables users to send and receive messages, view online and offline users, share files, and register and authenticate users. This documentation provides an overview of the project structure, installation guide, and information on possible features for contribution.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Installation Guide](#installation-guide)
3. [API Endpoints](#api-endpoints)
4. [User Registration and Authentication](#user-registration-and-authentication)
5. [Real-Time Messaging](#real-time-messaging)
6. [File Sharing](#file-sharing)
7. [Possible Features for Contribution](#possible-features-for-contribution)

## Project Structure

The BUZZ CHAT API project is structured as follows:

```
buzz-chat-api
    -public
        -uploads
    -src
        -config
            -DatabaseConfig.ts
            -ServerConfig.ts
        -controllers
            -authController.ts
            -messageController.ts
            -userController.ts
            -index.ts
        -middlewares
            -authMiddleware.ts
            -index.ts
        -models
            -message.ts
            -user.ts
            -index.ts
        -routes
            -v1
                -authRoutes.ts
                -messageRoutes.ts
                -userRoutes.ts
            -index.ts
        -services
            -messageServices.ts
            -userServices.ts
            -index.ts
        -types
            -AuthTypes.ts
            -WebSocketTypes.ts
            -index.ts
        -utilities
            -helpers.ts
            -index.ts
        index.ts
    .env.example
    .eslintignore
    .eslintrc.js
    .gitignore
    .nvmrc
    .prettierignore
    .prettierrc
    jest.config.js
    nodemon.json
    package-lock.json
    package.json
    README.md
    tsconfig.json
    tsconfig.prod.json
```

### Description of Folders and Files

- **public/uploads**: This folder is used to store uploaded files.
- **src**: Contains all the source code of the project.
- **config**: Holds configuration files, such as database and server configurations.
- **controllers**: Implements the controllers responsible for handling API endpoints.
- **middlewares**: Contains custom middleware functions.
- **models**: Defines the data models used in the application.
- **routes**: Contains all the API routes, versioned under the "v1" namespace.
- **services**: Includes the business logic and services for handling data manipulation.
- **types**: Defines custom types and interfaces used throughout the application.
- **utilities**: Provides utility/helper functions.
- **index.ts**: The entry point of the application.

## Installation Guide

To install and run the BUZZ CHAT API locally, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/malishben360/buzz-chat-api.git
```

2. Change into the project directory:

```bash
cd buzz-chat-api
```

3. Install the required dependencies:

```bash
npm install
```

4. Create a copy of the `.env.example` file and rename it to `.env`. Edit the configuration values according to your environment, including MongoDB connection details:

```
# MongoDB connection
MONGO_URI=your_mongodb_connection_string
```

5. Set up the MongoDB database:

   - Ensure you have MongoDB installed and running on your system or provide a remote connection string in `MONGO_URI`.

6. Run the database migrations:

```bash
npm run migrate
```

7. Start the development server:

```bash
npm run dev
```

The server should now be running on `http://localhost:3000`.

## API Endpoints

The BUZZ CHAT API provides the following API endpoints:

### User Registration and Authentication

1. `POST /api/v1/register` - Register a new user. Requires providing a unique username and password.

2. `POST /api/v1/login` - Log in an existing user. Requires providing a registered username and password.

3. `POST /api/v1/logout` - Log out the current authenticated user.

### Real-Time Messaging

4. `GET /api/v1/messages` - Fetch all messages.

5. `GET /api/v1/messages/:id` - Fetch a specific message by ID.

6. `POST /api/v1/messages` - Send a new message to a user. Requires authentication.

7. `DELETE /api/v1/messages/:id` - Delete a specific message by ID. Requires authentication.

### File Sharing

8. `POST /api/v1/upload` - Upload a file. Requires authentication.

9. `GET /api/v1/files/:filename` - Download a specific file by filename.

### User Status

10. The user status is handle via the websocket event listenners.

## User Registration and Authentication

To use the chat features of the API, users must be registered and authenticated. Follow these steps to register and log in:

### User Registration

To register a new user, make a POST request to `/api/v1/auth/register` with the following JSON payload:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### User Login

To log in an existing user, make a POST request to `/api/v1/auth/login` with the following JSON payload:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Upon successful login, the API will respond with an access token, which you should include in the `Authorization` header for subsequent authenticated requests.

### User Logout

To log out a user, make a POST request to `/api/v1/auth/logout` with the access token in the `Authorization` header.

## Real-Time Messaging

The API allows users to send and receive messages in real-time. Messages can be retrieved using the appropriate API endpoints, and they are also delivered via WebSocket for real-time updates.

To send a message to a user, make a POST request to `/api/v1/messages` with the following JSON payload:

```json
{
  "recipientId": "recipient_user_id",
  "content": "your_message_content"
}
```

The `recipientId` should be the unique ID of the user to whom you want to send the message.

To delete a message, make a DELETE request to `/api/v1/messages/:id`, where `:id` is the ID of the message you want to delete.

## File Sharing

The API allows users to upload and download files. To upload a file, make a POST request to `/api/v1/upload` and include the file as part of the form data.

To download a file, make a GET request to `/api/v1/files/:filename`, where `:filename` is the name of the file you want to download.

## Possible Features for Contribution

The BUZZ CHAT API is an open-source project, and contributions are welcome. Here are some potential areas for improvement or new features:

1. Implementing a message read status (read receipts) for messages.
2. Adding support for user profiles and avatars.
3. Enhancing security with rate limiting, CSRF protection, etc.
4. Implementing user search functionality.
5. Improving error handling and validation.
6. Adding support for message attachments (images, videos, etc.).
7. Implement

ing user blocking and reporting functionality.
8. Improving unit and integration tests.
9. Adding support for more file types in file uploads.

Please feel free to open issues and submit pull requests for any of these features or any other improvements you'd like to suggest.