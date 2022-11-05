const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is basically going to add on to our user schema a username and password
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({});

// this is basically going to add on to our user schema a username and password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
