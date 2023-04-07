const Category = require('../models/Categories')
const Expense = require('../models/Expense')
const CategoryController = {}

CategoryController.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.userId = req.user.id
    category.save()
        .then((category) => {
            res.json(category)
        })
        .catch((error) => {
            res.json(error)
        })
}

CategoryController.show = (req, res) => {
    Category.find({ userId: req.user.id, deleted: false })
        .then((category) => {
            res.json(category)
        })
        .catch((error) => {
            res.json(error)
        })
}

CategoryController.showDeleted = (req, res) => {
    Category.findDeleted({ userId: req.user.id })
        .then((category) => {
            res.json(category)
        })
        .catch((error) => {
            res.json(error)
        })
}

CategoryController.delete = (req, res) => {
    const id = req.params.id
    const userid = req.user.id
    Expense.findDeleted({ categoryId: id, userId: userid })
        .then((expense) => {
            if (expense.length > 0) {
                Expense.deleteMany({ categoryId: id })
                    .then((result) => {
                        Category.findOneAndDelete({ _id: id, userId: req.user.id })
                            .then((category) => {
                                return res.json(category)
                            })
                            .catch((error) => {
                                return res.json(error)
                            })
                    })
                    .catch((error) => {
                        return res.json(error)
                    })
            } else {
                Category.findOneAndDelete({ _id: id, userId: req.user.id })
                    .then((category) => {
                        return res.json(category)
                    })
                    .catch((error) => {
                        return res.json(error)
                    })
            }
        })

}

CategoryController.softDelete = (req, res) => {
    const id = req.params.id
    const userid = req.user.id
    Expense.find({ categoryId: id, userId: userid })
        .then((expense) => {
            if (expense.length > 0) {
                Expense.delete({ categoryId: id }, (function (error, result) {
                    if (result) {
                        Category.deleteById({ _id: id })
                            .then((category) => {
                                return res.json(category)
                            })
                            .catch((error) => {
                                return res.json(error)
                            })
                    } else {
                        return res.json(error)
                    }
                }))
            } else {
                Category.deleteById({ _id: id })
                    .then((category) => {
                        return res.json(category)
                    })
                    .catch((error) => {
                        return res.json(error)
                    })
            }
        })
}

CategoryController.restore = (req, res) => {
    const id = req.params.id
    Category.restore({ _id: id, userId: req.user.id })
        .then((category) => {
            Expense.restore({ categoryId: id }, (function (error, result) {
                if (result) {
                    console.log('result', result)
                } else {
                    return res.json(error)
                }
            }))
            return res.json(expense)
        })
        .catch((error) => {
            return res.json(error)
        })
}

module.exports = CategoryController