const Page=require('../model/pageSchema')
const cloudinary=require('../utils/cloudnary')
const fs = require('fs');

exports.addPage=async (req,res)=>{
    const {banners,products}=req.files;
    const uploaded=async(path)=>await cloudinary.uploads(path,'flipkart_clone')
    if(banners && banners.length>0){
        req.body.banners=[]
        let i=0;
        for(const banner of banners){
            const {path}=banner
            const newPath=await uploaded(path)
            fs.unlinkSync(path)
            req.body.banners.push({img:`${newPath.url}`,navigateTo:`/banner?brand=${req.body.brand}&product=${req.body.products[i]}`})
            i++
            }
    }
    if(products && products.length>0){
        // req.body.products=products.forEach((product,index)=>(
        //     {
        //     img:`/public/${product.filename}`,
        //     navigateTo:`/banner?brand=${req.body.brand}&product=${req.body.product[index]}`
        //     }
        // ));
        }
    req.body.createdBy=req.user._id;

    delete req.body.products

    try {
        const page=new Page(req.body);
        const pagesaved=await page.save();
        if(pagesaved){
            res.status(200).json({body:req.body})
        }
    } catch (error) {
        res.status(501).json({error})
    }
    
  
}

exports.getPage=async (req,res)=>{
    try {
        const {brand,type}=req.params;
        if(type==="page"){
            const pageinfo=await Page.findOne({brand});
            if(pageinfo){
                return res.status(200).json({page:pageinfo})
            }
        }
        return res.status(400).json({error:"page not found"})
        
    } catch (error) {
        return res.status(400).json({error})
    }
    
}