const Cart=require('../model/cartSchema')

function runUpdate(condition,updateData){
    return new Promise((resolve,reject)=>{
        Cart.findOneAndUpdate(condition,updateData,{upsert:true})
        .then(result=>resolve())
        .catch(err=>reject(err))
    })
}

exports.addToCart=async (req,res)=>{
    try {
        const alreadyExist=await Cart.findOne({user:req.user._id})
        if(alreadyExist){
            let promiseArray=[];
            req.body.cartItems.forEach(cartItem=>{
                const isItemAdded=alreadyExist.cartItems.find(c=>c.product==cartItem.product)
                let condition,update
                if(isItemAdded){
                    condition={user:req.user._id,"cartItems.product":cartItem.product}
                    update={
                        "$set":{
                            "cartItems.$":cartItem
                        }
                    }
            
                }
                else{
                    condition={user:req.user._id}
                    update={
                        "$push":{
                            "cartItems":cartItem
                        }
                    }

                }
                promiseArray.push(runUpdate(condition,update))
            })
            Promise.all(promiseArray)
            .then(response=>res.status(201).json({response}))
            .catch(error=>res.status(400).json(error))
            
        }
        else{

            const cart=new Cart({
                user:req.user._id,
                cartItems:req.body.cartItems
            })
            const savedcart=await cart.save()
            if(savedcart){
                return res.status(201).json({savedcart})
            }
        }
        
    } catch (error) {
        return res.status(501).json({error})
    }
  
}

exports.deleteCartItem=async (req,res)=>{
    try {
        const {product}=req.body;
        const removed= await Cart.updateOne({user:req.user._id},{
            $pull:{
                cartItems:{product:product}
            }
        })
        if(removed){
            return res.status(201).json({removed})
        }
    } catch (error) {
        return res.status(501).json({error})
    }
  
}



exports.getCartItems=async (req,res)=>{
    try {
        const userCart=await Cart.findOne({user:req.user._id}).populate('cartItems.product','_id name offer price productImage');
        if(userCart){
            let items=[];
            userCart.cartItems.map(cartItem=>{
                items.push(
                    {
                        _id:cartItem.product._id.toString(),
                        name:cartItem.product.name,
                        image:cartItem.product.productImage[0].img,
                        price:cartItem.product.price,
                        offer:cartItem.product.offer,
                        qty:cartItem.quantity
                    }
                )
            })
            return res.status(201).json({items})
        }
        return res.status(400).json({error:"cart not exist"})
    } catch (error) {
        console.log(error)
        return res.status(501).json({error})
    }
   
}