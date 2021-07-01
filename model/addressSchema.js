const mongoose=require('mongoose');


const addressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'USER',
        required:true,
        unique:true
    },
    userAddress:[
        {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        contact:{
            type:Number,
            required:true,
        },
        pincode:{
            type:String,
            required:true,
        },
        locality:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        landmark:{
            type:String,
        },
        alternatenumber:{
            type:Number,
        },
        addresstype:{
            type:String,
            required:true,
            enum:["home","work"],
            default:"home"
        }
    }
],
 
},{timestamps:true})




const address=mongoose.model('ADDRESS',addressSchema);

module.exports=address;