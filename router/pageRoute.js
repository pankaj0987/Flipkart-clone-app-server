const express=require('express');
const { requireSignin, isAdminLogin, upload } = require('../commonMiddleware/auth');

const router=express.Router();
const { addPage, getPage } = require('../controller/page');


router.post('/page/addPage',requireSignin,isAdminLogin,upload.fields([
  {name:"banners"},
  {name:"products"}
]),addPage);

router.get('/page/:brand/:type',getPage)


module.exports=router


