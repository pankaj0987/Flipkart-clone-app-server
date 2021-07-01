const express=require('express');
const router=express.Router();
const {login,register,updateUser}=require('../controller/authController')



router.get('/',(req,res)=>{
    res.send("hello world")
});


router.post('/register',register);

router.post('/login',login);
router.post('/userUpdate',updateUser);

module.exports=router
