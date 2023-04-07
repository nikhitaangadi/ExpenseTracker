const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/expenses-database', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log('err connecting to db', err)
        })
}
module.exports = configureDB