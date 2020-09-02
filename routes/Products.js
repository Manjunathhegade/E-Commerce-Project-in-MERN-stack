const express = require('express');
const products = express.Router();
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'./uploads/')
    },
    filename:function(req, file, cb){
        cb(null,file.originalname);
    }
})

upload = multer({storage:storage})

const Product = require('../models/Products')

products.use(cors())



//adding products
products.post('/addProduct',upload.single('product_image'),(req,res,next)=>{
      const productData = {
        product_name :req.body.product_name,
        product_image:req.file.path,
        product_category:req.body.product_category,
        product_price:req.body.product_price,
        product_quantity:req.body.product_quantity,
        product_discription:req.body.product_discription
    }
    Product.create(productData) 
    .then(result=>{
        res.status(200).json({
            message:"Product saved successfully"
        })
    })
    .catch(err=>res.status(404).json({message:"Product couldnot saved"}))
})

//getting all products
products.get('/',(req,res,next)=>{
    Product.find(function(err,result){
        if(!result){
            res.status(404).json({message:"couldnot get all Products"})
        }else{
            res.status(200).send(result)
        }
    })
})

//getting product with category
products.get('/:category',(req,res,next)=>{
    let productCategory = req.params.category;
    Product.find({
        product_category:productCategory
    })
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(400).json({
            message:"Category Not found"
        })
    })
})

//getting product with id
products.get('/getwithid/:id',(req,res,next)=>{
    let id = req.params.id;
    Product.findById({
        _id:id
    })
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(400).json({
            message:"Product Not found"
        })
    })
})

//delete products with id
products.delete('/:id',(req,res)=>{
    Product.findById(req.params.id, function (err, product) {
        if (!product)
            res.status(404).send('Product not found');
        else
             product.delete().then(result => {
                res.json('Product Deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete not posible");
                });
    });
})

module.exports = products