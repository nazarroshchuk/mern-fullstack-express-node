# backend-express

# MERN Fullstack Express Node Backend

A backend API server built with Express.js and Node.js, featuring MongoDB integration, JWT authentication, Cloudinary file uploads, and Google Places API integration.

## Features

- **Backend**: Express.js server with Node.js (ES Modules)
- **Database**: MongoDB integration with Mongoose ODM
- **Authentication**: JWT-based user authentication with bcryptjs password hashing
- **File Uploads**: Cloud-based image upload handling with Cloudinary and Multer
- **API Integration**: Google Places API for geocoding
- **Validation**: Server-side data validation with express-validator
- **CORS**: Cross-Origin Resource Sharing enabled
- **Development**: Hot reload with nodemon
- **Code Quality**: ESLint and Prettier for consistent code formatting

### External APIs

- **Google Places API** - [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service) - Convert addresses to coordinates and vice-versa
- **MongoDB Atlas** - [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud-hosted MongoDB database
- **Cloudinary** - [Cloudinary Documentation](https://cloudinary.com/documentation) - Cloud-based image and video management service

### Cloud Storage with Cloudinary

This project uses **Cloudinary v1.41.3** for persistent file storage, which is essential for production deployment since cloud platforms typically have ephemeral filesystems.

### Version Compatibility

The project uses Cloudinary v1.41.3 (not v2) due to compatibility requirements with `multer-storage-cloudinary@4.0.0`. This ensures:
- ✅ **Stable Integration**: No dependency conflicts during deployment
- ✅ **Reliable Uploads**: Proven compatibility between Cloudinary and Multer storage
- ✅ **Production Deployment**: No build errors during npm install

### Implementation Details

The Cloudinary integration uses the v2 API accessed through the v1 package:

```javascript
import cloudinary from 'cloudinary';
const cloudinaryV2 = cloudinary.v2;

// Configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Usage for image deletion
await cloudinaryV2.uploader.destroy(publicId);
```

### Why Cloudinary?

- ✅ **Persistent Storage**: Files survive server restarts (unlike local filesystem on cloud platforms)
- ✅ **CDN Delivery**: Fast global image delivery
- ✅ **Image Optimization**: Automatic format conversion and compression
- ✅ **Transformations**: Real-time image resizing and cropping
- ✅ **Free Tier**: 25GB storage and 25GB monthly bandwidth

### Cloudinary Setup

1. **Create Account**: Sign up at [cloudinary.com](https://cloudinary.com)
2. **Get Credentials**: Copy from your [Cloudinary Dashboard](https://cloudinary.com/console):
   - Cloud Name
   - API Key
   - API Secret
3. **View Uploaded Images**: Access [Media Library](https://cloudinary.com/console/media_library)

### Image Storage Structure

Images are organized in Cloudinary folders:
- **places-images/**: Place photos uploaded by users
- **user-images/**: User profile pictures (if implemented)

### File Upload Configuration

The project handles two types of uploads:
- **Place Images**: Up to 1MB, stored in `places-images/` folder
- **User Images**: Up to 500KB, stored in `places-images/` folder

Supported formats: PNG, JPEG, JPG, WEBP

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
- **cloudinary** (^1.41.3) - Cloud-based image and video management service (v1 for compatibility)
- **multer-storage-cloudinary** (^4.0.0) - Multer storage engine for Cloudinary
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

# Cloudinary Configuration (Required for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Cloudinary Environment Variables

**Required for file uploads to work:**

1. **CLOUDINARY_CLOUD_NAME**: Your Cloudinary cloud name (found in dashboard)
2. **CLOUDINARY_API_KEY**: Your API key for authentication
3. **CLOUDINARY_API_SECRET**: Your API secret for secure operations

**How to get these values:**
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Copy values from the "Account Details" section on your dashboard

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
- **Cloudinary account** (required for file uploads)

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
# Edit .env with your actual values including Cloudinary credentials
```

4. **Set up Cloudinary** (Important):
   - Create account at [cloudinary.com](https://cloudinary.com)
   - Copy your Cloud Name, API Key, and API Secret to `.env`
   - Without these, file uploads will fail

5. Start the development server:

```bash
    npm run start:nodemon
```

The server will start on `http://localhost:5000`

## Deployment

### Render Deployment with Cloudinary

The backend API is deployed on Render, a modern cloud platform that provides:
- **Automatic deployments** from GitHub
- **Environment variable management**
- **Persistent file storage** via Cloudinary integration
- **Custom domain support**

#### Important: Cloudinary is Required for Production

Cloud platforms typically have ephemeral filesystems, so local file storage won't work in production. Cloudinary provides persistent cloud storage essential for deployed applications.

#### Deploy to Render

1. **Create Render Account**: Sign up at [render.com](https://render.com)
2. **Connect GitHub Repository**: 
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
3. **Configure Build Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18 or higher
4. **Set Environment Variables** in Render Dashboard:
   ```
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   GOOGLE_PLACES_API_KEY=your-google-api-key
   NODE_ENV=production
   ```
5. **Deploy**: Render will automatically deploy your application

#### Render Benefits

- ✅ **Free Tier Available**: Perfect for development and testing
- ✅ **Automatic SSL**: HTTPS enabled by default
- ✅ **Git Integration**: Auto-deploy on push to main branch
- ✅ **Zero Downtime Deploys**: Smooth deployment process
- ✅ **Health Checks**: Automatic service monitoring

### Verifying Cloudinary Setup

After deployment, test file uploads:
1. Try uploading an image through your API
2. Check Cloudinary Media Library for uploaded files
3. Verify image URLs are accessible

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
