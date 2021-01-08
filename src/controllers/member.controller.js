const genericCrud = require("./generic.controller");
const { Member } = require("../model");

module.exports = {
    ...genericCrud(Member),
};