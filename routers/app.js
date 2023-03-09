const { Router } = require("express");

const appRouter = Router()

appRouter.get("/", (req, res) => {
    console.log(__dirname + "public/index.html");
    res.sendFile(__dirname + "public/index.html");
});

module.exports = appRouter


