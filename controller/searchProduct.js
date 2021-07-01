const Product=require('../model/productSchema')

exports.searchProduct=async (req,res)=>{
    try {
        const {query}=req.body;
        const products=await Product.find({}).populate({path:"category brand",select:"_id name"})
        let items=[]
        if(query.length>0){
         
            products.forEach(product=>{
                const name=product.name.toLowerCase();
                const searchquery=query.toLowerCase();
                let n=name.search(searchquery)
                if(n>=0){
                    items.push(product)
                }
            })
            return res.status(201).json({items})
        }
        return res.status(201).json({items})
    } catch (error) {
        return res.status(501).json({error})
    }
  
}