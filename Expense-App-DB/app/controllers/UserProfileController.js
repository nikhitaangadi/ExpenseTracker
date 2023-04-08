const UserProfile = require('../models/UserProfile')
const User = require('../models/User')

const UserProfileController = {}

UserProfileController.create = (req, res) => {
    console.log('ID', req.params.userId)
    const profile = new UserProfile()
    profile.userId = req.params.userId
    profile.save()
        .then((profile) => {
            res.json(profile)
        })
        .catch((err) => {
            res.json(err)
        })
}

UserProfileController.show = (req, res) => {
    UserProfile.find({ userId: req.user.id })
        .then((profile) => {
            res.json(profile)
        })
        .catch((err) => {
            res.json(err)
        })
}

UserProfileController.update = (req, res) => {
    const body = req.body
    UserProfile.findOneAndUpdate({ userId: req.user.id }, body, { new: true, runValidations: true })
        .then((profile) => {
            res.json(profile)
        })
        .catch((errors) => {
            res.json(errors)
        })
}

UserProfileController.updateImage = (req, res) => {
    if (req.file) {
        const body = req.body
        body.profilePic = req.file.path
        UserProfile.findOneAndUpdate({ userId: req.user.id }, body, { new: true, runValidations: true })
            .then((profile) => {
                res.json(profile)
            })
            .catch((errors) => {
                res.json(errors)
            })
    } else {
        res.json({ errors: 'Only jpg, jpeg, png and pdf file supported!' })
    }
}

module.exports = UserProfileController