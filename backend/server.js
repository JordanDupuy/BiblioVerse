const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3051;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/post", require("./routes/post.routes"));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});