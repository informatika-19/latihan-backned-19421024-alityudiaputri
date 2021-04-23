const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //username: String
    UserName: {
    default: '',
    type: String
    },
    Password: {
    default: '',
    type: String
    },
    NamaLengkap: {
     default: '',
    type: String
    },
    Alamat: {
    default: '',
    type: String
    }
})

module.exports = mongoose.model('user', userSchema)