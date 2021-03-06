const express = require("express");
// morgan automatically logs all incoming requests, a good tool for debugging
const morgan = require("morgan");
// helmet makes a site more secure
const helmet = require("helmet");
// any origin can request from our backend? now only 3000 can
const cors = require("cors");
const mongoose = require("mongoose");

// this brings in the .env file so we can use those variables
require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

// Mongoose Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

//Body parsing Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

app.use("/api/logs", logs);

// Not Found Middleware
app.use(middlewares.notFound);
// Error handling Middleware
app.use(middlewares.errorHandler);


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});