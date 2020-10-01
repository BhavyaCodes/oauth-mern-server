require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const feedRoutes = require("./routes/feed");

const app = express();

const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cors({
    origin: "example.com",
    allowedHeaders: "Content-Type",
  })
);
app.use(cookieParser());
app.use(authRoutes);

app.get("/", (req, res, next) => {
  res.send({ hello: "there" });
});

app.get("/api/ping", (req, res, next) => {
  res.json({ ping: "pong" });
});

app.use("/api", userRoutes);
app.use("/api", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  });
