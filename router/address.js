const express=require('express');
const { requireSignin, isUserLogin } = require('../commonMiddleware/auth');
const { addAddress, getAddress } = require('../controller/address');
const router=express.Router();




router.post('/address/create',requireSignin,isUserLogin,addAddress);
router.post('/address/getUserAddress',requireSignin,isUserLogin,getAddress);

module.exports=router