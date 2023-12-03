const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const Credentials = require("../model/credentials");
const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const credentials = new Credentials(request.body);
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);
        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);  
    }
});

module.exports = router;