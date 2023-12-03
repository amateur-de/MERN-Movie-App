const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/moviesDB')
.then(()=>console.log('Connection Established'))
.catch((e)=>console.log(e))

const userSchema = new mongoose.Schema({
    email:{
        type:String ,
        required:true
    } ,
    password:{
        type:String ,
        required:true
    }
})

const User = mongoose.model('User' , userSchema)

module.exports = User