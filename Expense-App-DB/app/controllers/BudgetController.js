const Budget = require('../models/Budget')
const BudgetController = {}

BudgetController.create = (req, res) => {
    const budget = new Budget()
    budget.userId = req.params.userId
    budget.save()
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

BudgetController.show = (req, res) => {
    Budget.findOne({ userId: req.user.id })
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

BudgetController.update = (req, res) => {
    const body = req.body
    Budget.findOneAndUpdate({ userId: req.user.id }, body, { new: true, runValidations: true })
        .then((budget) => {
            res.json(budget)
        })
        .catch((error) => {
            res.json(error.message)
        })
}
module.exports = BudgetController