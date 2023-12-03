const express = require("express");
const cors = require("cors");

const adminController=require("./controllers-layer/admin-controller");
const dataController=require("./controllers-layer/data-controller");
const authController=require("./controllers-layer/auth-controller");
const followersController=require("./controllers-layer/followers-controller");
const server = express();
server.use(cors());
server.use(express.json());
server.use('/images', express.static('images'));

server.use("/admin", adminController);
server.use("/", dataController);
server.use("/auth", authController);
server.use("/followers", followersController);
server.use('/images', express.static('images'));

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error");
});