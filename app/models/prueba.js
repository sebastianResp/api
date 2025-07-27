const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
}, {
    timestamps: false,
    versionKey: false
})


module.exports = mongoose.model('prueba', UserScheme)
