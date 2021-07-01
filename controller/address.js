const Address=require('../model/addressSchema')

exports.addAddress=async (req,res)=>{
    try {
        const {address}=req.body;
        const addrCreated= await Address.findOneAndUpdate({user:req.user._id},{
            "$push":{
                "userAddress":address
            }
        },{new:true,upsert:true})
        if(addrCreated){
            return res.status(201).json({addrCreated})
        }
    } catch (error) {
        return res.status(501).json({error})
    }
  
}

exports.getAddress=async (req,res)=>{
    try {
        const address= await Address.findOne({user:req.user._id})
        if(address){
            return res.status(201).json({address})
        }
    } catch (error) {
        return res.status(501).json({error})
    }
  
}