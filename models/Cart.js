const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id:{
        type:String,
      
    },
    item_id:{
        type:String,
        
    },
    item_name:{
        type:String,
        
    },
    item_image:{
        type:String,
      
    },
    item_price:{
        type:Number,
        
    },
    item_quantity:{
        type:Number,
        
    }
})

module.exports = Cart = mongoose.model('cart',CartSchema)