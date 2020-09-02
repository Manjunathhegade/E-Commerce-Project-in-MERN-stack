const express = require('express');
const cart = express.Router();
const cors = require('cors');

const Cart = require('../models/Cart');


cart.use(cors())

//adding cart items
cart.post('/add_item', (req, res) => {
    const cartData = {
        user_id: req.body.user_id,
        item_id: req.body.item_id,
        item_name: req.body.item_name,
        item_image: req.body.item_image,
        item_price: req.body.item_price,
        item_quantity: req.body.item_quantity

    }
    Cart.findOne({
        user_id: req.body.user_id
    })

        .then(user => {

            if (user) {
                Cart.findOne({
                    item_id: req.body.item_id, user_id: req.body.user_id
                })
                    .then(result => {

                        if (!result) {
                            Cart.create(cartData)
                                .then(result1 => {
                                    res.status(200).json({
                                        message: "Item added Successfully..."
                                    })
                                    //  console.log(result)
                                })
                                .catch(err => {
                                    res.send("Item Couldnot saved..")
                                })
                        }
                        else {
                            res.status(404).json({ message: "product already in cart" })
                        }
                    })
            } else {
                Cart.create(cartData)
                    .then(result1 => {
                        res.status(200).json({
                            message: "Item added Successfully..."
                        })
                        //  console.log(result)
                    })
                    .catch(err => {
                        res.send("Item Couldnot saved..")
                    })
            }
        })
})

//getting all cart items
cart.get('/', (req, res) => {
    Cart.find(function (err, scocthhub) {
        if (!scocthhub) {
            res.status(404).json({
                message: "Item dosenot exist"
            })
        } else {
            res.send(scocthhub);
        }
    })

})

//getting cart items with user id
cart.get('/userItem/:user_id', (req, res) => {
    let id = req.params.user_id;
    Cart.find({
        user_id: id
    })
        .then(result => {
            if (!result) {
                res.status(400).send("Couldnot find user ID")
            } else {
                res.json(result)
            }
        })
        .catch(err => {
            res.status(400).send("Couldnot find user ID")
        })

})

//delete cart item with id
cart.delete('/:id', (req, res) => {
    Cart.findById(req.params.id, function (err, item) {
        if (!item)
            res.status(404).send('item not found');
        else
            item.delete().then(result => {
                res.json('Item Deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete not posible");
                });
    });
})


//increase product with + button
cart.post('/increaseItem/:cartID/:quantity', (req, res) => {
    id = req.params.cartID;
    itemQuantity = req.params.quantity;
    Cart.updateOne({ _id: id }, { $set: { item_quantity: parseInt(itemQuantity) + 1 } })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

//decrease product with - button
cart.post('/decreaseItem/:cartID/:quantity', (req, res) => {
    id = req.params.cartID;
    itemQuantity = req.params.quantity;
    Cart.updateOne({ _id: id }, { $set: { item_quantity: parseInt(itemQuantity) - 1 } })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

module.exports = cart