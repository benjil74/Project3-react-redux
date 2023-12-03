const dal = require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid");

async function saveImage(image, place) {
    console.log(image.name);
    imageName = uuid.v4() + "_" + image.name;
    const absolutePath = path.join(__dirname, "..", "images", imageName);
    await image.mv(absolutePath);   
    return await dal.executeQueryAsync(
        `UPDATE holidays_list SET imageName = '${imageName}' WHERE place = '${place}';
`);
}

module.exports = {
    saveImage
};