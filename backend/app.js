const express = require("express");
const app = express();
const port = 3000;

const errorHandler = require("./middlewares/errorHandling");
const categoryRouter = require("./routers/category");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/categories", categoryRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
