const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
};

// Error handling Middleware
// next is for error handling, and forwarding the error on as it happens 
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        // cmd + control + space = gives you emojis 
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
}
