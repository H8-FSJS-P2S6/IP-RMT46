const express = require("express");
const router = require("./routers");
const errorHandling = require("./middlewares/errorHandlers");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app;
