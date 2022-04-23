const express = require("express");
const ejs = require  ("ejs");

const app = express();
const port = 3000;



app.use("/styles", express.static(__dirname + '/styles'));

app.set('views engine', "ejs");
app.use(express.static("src"));
app.use("/", require("./src/vinyl"));
app.use("/contact", require("./src/contact"));
app.use ("/about", require ("./src/about"));
app.use ("/buy", require ("./src/buy"));


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

