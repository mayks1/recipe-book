const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Моля въведете потребителско име.'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Моля въведете валиден имейл.'],
        unique: true,
    },

    password:  {
        type: String,
        required: [true, 'Моля въведете парола.'],
    },

})

UserSchema.pre('save', function (next) {

    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })

})

module.exports = mongoose.model('User', UserSchema)