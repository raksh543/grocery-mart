const mongoose=require('mongoose')
const validator=require('validator')
var bcrypt=require('bcrypt-nodejs')

var UserSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    passwordTwo:{
        type: String,
        trim: true
    }


});

// UserSchema.methods.matchPassword=function(password, passwordTwo){

// }

UserSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

UserSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports=UserSchema