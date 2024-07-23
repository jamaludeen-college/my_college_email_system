# My College Email System

## Description

A college email system that uses Google OAuth2 for authentication. It allows users to log in with their Google accounts and manage their emails.

## Features

- Google OAuth2 authentication
- View emails from Gmail
- User-friendly interface

## Project Structure

my_college_email_system/
├── backend/
│ ├── config/
│ │ └── config.js
│ ├── controllers/
│ │ └── authController.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── utils/
│ │ └── googleAuth.js
│ ├── .env
│ ├── server.js
│ ├── getRefreshToken.js
│ ├── package.json
│ └── ...
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── views/
│ │ ├── App.vue
│ │ └── main.js
│ ├── .env
│ ├── vue.config.js
│ ├── package.json
│ └── ...
├── .gitignore
└── README.md


## Installation

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file and add your environment variables:

   ```env
   CLIENT_ID=your-client-id
   CLIENT_SECRET=your-client-secret
   REDIRECT_URI=your-redirect-uri
   ```
4. Start the server:

   ```bash
   node server.js
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file and add your environment variables:

   ```env
   VUE_APP_API_URL=http://localhost:5000
   ```
4. Start the development server:

   ```bash
   npm run serve
   ```

## Usage

1. Open your browser and navigate to the frontend URL.
2. Log in using your Google account.
3. Manage your emails.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
