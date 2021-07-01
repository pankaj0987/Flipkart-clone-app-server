const mongoose=require('mongoose');


const pageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true
    },
    banners:[
        {
            img:{type:String},
            navigateTo:{type:String},
            name:{type:String}
        }
    ],
    products:[
        {
            img:{type:String},
            navigateTo:{type:String},
            name:{type:String}
        }
    ],
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BRAND",
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CATEGORY",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER",
        required:true
    }
 
},{timestamps:true})


    



const Page=mongoose.model('PAGE',pageSchema);

module.exports=Page;