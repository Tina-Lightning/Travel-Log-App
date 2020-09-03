const mongoose = require('mongoose');

const { Schema } = mongoose;

// Title - Text
// Description - Text
// Comments - Text
// Rating - scale of 1 to 10
// Image - Text - URL
// Latitude - Number
// Longitude - Number
// Visit Date - Date


const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    visitDate: {
        required: true,
        type: Date,
    },
    timestamps: true,
});

module.exports = logEntrySchema;