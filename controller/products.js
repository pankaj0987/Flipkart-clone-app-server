const Product = require('../model/productSchema');
const Brand=require('../model/brand')
const fs = require('fs');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        const { name, price, offer, quantity,brand, description, highlights, category } = req.body;

        let productImage = []
        if (req.files.length > 0) {
            productImage = req.files.map(file => {
                return { img: file.filename }
            })
        }
        let product
        if(req.body.size){
            product = new Product({
                name, price, offer, quantity, category,brand,size:req.body.size ,productImage, createdBy: req.user._id
            })

        }
        else{
            product = new Product({
                name, price, offer, quantity, category,brand, productImage, description, highlights, createdBy: req.user._id
            })
        }
        

        const savedprod = await product.save();
        if (savedprod) {
            return res.status(201).json({ savedprod })
        }
        return res.status(401).json({ error: "failed to add product" })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const finding = await Product.findOne({ _id: id })
        if (finding) {
            finding.productImage.forEach(img => {
                if (`${path.join(path.dirname(__dirname), 'Uploads')}/${img.img}`) {
                    fs.unlink(`${path.join(path.dirname(__dirname), 'Uploads')}/${img.img}`, function (err) {
                        if (err) throw err;
                    })
                }

            })
            const deleted = await Product.deleteOne({ _id: id })
            if (deleted) {
                return res.status(200).json({ deleted })
            }
        }


    } catch (error) {
        return res.status(501).json({ error })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { editedProduct} = req.body;
        const updated = await Product.findOneAndUpdate({ _id: editedProduct._id },editedProduct,{new:true})
        if(updated){
            return res.status(201).json({updated})
        }

    } catch (error) {
        return res.status(501).json({ error })
    }
}


exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) {
            return res.status(201).json({Electronics:products})
        }
        return res.status(401).json({ error: "failed top get product" })

    } catch (error) {
        return res.status(401).json({ error: "failed top get product" })
    }
}

exports.getProductByName = async (req, res) => {
    try {
        const {name}=req.params;
        const brand=await Brand.findOne({name}).select('_id')
        if(brand){
            const products=await Product.find({brand:brand._id}).populate({path:"category brand",select:"_id name"})
            if(products){
                return res.status(201).json({
                     products,
                     productsByPrice:{
                        under5k:products.filter(product=>product.price<5000),
                        under10k:products.filter(product=>product.price<10000 && product.price>5000),
                        under15k:products.filter(product=>product.price<15000 && product.price>10000),
                        under20k:products.filter(product=>product.price<20000 && product.price>15000),
                        under25k:products.filter(product=>product.price<25000 && product.price>20000),
                        under30k:products.filter(product=>product.price<30000 && product.price>25000),
                    }
                    })
            }
        }
        return res.status(501).json({ message: "not found" })
       
    } catch (error) {
        return res.status(401).json({ error: "failed top get product" })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const {_id}=req.params;
        if(_id){
            const product=await Product.findOne({_id}).populate({path:"category brand",select:"_id name"})
            if(product){
                return res.status(201).json({product})
            }
        }
        return res.status(501).json({ message: "not found" })
       
    } catch (error) {
        return res.status(401).json({ error: "failed top get product" })
    }
}
