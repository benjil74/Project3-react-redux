const express = require("express");
const path=require("path");
const fileUpload=require("express-fileupload");
const holidaysLogic= require("../business-logic-layer/holidays-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const imagesLogic = require("../business-logic-layer/images-logic");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.use(fileUpload());
router.get("/", [verifyLoggedIn, verifyAdmin], async (request, response) => {
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

router.get("/users", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const result=await usersLogic.getAllUsersAsync();
        console.log(result);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message : "Server error"});
    }
});

router.get("/holiday/:id", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    const holidayID = request.params.id;
    try {
        const result = await holidaysLogic.getHolidayAsync(holidayID);
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

router.post("/insertHoliday", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        insertedHoliday=request.body;
        const result=await holidaysLogic.insertHolidayAsync(insertedHoliday);
        insertedHoliday.holidayID=result.insertId;
        response.send(insertedHoliday);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message: "Server error"});
    }
});

router.put("/updateHoliday", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        updatedHoliday=request.body;
        console.log(updatedHoliday);
        const result=await holidaysLogic.updateHolidayAsync(updatedHoliday);
        response.send(result);
        
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message: "Server error"});
    }
});

router.delete('/delete/:id', async (request, response) => {
    const holidayID = request.params.id;
    try {
        const result=await holidaysLogic.deleteHolidays(holidayID);
        console.log(result);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message : "Server error"});
    }
});

router.post("/postImage/:place", async (request, response) => {
    const place = request.params.place;
    console.log(place);
    try {
        const image = request.files.image;
        await imagesLogic.saveImage(image, place)
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message: "Server error"});
    }
});

module.exports = router;