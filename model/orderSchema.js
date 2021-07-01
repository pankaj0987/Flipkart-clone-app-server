const mongoose=require('mongoose');


const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER",
        required:true,
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ADDRESS',
        required:true,
    },
    totalamount:{
        type:Number,
        required:true,
        trim:true,
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"PRODUCT"
            },
            payablePrice:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
       
    ],
    paymentstatus:{
        type:String,
        enum:['pending','completed','cancelled','refund'],
        required:true
    },
    paymenttype:{
       type:String,
       enum:['COD','card'],
       required:true 
    },
    orderstatus:[
        {
            type:{
                type:String,
                enum:["ordered","packed","shipped","delivered"],
                default:"ordered"
            },
            date:{
                type:Date
            },
            isCompleted:{
                type:Boolean,
                default:false,
            }
        }
    ]
},{timestamps:true})

const Orders=mongoose.model('ORDER',orderSchema);

module.exports=Orders;