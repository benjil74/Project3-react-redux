const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const usersLogic = require("../business-logic-layer/users-logic");
const holidaysLogic= require("../business-logic-layer/holidays-logic");
const authLogic = require("../business-logic-layer/auth-logic");
const router = express.Router();

router.get("/holidays", verifyLoggedIn, async (request, response) => {
    try {
        const result=await holidaysLogic.getAllHolidaysAsync();
        console.log(result);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message : "Server error"});
    }
});

router.get("/futureHolidays", verifyLoggedIn, async (request, response) => {
    try {
        const result=await holidaysLogic.getFutureHolidays();
        console.log(result);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message : "Server error"});
    }
});

router.get("/currentHolidays", verifyLoggedIn, async (request, response) => {
    try {
        const result=await holidaysLogic.getCurrentHolidays();
        console.log(result);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message : "Server error"});
    }
});

router.post("/insertUser", async (request, response) => {
    try {
        const result=await authLogic.insertUserAsync(request.body);
        let insertedUser=request.body;
        insertedUser.userID=result.insertId;
        response.send(insertedUser);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message: "Server error"});
    }
});

router.get('/checkEmail', async (req, res) => {
    const result= await usersLogic.checkEmail(req.query);
      const count = result[0].count;
      const errors = {};
      if (count > 0) {
        res.status(409).json({ error: 'Email already exists' });
        errors.email = 'email already exists';
      } else {
        res.status(200).json({ message: 'Email is available' });
      }
    });

router.post("/updateFollowers", async (req, res) => {
    try{
    const result=await usersLogic.updateFollowers(req.body);
        res.send(result);
        res.json({ message: "Followers updated successfully" });}
    catch (error) {
        console.log(error);
        response.status(500).send({message: "Server error"});
    }
      });

router.get("/user/:id", [verifyLoggedIn], async (request, response) => {
    const userID = request.params.id;
    try {
        const result = await usersLogic.getUserAsync(userID);
        if (result) {
            response.send(result);
        } else {
            response.status(404).json({ message: 'Holiday not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Server error' });
    }
});
  
module.exports = router;