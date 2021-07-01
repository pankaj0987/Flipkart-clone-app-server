const express=require('express');
const { requireSignin, isUserLogin } = require('../commonMiddleware/auth');
const { addToCart, getCartItems, deleteCartItem } = require('../controller/cart');
const router=express.Router();




router.post('/cart/addToCart',requireSignin,isUserLogin,addToCart);
router.post('/cart/delete',requireSignin,isUserLogin,deleteCartItem);

router.post('/cart/getCartItems',requireSignin,isUserLogin,getCartItems);

module.exports=router