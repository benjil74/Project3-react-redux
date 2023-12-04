const dal = require("../data-access-layer/dal");

function getAllUsersAsync() {
    return dal.executeQueryAsync(`
        select * from users
    `);
}

function getUserAsync(userID){
  const query = `SELECT firstName, lastName FROM users WHERE userID = '${userID}'`;
    const user =dal.executeQueryAsync(query, [userID]);
    return user;
}

function checkEmail(user){
    return dal.executeQueryAsync(`
    SELECT COUNT(*) AS count FROM users WHERE email = '${user.email}';
    `)
}

function getFollowersCount(holidayId) {
    return dal.executeQueryAsync(
       `SELECT COUNT(*) AS count FROM followers WHERE followers.holidayID = '${holidayId}'`,
       [holidayId]
    );
 }

 function getAllFollowersCount() {
  return dal.executeQueryAsync(
     `SELECT holidays_list.place, COUNT(DISTINCT followers.userID) AS userCount 
     FROM holidays_list LEFT JOIN followers ON holidays_list.holidayID = followers.holidayID 
     GROUP BY holidays_list.place;`
  );
}

function getFollowers() {
  return dal.executeQueryAsync(
    ` SELECT * from followers
    `
  );
}

function getLikedHolidays(userID) {
  return dal.executeQueryAsync(
    ` SELECT holidayID from followers where userID ='${userID}'
    `
  );
}

function updateFollowers(userId, holidayId) {
    return dal.executeQueryAsync(
      `INSERT INTO followers (userID, holidayID) VALUES ('${userId}', '${holidayId}')`
    );
  }
  
function deleteFollowers(userId, holidayId) {
    return dal.executeQueryAsync(
      `DELETE FROM followers WHERE userID = '${userId}' AND holidayID = '${holidayId}'`
    );
  }
  
module.exports = {
    getAllUsersAsync,
    checkEmail,
    updateFollowers,
    deleteFollowers,
    getFollowersCount,
    getAllFollowersCount,
    getFollowers,
    getLikedHolidays,
    getUserAsync
}