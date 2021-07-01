const express=require('express');
const router=express.Router();
const Product=require('../../model/productSchema')
const Category=require('../../model/categories')
const Brand=require('../../model/brand')


function createCategoryList(categories,parentId=null){
    const categoryList=[];
    let category;
    if (parentId==null){
        category=categories.filter(cat=>cat.parentId===undefined)
    }else{
        category=categories.filter(cat=>cat.parentId===parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate.id,
            name:cate.name,
            parentId:cate.parentId,
            type:cate.type,
            children:createCategoryList(categories,cate.id)
        });
    }
    return categoryList
}

router.get('/admin/getInitialData',async (req,res)=>{

    try {
    const category=await Category.find({});
    const products=await Product.find({}).select("_id name price offer quantity size productImage description highlights reviews createdAt").populate({path:"category brand",select:"_id name"});
    const brands=await Brand.find({}).populate({path:"category",select:"_id name"})

    if(category && products && brands){
        return res.status(201).json({products,category:createCategoryList(category),brands})
    }
        
    } catch (error) {
        res.status(501).json({error})
    }
    
} );


module.exports=router