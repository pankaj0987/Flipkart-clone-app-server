const Page=require('../model/pageSchema')

exports.addPage=async (req,res)=>{
    const {banners,products}=req.files;
    if(banners && banners.length>0){
        req.body.banners=banners.map((banner,index)=>(
            {
            img:`/public/${banner.filename}`,
            navigateTo:`/banner?brand=${req.body.brand}&product=${req.body.products[index]}`
            }
        ));
    }
    if(products && products.length>0){
        req.body.products=products.map((product,index)=>(
            {
            img:`/public/${product.filename}`,
            navigateTo:`/banner?brand=${req.body.brand}&product=${req.body.product[index]}`
            }
        ));
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