const express = require("express");
// morgan automatically logs all incoming requests, a good tool for debugging
const morgan = require("morgan");
// helmet makes a site more secure
const helmet = require("helmet");
// any origin can request from our backend? now only 3000 can
const cors = require("cors");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

// Not Found Middleware
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
});

// Error handling Middleware
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "Stack of pancakes" : error.stack,
    });
});


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});