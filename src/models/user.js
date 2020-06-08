const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Task = require('./task')


const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
        default: 'ananomous'
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be +be number');
            }
        }
    },
    email: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cann"t be include password');
            }
        }
    },
    tokens: [{
            token:{
                type:String,
                required: true
            }
    }],
    avatar: {
        type: Buffer
    }
}, 
{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();

    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar

    return userObject

}

userSchema.methods.generateToken = async function () {
     const user = this
    // console.log(user1)

    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRECT_KEY)

    user.tokens = user.tokens.concat({ token})

    await user.save()

    return token;

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to login')
    }

    const isPwdMatch = await bcryptjs.compare(password, user.password)
    
    if(isPwdMatch) {
        return user
    }
    throw new Error('Unable to login')
}


//hashing password
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    
    next()
})

//delete user tasks when user is deleting 

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User;