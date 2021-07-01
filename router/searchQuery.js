const express=require('express');
const {searchProduct}=require('../controller/searchProduct')
const router=express.Router();




router.post('/searchproduct',searchProduct)


module.exports=router
