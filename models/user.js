const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     maxlength: 20,
    //     index: {
    //         unique: true
    //     }
    // },
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Not available'],
        default: 'Available'
    },
    lactitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);