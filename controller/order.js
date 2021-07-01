const Cart = require('../model/cartSchema');
const Order=require('../model/orderSchema');

exports.addOrder=async(req,res)=>{
    try {
        const result=await Cart.deleteOne({user:req.user._id})
        if(result){
            req.body.user=req.user._id
            req.body.orderstatus=[
                {
                    type:"ordered",
                    date:new Date(),
                    isCompleted:true,
                },
                {
                    type:"packed",
                    isCompleted:false
                },
                {
                    type:"shipped",
                    isCompleted:false
                },
                {
                    type:"delivered",
                    isCompleted:false
                }
                
            ]
            const order=new Order(req.body);
            const saved=await order.save();
            if(saved){
                return res.status(201).json({order:saved})
            }
            return res.status(401).json({error:"order save unsuccessfull"})
        }
        return res.status(401).json({error:"something went wrong"})
       
    } catch (error) {
        res.status(501).json({error})
    }
    
}

exports.getOrders=async(req,res)=>{
    try {
        const order=await Order.find({user:req.user._id})
        .select("_id paymentstatus paymenttype orderstatus items")
        .populate("items.productId","_id name productImage")
        if(order){
            return res.status(201).json({order})
        }
        return res.status(400).json({error:"not found"})
       
    } catch (error) {
        res.status(501).json({error})
    }
    
}