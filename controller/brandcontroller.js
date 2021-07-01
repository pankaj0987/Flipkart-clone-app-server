const Brand=require('../model/brand.js')

exports.addBrand=async (req,res)=>{
    try {
        const {name,category}=req.body
      
        const brand=new Brand({name,category});
        const savedBrand=await brand.save();
        return res.status(201).json({savedBrand})
    } catch (error) {
        res.status(501).json({error})
    }
  
}

exports.getBrands=async (req,res)=>{
    try {
        const brands=await Brand.find({}).populate({path:"category",select:"_id name"})
        if(brands){
            return res.status(201).json({brands})
        }
    } catch (error) {
        res.status(501).json({error})
    }
  
}