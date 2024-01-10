require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const spaceRoutes = require("./routes/spaces");
const auditRoutes = require("./routes/audits");
const userRoutes = require("./routes/user");
const authRoutes = require('./routes/auth.js');
const cookieParser = require("cookie-parser");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/v1/spaces", spaceRoutes);
app.use("/api/v1/audits", auditRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
