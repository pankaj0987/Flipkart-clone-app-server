const express=require('express');
const { requireSignin, isAdminLogin } = require('../commonMiddleware/auth');
const { addCategory, getCategory,updateCategory } = require('../controller/category');
const router=express.Router();




router.post('/category/addCategory',requireSignin,isAdminLogin,addCategory);
router.post('/category/updateCategory',updateCategory);
router.get('/category/getCategories',getCategory );

module.exports=router