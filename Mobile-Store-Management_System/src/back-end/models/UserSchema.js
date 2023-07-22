const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: [
        {
            address: { type: String },
            city: { type: String }

        }
    ],
    phone: {
        type: String,
    },

    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;