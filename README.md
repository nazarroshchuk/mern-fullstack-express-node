# mern-fullstack-express-node

# MERN Fullstack Express Node

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Backend**: Express.js server with Node.js
- **Database**: MongoDB integration
- **Frontend**: React application
- **Development**: Hot reload with nodemon
- **Code Quality**: ESLint and Prettier for consistent code formatting

### External API

- **Google Geocoding API** - [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start]NoSQL) Convert addresses or Place IDs to latitude/longitude coordinates and vice-versa.
- **mongoose** - [mongoose](https://mongoosejs.com/) Elegant MongoDB object modeling for Node.js

## NPM Libraries Used

### Dependencies

- **express** (^5.1.0) - Fast, unopinionated, minimalist web framework for Node.js
- **body-parser** (^2.2.0) - Node.js body parsing middleware for handling HTTP request bodies
- **cors** (^2.8.5) - Express middleware to enable Cross-Origin Resource Sharing (CORS)
- **express-validator** (^7.3.0) - Express middleware for server-side data validation and sanitization
- **axios** (^1.13.1) - Promise-based HTTP client for making requests to external APIs
- **dotenv** (^17.2.3) - Load environment variables from .env file

### Development Dependencies

- **nodemon** (^3.1.10) - Development tool that automatically restarts the server when file changes are detected
- **uuid** (^13.0.0) - Library for generating unique identifiers (UUIDs)
- **eslint** (^9.39.1) - JavaScript linting tool for identifying and fixing code issues
- **prettier** (^3.6.2) - Code formatter for consistent code style
- **eslint-config-prettier** (^10.1.8) - Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier** (^5.5.4) - Runs Prettier as an ESLint rule

## Code Formatting & Quality

This project uses ESLint and Prettier to maintain consistent code quality and formatting standards.

### Configuration

- **ESLint**: Configured with Node.js-specific rules and ES2022 support
- **Prettier**: Single quotes, 2-space indentation, 100 character line width
- **Integration**: ESLint and Prettier work together seamlessly

### Available Scripts

#### Development

```bash
     npm start          # Start development server with nodemon
     npm run prod       # Start production server
```

#### Code Quality

```bash
    npm run lint       # Check for linting issues
    npm run lint:fix   # Auto-fix linting issues
    npm run format     # Format all files with Prettier
    npm run format:check # Check if files are properly formatted
    npm run lint:format # Run both linting and formatting
```

### Pre-commit Workflow

Before committing code, run:

```bash
  npm run lint:format
```

This ensures your code follows the project's formatting standards.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
    git clone git@github.com:nazarroshchuk/mern-fullstack-express-node.git
    cd mern-fullstack-express-node
```

2. Install dependencies:

```bash
  npm install
```

1. Start the development server:

```bash
  npm run dev
```

### DEPLOYMENT

1. #### App is deployed from Github repo and is accessible at:
   https://mern-places-f3d73c0860e7.herokuapp.com/

2. #### (Optional) Build the application for production using terminal and local Git repo:

```bash
  npm run build

```bash
  brew install heroku/brew/heroku
```
```bash
 heroku login
```
heroku: Press any key to open up the browser to login or q to exit
›   Warning: If browser does not open, visit
›   https://cli-auth.heroku.com/auth/browser/***
heroku: Waiting for login...
Logging in... done
Logged in as me@example.com


