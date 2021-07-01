const mongoose=require('mongoose');


const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    category:[
        {type:mongoose.Schema.Types.ObjectId,ref:'CATEGORY'}
],
 
},{timestamps:true})




const brand=mongoose.model('BRAND',brandSchema);

module.exports=brand;