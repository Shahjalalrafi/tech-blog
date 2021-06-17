const {Schema, model} = require('mongoose')

const Profile = require('./Profile')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: string,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User