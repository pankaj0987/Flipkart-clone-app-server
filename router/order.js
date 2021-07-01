const express=require('express');
const { requireSignin, isUserLogin } = require('../commonMiddleware/auth');
const { addOrder,getOrders } = require('../controller/order');
const router=express.Router();




router.post('/orders/addOrder',requireSignin, isUserLogin,addOrder);

router.post('/orders/getOrder',requireSignin, isUserLogin, getOrders);

module.exports=router