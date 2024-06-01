# Notes App

Welcome to the Notes App! This application allows users to create, view, edit, and delete notes. It is built with an Express backend and a React frontend using Vite.

## Features

- User authentication (JWT)
- Create, read, update, and delete notes
- Responsive design

## Installation

To get started with the Notes App, you need to set up both the backend and the frontend. Follow the instructions below.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/aykutNazifov/Notes-Taking-App.git
    cd notes-app
    ```

2. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=
    DATABASE_URL=
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

    ## Environment Variables

### Backend

The backend requires the following environment variables:

- `PORT`: The port on which the backend server will run (e.g., 3001).
- `DATABASE_URL`: The URL of your database (e.g., a PostgreSQL connection string).
- `ACCESS_TOKEN_SECRET`: The secret key for signing access tokens.
- `REFRESH_TOKEN_SECRET`: The secret key for signing refresh tokens.

## Running the Application

### Backend

To start the backend server, run:

```bash
cd server
npm run dev
```

### FRONTEND

To start the frontend server, run:

```bash
cd client
npm run dev
```