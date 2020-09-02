const express = require('express');
const order = express.Router();
const cors = require('cors');

const Orders = require('../models/Orders');

order.use(cors())

order.post('/:user_id', async (req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userID = req.params.user_id;
        const newOrder = {
            user_id : userID,
            new_order : req.body.allItem,
            total_price : req.body.total_price,
            address1 : req.body.address1,
            addrrss2 : req.body.addrrss2,
            user_name: req.body.user_name,
            mobile_number: req.body.mobile_number
        }
     const result = await Orders.insertMany(newOrder, { session });
     await Cart.deleteMany({user_id : userID}, { session })
     
     await session.commitTransaction();
     session.endSession();
     res.status(201).json(result);
    }catch(err){



        
        await session.abortTransaction();
        session.endSession();
        res.status(500).json(err);

    }
})

order.get('/get/:user_id', (req,res)=>{
    userID : req.params.user_id;
    Orders.find({
        user_id : userId
    })
    .then(result =>{
        if(result){
            res.status(200).send(result)
        }
    })
    .catch(err=>{
        res.status(404).send(err)
    })
})


module.exports = order