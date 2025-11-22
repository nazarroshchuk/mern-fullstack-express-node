# backend-express

# MERN Fullstack Express Node Backend

A backend API server built with Express.js and Node.js, featuring MongoDB integration, JWT authentication, file uploads, and Google Places API integration.

## Features

- **Backend**: Express.js server with Node.js (ES Modules)
- **Database**: MongoDB integration with Mongoose ODM
- **Authentication**: JWT-based user authentication with bcryptjs password hashing
- **File Uploads**: Image upload handling with Multer
- **API Integration**: Google Places API for geocoding
- **Validation**: Server-side data validation with express-validator
- **CORS**: Cross-Origin Resource Sharing enabled
- **Development**: Hot reload with nodemon
- **Code Quality**: ESLint and Prettier for consistent code formatting

### External APIs

- **Google Places API** - [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service) - Convert addresses to coordinates and vice-versa
- **MongoDB Atlas** - [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud-hosted MongoDB database

## NPM Libraries Used

### Dependencies

- **express** (^5.1.0) - Fast, unopinionated, minimalist web framework for Node.js
- **body-parser** (^2.2.0) - Node.js body parsing middleware for handling HTTP request bodies
- **cors** (^2.8.5) - Express middleware to enable Cross-Origin Resource Sharing (CORS)
- **express-validator** (^7.3.0) - Express middleware for server-side data validation and sanitization
- **axios** (^1.13.1) - Promise-based HTTP client for making requests to external APIs
- **mongoose** (^8.19.3) - Elegant MongoDB object modeling for Node.js
- **mongodb** (^6.20.0) - The official MongoDB driver for Node.js
- **jsonwebtoken** (^9.0.2) - JSON Web Token implementation for authentication
- **bcryptjs** (^3.0.3) - Library for hashing passwords
- **multer** (^2.0.2) - Middleware for handling multipart/form-data (file uploads)
- **uuid** (^13.0.0) - Library for generating unique identifiers (UUIDs)
- **dotenv** (^17.2.3) - Loads environment variables from .env file

### Development Dependencies

- **nodemon** (^3.1.10) - Development tool that automatically restarts the server when file changes are detected
- **eslint** (^9.39.1) - JavaScript linting tool for identifying and fixing code issues
- **@eslint/js** (^9.39.1) - ESLint JavaScript configuration
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
 npm start                # Start production server
 npm run start:nodemon    # Start development server with nodemon and .env file
 npm run prod            # Start production server with NODE_ENV=production
```

#### Code Quality

```bash
  npm run lint           # Check for linting issues
  npm run lint:fix       # Auto-fix linting issues
  npm run format         # Format all files with Prettier
  npm run format:check   # Check if files are properly formatted
  npm run lint:format    # Run both linting and formatting
```

### Pre-commit Workflow

Before committing code, run:

```bash
  npm run lint:format
```

This ensures your code follows the project's formatting standards.

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for reference):

```env
# Server Configuration
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.oohiw3o.mongodb.net/?appName=<cluster_name>
DB_USER_NAME=your-db-username
DB_PASSWORD=your-db-password
DB_CLUSTER_NAME=your-cluster-name
DB_NAME=your-db-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h

# API Configuration
API_BASE_URL=/api

# Google Places API
GOOGLE_PLACES_API_KEY=your-google-places-api-key
```

## API Endpoints

### Places
- `GET /api/places/user/:uid` - Get places by user ID
- `GET /api/places/:pid` - Get place by place ID
- `POST /api/places` - Create new place (requires authentication)
- `PATCH /api/places/:pid` - Update place (requires authentication)
- `DELETE /api/places/:pid` - Delete place (requires authentication)

### Users
- `GET /api/users` - Get all users
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - User login

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Google Places API key

### Installation

1. Clone the repository:

```bash
    git clone <repository-url>
    cd backend-express
```

2. Install dependencies:

```bash
    npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start the development server:

```bash
    npm run start:nodemon
```

The server will start on `http://localhost:5000`

## Deployment

### Heroku Deployment

The app is deployed on Heroku and accessible at:
**https://mern-places-f3d73c0860e7.herokuapp.com/**

#### Deploy from GitHub (Recommended)
1. Connect your GitHub repository to Heroku
2. Enable automatic deployments from your main branch
3. Set environment variables in Heroku dashboard

#### Manual Deployment via CLI

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login to Heroku
heroku login

# Create Heroku app (if not exists)
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
# ... set other environment variables

# Deploy
git push heroku main
```

## Project Structure

```
├── app-express.js          # Main application file
├── controllers/            # Route controllers
│   ├── places-controller.js
│   └── users-controller.js
├── middleware/             # Custom middleware
│   ├── file-upload.js
│   └── jwt-token-validation.js
├── models/                 # Database models
│   ├── place.js
│   ├── user.js
│   └── http-error.js
├── routes/                 # Route definitions
│   ├── places-routes.js
│   └── users-routes.js
├── uploads/                # File upload directory
├── utils/                  # Utility functions
│   ├── axios.js
│   ├── location.js
│   └── mongoose.js
├── .env.example           # Environment variables template
├── eslint.config.js       # ESLint configuration
└── package.json           # Project dependencies and scripts
```

## Author

**Nazarii Roshchuk**

## License

ISC
