# Flight Status

A real-time flight status notification system that integrates Twilio for SMS notifications, Nodemailer for email updates, and WebSocket for real-time communication. This application allows users to receive instant notifications when a flight's status changes to "delayed."

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Server Setup](#server-setup)
- [Frontend Setup](#frontend-setup)
- [API Routes](#api-routes)
- [Usage](#usage)
- [License](#license)

## Technologies Used

- **Backend**: Node.js, Express, Mongoose, Twilio, Nodemailer, WebSocket
- **Frontend**: React, Axios, Antd

## Installation

To get started, install the necessary dependencies for the backend by running:

```bash
cd backend
npm install express mongoose twilio nodemailer ws body-parser

```

## Server Setup

Set up the backend server using Node.js and Express. Connect to a MongoDB database to manage flight data. Implement Twilio for SMS notifications and Nodemailer for sending emails. Use WebSocket to enable real-time communication between the server and clients.

## Frontend Setup

Create a React component that fetches flight status data from the backend and establishes a WebSocket connection. This component will display the flight status and send notifications to users when the flight status is updated.

## API Routes

### GET `/api/flight-status/:flightNumber`

- **Description**: Fetches the current status of a specific flight by its flight number.
- **Parameters**:
  - `flightNumber`: The unique identifier for the flight.
- **Response**: Returns the flight details, including its status, gate, and departure time.

### POST `/api/update-flight-status`

- **Description**: Updates the status of a flight and sends notifications to users if the status is "delayed."
- **Request Body**:
  - `flightNumber`: The unique identifier for the flight.
  - `status`: The new status of the flight (e.g., "on time," "delayed").
  - `gate`: The gate number associated with the flight.
  - `email`: The user's email address for notifications.
  - `phone`: The user's phone number for SMS notifications.
- **Response**: Returns the updated flight details. If the status is "delayed," it triggers SMS and email notifications.

## WebSocket Route

### WebSocket Connection

- **Description**: Establishes a WebSocket connection for real-time communication between the server and clients.
- **Functionality**: The server broadcasts updated flight information to all connected clients whenever a flight status is updated.

## Usage

1. Start the backend server by running:

   ```bash
   nnm run dev

   ```

2. Start the frontend server using:

   ```bash

    npm run dev
   ```
