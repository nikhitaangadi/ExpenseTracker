require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Expense = require('../models/Expense')
const Category = require('../models/Categories')
const UserProfile = require('../models/UserProfile')
const Budget = require('../models/Budget')
const UserController = {}

UserController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function (user) {
            res.json(user)
        })
        .catch(function (err) {
            res.json(err)
        })
}

UserController.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (user) {
                bcryptjs.compare(body.password, user.password)
                    .then((result) => {
                        if (result) {
                            const token = jwt.sign({ id: user._id }, process.env['JWT_SECRET'])
                            res.json({
                                token: `Bearer ${token}`
                            })
                        } else {
                            res.json({
                                errors: 'Invalid email or password'
                            })
                        }

                    })
            } else {
                res.json({
                    errors: 'Invalid email or password'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

UserController.account = (req, res) => {
    User.findOne({ _id: req.user.id })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

UserController.update = (req, res) => {
    const id = req.user.id
    const body = req.body
    User.findOneAndUpdate({ _id: id }, body, { new: true, runvalidations: true })
        .then((user) => {
           
            return res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

UserController.deleteAccount = (req, res) => {
    const id = req.user.id
    User.findOne({ _id: id })
        .then((user) => {
            if (user) {
                Expense.deleteMany({ userId: id }, (function (err, result) {
                    if (result) {
                        Category.deleteMany({ userId: id }, (function (err, result) {
                            if (result) {
                                UserProfile.deleteOne({ userId: id }, (function (err, result) {
                                    if (result) {
                                        Budget.deleteOne({ userId: id }, (function (err, result) {
                                            if (result) {
                                                User.deleteOne({ _id: id })
                                                    .then((response) => {
                                                        return res.json({ message: 'User Deleted' })
                                                    })
                                                    .catch((err) => {
                                                        return res.json(err)
                                                    })
                                            } else {
                                                return res.json(err)
                                            }
                                        }))
                                    } else {
                                        return res.json(err)
                                    }
                                }))
                            } else {
                                return res.json(err)
                            }
                        }))
                    } else {
                        return res.json(err)
                    }
                }))
            } else {
                return res.json(err)
            }
        })
        .catch((err) => {
            return res.json(err)
        })
}

module.exports = UserController