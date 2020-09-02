const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    const ProductSchema = new Schema({
        product_name :{
            type:String,
            required:true
           
        },
        product_image:{
            type:String,
            required:true
            
        },
        product_category:{
            type:String,
            required:true
            
        },
        product_price:{
            type:Number,
            required:true
           
        },
        product_quantity:{
            type:Number,
            required:true
            
        },
        product_discription:{
            type:String,
            required:true
            
        }
    })


module.exports = Product = mongoose.model('product', ProductSchema);