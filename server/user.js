const  mongoose  = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name: String,
    position: String,
    email: String,
    phone: String,
})

mongoose.model("user", UserSchema)