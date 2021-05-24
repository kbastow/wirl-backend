const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const trackerSchema = new mongoose.Schema({
    gratitude: {
    type: String,
    required: true
    },
    reflection: {
    type: String,
    required: true
    },
    movement: {
    type: String,
    required: true
    },
    user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
    },
    emotion: {
    type: String,
    required: true
    },
    variety: {
    type: String,
    required: true
    }
        
}, { timestamps: true })

// model
const trackerModel = mongoose.model('Tracker', trackerSchema)

// export
module.exports = trackerModel