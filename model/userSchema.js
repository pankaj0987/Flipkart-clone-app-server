const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },
    role:{
       type:String,
       enum:['user','admin'],
       default:'user' 
    },
    profilepic:{type:String}
},{timestamps:true})


    



const User=mongoose.model('USER',userSchema);

module.exports=User;