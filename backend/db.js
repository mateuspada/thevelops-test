var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const url = 'mongodb://localhost:27017/thevelops';
const opts = { useNewUrlParser: true };

mongoose.connect(url, opts);
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    personal_phone: String,
    password: String       
}, {collection: 'users',
    versionKey: false
});

module.exports = {Mongoose: mongoose, UserSchema: userSchema}