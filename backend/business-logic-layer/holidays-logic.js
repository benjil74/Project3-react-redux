const dal = require("../data-access-layer/dal"); 

function getAllHolidaysAsync() {
    return dal.executeQueryAsync(`
        select * from holidays_list
    `);
}

async function getHolidayAsync(id) {
    const query = `SELECT holidayID, place, description, DATE_FORMAT(startDate, "%Y-%m-%d") as startDate, 
    DATE_FORMAT(endDate, "%Y-%m-%d") as endDate, price, imageName FROM holidays_list WHERE holidayID = '${id}'`;
    const holiday =dal.executeQueryAsync(query, [id]);
    return holiday;
}

function insertHolidayAsync(holiday) {
    return dal.executeQueryAsync(`
        INSERT INTO holidays_list 
            (place, description, startDate, endDate, price) 
            VALUES 
            ('${holiday.place}', '${holiday.description}', '${holiday.startDate}', '${holiday.endDate}', '${holiday.price}')
    `);
}

function updateHolidayAsync(holiday) {
    return dal.executeQueryAsync(`
    UPDATE holidays_list SET place = '${holiday.place}', description = '${holiday.description}', startDate='${holiday.startDate}',
    endDate = '${holiday.endDate}', price = '${holiday.price}'
WHERE holidays_list.holidayID = '${holiday.holidayID}'
    `);
}

async function getFutureHolidays() {
    return dal.executeQueryAsync(`
            select * from holidays_list where startDate > CURDATE() ORDER BY startDate ASC
        `);
}

async function getCurrentHolidays() {
    return dal.executeQueryAsync(`
            select * from holidays_list where startDate < CURDATE() and endDate > CURDATE() ORDER BY startDate ASC
        `);
}
async function deleteHolidays(id) {
    return dal.executeQueryAsync(`
    DELETE FROM holidays_list WHERE holidays_list.holidayID ='${id}';
        `);
}
module.exports = {
    insertHolidayAsync,
    getAllHolidaysAsync,
    getFutureHolidays,
    getCurrentHolidays,
    deleteHolidays,
    getHolidayAsync,
    updateHolidayAsync
}