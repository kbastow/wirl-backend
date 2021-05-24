const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const blogSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    post: {
    type: String,
    required: true
    },
    media: {
    type: String,
    required: true
    },
    user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
    },
    category: {
    type: String,
    required: true
    },
    link: {
    type: String,
    }
        
}, { timestamps: true })

// model
const blogModel = mongoose.model('Blog', blogSchema)

// export
module.exports = blogModel