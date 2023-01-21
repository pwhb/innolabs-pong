const { Router } = require("express");

const appRouter = Router()

appRouter.get("/", (req, res) => {
    res.sendFile(__dirname + "public/index.html");
});

appRouter.post("/config", (req, res) => {
    res.sendFile()
});

module.exports = appRouter


