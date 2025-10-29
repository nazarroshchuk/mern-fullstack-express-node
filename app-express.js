import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';

import placesRoutes from "./routes/places-routes.js";
import usersRoutes from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const PORT = process.env.PORT || 4001;

const appExpress = express();

appExpress.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
}));

// Middleware to parse JSON bodies
appExpress.use(bodyParser.json());
appExpress.use('/api/places',placesRoutes);
appExpress.use('/api/users',usersRoutes);

// Handle unsupported routes
appExpress.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    next(error);
})

// Error handling middleware
appExpress.use((error,req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!"});
});


// Start the server
appExpress.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
    } else {
        console.error('❌ Server error:', err);
        process.exit(1);
    }
});

