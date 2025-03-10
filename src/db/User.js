const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },

    name: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;