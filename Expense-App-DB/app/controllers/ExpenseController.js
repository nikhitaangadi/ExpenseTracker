const Expense = require('../models/Expense')

const ExpenseController = {}

ExpenseController.create = (req, res) => {
    const body = req.body
    const expense = new Expense(body)
    expense.userId = req.user.id
    expense.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.show = (req, res) => {
    Expense.find({ userId: req.user.id, deleted: false })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.showDeleted = (req, res) => {
    Expense.findDeleted({ userId: req.user.id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.showOne = (req, res) => {
    const id = req.params.id
    Expense.findOne({ _id: id, userId: req.user.id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.updateImage = (req, res) => {
    if (req.file) {
        const id = req.params.id
        const body = req.body
        body.invoice = req.file.path
        Expense.findOneAndUpdate({ _id: id, userId: req.user.id }, body, { new: true, runValidations: true })
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    } else {
        res.json({ errors: 'Only jpg, jpeg, png and pdf file supported!' })
    }
}

ExpenseController.updateExpense = (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findOneAndUpdate({ _id: id, userId: req.user.id }, body, { new: true, runValidations: true })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.delete = (req, res) => {
    const id = req.params.id
    Expense.findOneAndDelete({ _id: id, userId: req.user.id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.softDelete = (req, res) => {
    const id = req.params.id
    Expense.deleteById({ _id: id, userId: req.user.id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

ExpenseController.restore = (req, res) => {
    const id = req.params.id
    Expense.restore({ _id: id, userId: req.user.id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports = ExpenseController