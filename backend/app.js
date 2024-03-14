const express = require("express");
const app = express();
const port = 3000;

const errorHandler = require("./middlewares/errorHandling");
const categoryRouter = require("./routers/category");
const artikelRouter = require("./routers/artikel");
const publicRouter = require("./routers/public");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/categories", categoryRouter);
app.use("/artikel", artikelRouter);
app.use("/", publicRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
