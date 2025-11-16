# Canva Authentication Example

This application demonstrates the OAuth 2.0 authentication flow with the Canva API.

## Structure

- `/backend`: A Node.js Express server that handles the OAuth 2.0 flow.
- `/frontend`: A simple HTML/JavaScript frontend to initiate the authentication.

## Prerequisites

- Node.js and npm installed.
- A Canva developer account with an integration created.

## Setup and Configuration

1.  **Configure the Backend:**
    - Open the `backend/server.js` file.
    - Replace `'YOUR_CLIENT_ID'` and `'YOUR_CLIENT_SECRET'` with the client ID and client secret from your Canva integration settings.
    - Make sure the `REDIRECT_URI` in `backend/server.js` (`http://localhost:3001/callback`) is added to your integration's allowed redirect URLs in the Canva Developer Portal.

2.  **Install Backend Dependencies:**
    - Navigate to the `backend` directory in your terminal:
      ```sh
      cd backend
      ```
    - Install the dependencies:
      ```sh
      npm install
      ```

## Running the Application

1.  **Start the Backend Server:**
    - In the `backend` directory, run:
      ```sh
      npm start
      ```
    - The server will start on `http://localhost:3001`.

2.  **Run the Frontend:**
    - You need to serve the `frontend/index.html` file on a web server. A simple way to do this is using the `http-server` package.
    - If you don't have `http-server`, you can install it globally:
      ```sh
      npm install -g http-server
      ```
    - Navigate to the `frontend` directory and run:
      ```sh
      http-server -p 3000
      ```
    - The frontend will be available at `http://localhost:3000`.

## Authentication Flow

1.  Open your browser and go to `http://localhost:3000`.
2.  Click the "Connect to Canva" button.
3.  You will be redirected to Canva to authorize the application.
4.  After authorization, you will be redirected back to the application, and the access and refresh tokens will be displayed.
