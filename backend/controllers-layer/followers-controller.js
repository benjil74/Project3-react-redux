const express = require("express");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const usersLogic = require("../business-logic-layer/users-logic");
const router = express.Router();

router.get("/count/:holidayId", async (req, res) => {
    try {
       const { holidayId } = req.params;
       const result = await usersLogic.getFollowersCount(holidayId);
       const count = result[0].count;
       res.json({ count });
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
    }
 });

router.get("/", async (req,res) => {
  try {
      const result = await usersLogic.getFollowers();
      res.send(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });}
}
);

router.get("/liked/:userID", async (req, res) => {
  try {
    const {userID}=req.params;
    const result = await usersLogic.getLikedHolidays(userID);
    res.send(result);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
 }
})

router.get("/count", [verifyLoggedIn, verifyAdmin], async (req,res)=> {
  try {
      const result = await usersLogic.getAllFollowersCount();
      const count = result.userCount;
      console.log(result);
      res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
 }
})

router.post("/update", async (req, res) => {
    try {
      const { userId, holidayId } = req.body;
      const result = await usersLogic.updateFollowers(userId, holidayId);
      res.json({ message: "Followers updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/delete", async (req, res) => {
    try {
      const { userId, holidayId } = req.body;
      const result = await usersLogic.deleteFollowers(userId, holidayId);
      res.json({ message: "Followers deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;