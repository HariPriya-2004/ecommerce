const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = new Schema({
    updatedBy: { type: String },
    updatedTime: { type: String }
});

const userSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },

    role: { type: String, required: true },

    gender: { type: String, default: null },

    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profilepic: { type: String, default: null },
    email: { type: String, default: null },

    token: { type: String, default: null }, // ✅ needed as per reference

    createdBy: { type: String, default: null },

    status: { type: String, default: "0" }, // ✅ important
    loginStatus: { type: String, default: "0" },

    updatedOn: { type: String, default: null },
    createdOn: { type: String, default: null },

    country: { type: String, default: "India" },
    countryCode: { type: String, default: "+91" },
    country_name_code: { type: String, default: "IN" },

    permissions: [{ type: String }],

    updated: [updateSchema],

    joiningDate: { type: String, default: null }

});

module.exports = mongoose.model('User', userSchema);