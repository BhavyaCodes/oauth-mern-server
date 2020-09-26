const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = 5000;

app.use(authRoutes);

app.get("/", (req, res, next) => {
  res.send({ hello: "there" });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
