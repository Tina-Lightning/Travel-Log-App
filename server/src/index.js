const express = require("express");
// morgan automatically logs all incoming requests, a good tool for debugging
const morgan = require("morgan");
// helmet makes a site more secure
const helmet = require("helmet");
// any origin can request from our backend? now only 3000 can
const cors = require("cors");

const middlewares = require("./middlewares");

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
app.use(middlewares.notFound);
// Error handling Middleware
app.use(middlewares.errorHandler);


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});