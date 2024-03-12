const express = require('express');
const router = require("./routers");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})