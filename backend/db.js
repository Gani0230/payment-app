
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB connect succesfully")
}).catch(e =>{
    console.log(e)
})

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true, maxLength: 15},
    lastname: {type: String, required: true, maxLength: 15},
    email: {type: String, required: true, unique:true, lowercase:true},
    password: {type: String, required: true, unique:true, minLength:true},
})

const User = mongoose.model("User", userSchema)

module.exports = User 