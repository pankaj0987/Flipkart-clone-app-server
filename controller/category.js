const category=require('../model/categories')


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
            children:createCategoryList(categories,cate.id)
        });
    }
    return categoryList
}


exports.addCategory=async (req,res)=>{
    try {
        const categoryObj={
            name:req.body.name,
            type:req.body.type
        }
        if(req.body.parentId){
            categoryObj.parentId=req.body.parentId
        }
        const cat=new category(categoryObj);
        const categor=await cat.save();
        return res.status(201).json({categor})
    } catch (error) {
        res.status(501).json({error})
    }
  
}

exports.getCategory=async (req,res)=>{
    try {
        const categories=await category.find({});

        if(categories){
            const categorylist=createCategoryList(categories)

            return res.status(200).json({categorylist})
        }else{
            return res.status(401).json({error:"failed to fetch"})
        }

    } catch (error) {
        return res.status(501).json({error:"something went wrong"})
    }
   

}

exports.updateCategory=async (req,res)=>{
    try {
        const {categories}=req.body
        let newcategoriesList=[]
        if(Array.isArray(categories)){
            for(let i=0;i<categories.length;i++){
                const categoryObj={
                    name:categories[i].name,
                }
                if(categories[i].parentId){
                    categoryObj.parentId=categories[i].parentId
                }
                if(categories[i].type){
                    categoryObj.type=categories[i].type
                }
                const updatedCategories=await category.findOneAndUpdate({_id:categories[i]._id},categoryObj,{new:true})
                newcategoriesList.push(updatedCategories)
            }
            return res.status(201).json({categories:newcategoriesList})
        }

    } catch (error) {
        res.status(501).json({error})
    }
  
}