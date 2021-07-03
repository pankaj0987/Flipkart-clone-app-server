const express=require('express');
const { requireSignin, isAdminLogin } = require('../commonMiddleware/auth');
const multer=require('multer')
const shortid=require('shortid')
const router=express.Router();
const path=require('path');
const { addProduct, getProduct,deleteProduct,updateProduct,getProductByName, getProductById } = require('../controller/products');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'Uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "." + file.originalname)
    }
  })


   
const upload = multer({
  storage: storage,
  fileFilter:(req,file,cb)=>{
    if(!file.mimetype.match(/jpeg|png|png|gif$i/)) {
      cb(new Error("file is not supported"),false)
      return
    }
    cb(null,true)
  } 

  })


router.post('/product/addProduct',requireSignin,isAdminLogin,upload.array('productImage'),addProduct);
router.post('/product/updateProduct',requireSignin,isAdminLogin,updateProduct);
router.post('/product/deleteProduct',requireSignin,isAdminLogin,deleteProduct);
router.get('/product/getProducts',getProduct );
router.get('/product/getProduct/:_id',getProductById)
router.get('/product/:name',getProductByName );

module.exports=router