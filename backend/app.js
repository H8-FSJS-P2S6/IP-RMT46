if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;

// middleware
const errorHandler = require("./middlewares/errorHandling");
const authentication = require("./middlewares/authentication");

// routers
const categoryRouter = require("./routers/category");
const artikelRouter = require("./routers/artikel");
const publicRouter = require("./routers/public");
const userRouter = require("./routers/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", publicRouter);
app.use("/auth", userRouter);

app.use(authentication);
app.use("/categories", categoryRouter);
app.use("/artikel", artikelRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
