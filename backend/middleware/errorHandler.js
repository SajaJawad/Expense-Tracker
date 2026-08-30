// 404 Handler for undefined API routes
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    
    // Do not expose internal stack traces in production
    const isProduction = process.env.NODE_ENV === "production";
    
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        ...(isProduction ? {} : { stack: err.stack })
    });
};

module.exports = { notFoundHandler, errorHandler };
