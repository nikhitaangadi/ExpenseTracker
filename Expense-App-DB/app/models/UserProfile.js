const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    profilePic: {
        type: { type: String }
    },
})

const UserProfile = mongoose.model('UserProfile', userProfileSchema)

module.exports = UserProfile