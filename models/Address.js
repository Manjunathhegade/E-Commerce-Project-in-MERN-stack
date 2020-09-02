const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    const AddressSchema = new Schema({
        user_id :{
            type:String,
            required:true
        },
        address1:{
            type:String,
            required:true
        },
        address2:{
            type:String
        },
        phonenumber:{
            type:Number,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        },
        state:{
            type:String,
            required:true
        }
    })


module.exports = Address = mongoose.model('address', AddressSchema);