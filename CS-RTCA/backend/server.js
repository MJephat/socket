const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send("Api is running!")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`server started on port ${PORT}!`));