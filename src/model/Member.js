const {
    model,
    Schema,
  } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        default: ''
    },
    surName: {
        type: String,
        default: ''
    },
    middleName: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    membership: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    cloudinary_id: {
        type: String,
        default: ''
    },
});

module.exports = model("Member",schema)