const express = require('express')
const cors = require('cors')

const router = require('./config/routes')

const app = express()
const port = 3001

const configureDB = require('./config/database')
configureDB()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/', router)

app.listen(port, function () {
    console.log('listening on port', port)
})