const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    timestamp: {
        type: Number
    }
}, {
    timestamps: false,
    versionKey: false
})


module.exports = mongoose.model('visitas', UserScheme)
