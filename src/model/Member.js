const mongoosePaginate = require('mongoose-paginate-v2');

const textSearch = require('mongoose-partial-full-search');

const {
    model,
    Schema,
  } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        default: '',
        require
    },
    surName: {
        type: String,
        default: '',
        require
    },
    middleName: {
        type: String,
        default: '',
        require
    },
    phoneNumber: {
        type: String,
        default: '',
        require
    },
    membership: {
        type: String,
        default: '',
        require
    },
    dateOfBirth: {
        type: String,
        default: '',
        require
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

schema.index({ name: 'text', surName: 'text', middleName: 'text' });
schema.plugin(textSearch)

schema.plugin(mongoosePaginate)


module.exports = model("Member",schema)