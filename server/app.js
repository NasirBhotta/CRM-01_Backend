require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./database/connect");
const customerRouter = require("./routes/customers");
const authRouter = require("./routes/auth");
const NotFoundError = require("./middleware/notFoundError");
const errorHandler = require("./middleware/error-handler");
const session = require("express-session");
const authenticationMiddleWare = require("./middleware/authentication");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", authenticationMiddleWare, customerRouter);

/// errors
app.use(NotFoundError);
app.use(errorHandler);

/// connection
const port = process.env.PORT || 2000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database is Connected..........");
    app.listen(port, () =>
      console.log("server is listening on port 2000..........")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
