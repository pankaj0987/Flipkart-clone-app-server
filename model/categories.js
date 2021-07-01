const mongoose=require('mongoose');


const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    type:{
        type:String
    },
    parentId:{
        type:String
    }
 
},{timestamps:true})


    



const category=mongoose.model('CATEGORY',categorySchema);

module.exports=category;