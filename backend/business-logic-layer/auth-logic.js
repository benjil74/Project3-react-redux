const jwt = require("jsonwebtoken");
const dal = require("../data-access-layer/dal");
const crypto = require("crypto");    
const uuid = require("uuid");        

async function loginAsync(credentials) {
    credentials.password = hash(credentials.password);
    const user = await dal.executeQueryAsync(
        `
        select * from users 
        where email='${credentials.email}'
        and password='${credentials.password}'
        `
    );
    if (!user || user.length < 1) return null;
    delete user[0].password;

    user[0].token = jwt.sign({ user }, "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "30 minutes" });
    return user[0];
}

async function insertUserAsync(user) {
    user.password = hash(user.password);
    user.uuid = uuid.v4();
  
    const sql=`
    INSERT INTO users
    (firstName, lastName, email, password, uuid, role) 
    VALUES 
    ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}', '${user.uuid}', '');
    `; 
    const info = await dal.executeQueryAsync(sql);
    delete user.password;
    user.token = jwt.sign({ user }, "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "30 minutes" });
  
    return user;
  }
function hash(plainText) {
    if(!plainText) return null;
    const salt = "LefichachNitkanasnoooAnooo"; 
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
  }

module.exports = {
    loginAsync,
    insertUserAsync
};