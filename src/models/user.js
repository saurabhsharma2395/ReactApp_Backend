const mongoose = require("mongoose");

// Defining the schema for the User collection/document
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
} ,{timestamps: true});

module.exports = mongoose.model("User", UserSchema);