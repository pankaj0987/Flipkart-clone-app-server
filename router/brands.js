const express=require('express');
const { requireSignin, isAdminLogin } = require('../commonMiddleware/auth');
const { addBrand,getBrands } = require('../controller/brandcontroller');
const router=express.Router();




router.post('/brands/addBrand',requireSignin,isAdminLogin,addBrand);

router.get('/brands/getBrands',getBrands );

module.exports=router