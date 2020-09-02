const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    new_order:{
        type:String,
        value:[]
        
    },
    total_price:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    address1:{
        type:String,
        required:true
    },
    address2 :{
        type:String,
        required:true
    },
    user_name: {
        type:String
    },
    mobile_number:{
        type:String,
        required:true
    }
})

module.exports= Order = mongoose.model('order',OrderSchema);