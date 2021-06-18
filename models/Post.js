const {Schema, model} = require('mongoose')

const Comment = require('./Comment')
// const User = require('./User')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100      
    },
    body: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislike: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ]
}, {timestamps: true})

const Post = model('Post', postSchema)

module.exports = Post