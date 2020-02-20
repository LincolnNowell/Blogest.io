const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    blogs: Array,
    views: Number
})

const User = mongoose.model('blogger',UserSchema);

module.exports = User;