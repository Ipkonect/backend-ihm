const mongoose = require('../data_base');

const users_schema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
        required: false,
    },
    suport: {
        type: Boolean,
        default: false,
        required: false,
    },
    overview: {
        type: Boolean,
        default: false,
        required: true  
    }
});

module.exports = mongoose.model('users', users_schema);