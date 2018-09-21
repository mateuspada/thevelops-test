var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = 'mongodb://thevelops:thevelops123@ds155862.mlab.com:55862/thevelops';
const opts = {useNewUrlParser: true};

mongoose.connect(url, opts);
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type:String, index:{unique: true}},
    first_name: {type: String},
    last_name: {type:String},
    personal_phone: {type:String},
    password: {type: String, select: false}
}, {collection: 'users',
    versionKey: false
});

userSchema.methods.joiValidate = function(obj) {
	let Joi = require('joi');
	let schema = {
		email: Joi.string().trim().email({ minDomainAtoms: 2 }).required(),
        first_name: Joi.string().trim().regex(/^.{3,}$/).required(),
        last_name: Joi.string().trim().regex(/^.{3,}$/).required(),
        personal_phone: Joi.string().trim().allow('').optional(),
        password: Joi.string().min(8).max(20).required()   
    }
    
	return Joi.validate(obj, schema);
}

userSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = {Mongoose: mongoose, UserSchema: userSchema}