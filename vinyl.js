const express = require("express");
const router = express.Router();
const path = require ("path") ;
router
    .route("/")
    .get((req, res) => res.render(path.resolve("src/views/vinyl.ejs")))
    .post((req, res) => res.sendFile("POST"))
module.exports = router;

