const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
    offer:{
        type:Number,
    
    },
    quantity:{
        type:Number,
        required:true
    },
    size:[
        {type:String}
    ],
    description:
        {type:String}
    ,
    highlights:
        {type:String}
    ,
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'USER'},
            review:String
        }
    ],
    brand:{type:mongoose.Schema.Types.ObjectId,ref:'BRAND',required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'CATEGORY',required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'USER'},

    updatedAt:Date,

    productImage:[
        {img:{type:String}}
    ]
},{timestamps:true})


    



const Product=mongoose.model('PRODUCT',productSchema);

module.exports=Product;