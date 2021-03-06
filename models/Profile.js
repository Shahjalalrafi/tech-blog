const {Schema, model} = require('mongoose')

// const Post = require('./Post')
// const User = require('./User')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        linkedIn: String,
        github: String
    },
    posts: [
        {
            type: Schema.types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.types.ObjectId,
            ref: 'Post'
        }
    ]
}, {timestamps: true})


const Profile = model('Profile', profileSchema)

module.exports = Profile