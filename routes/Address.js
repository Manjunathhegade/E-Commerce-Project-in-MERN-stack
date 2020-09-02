const express = require('express');
const address = express.Router();
const cors = require('cors');

const Address = require('../models/Address');

address.use(cors())

//adding address
address.post('/add_address', (req, res) => {
    const addressData = {
        user_id: req.body.user_id,
        address1: req.body.address1,
        address2: req.body.address2,
        phonenumber: req.body.phonenumber,
        pincode: req.body.pincode,
        state: req.body.state
    }
    Address.findOne({
        user_id: req.body.user_id
    })
        .then(result => {
            if (!result) {
                User.findOne({
                    _id: req.body.user_id
                })
                    .then(add => {
                        if (add) {
                            Address.create(addressData)
                                .then(result => {
                                    res.status(200).json({
                                        message: "Address added Successfully..."
                                    })
                                })
                                .catch(err => {
                                    res.send("address Couldnot saved..")
                                })
                        }
                    })
                    .catch(err => {
                        res.status(404).send("User doesnot exists..")
                    })

            } else {
                res.send("Connot add multiple address")
            }

        })

})

//getting all address fields
address.get('/', (req, res) => {
    Address.find(function (err, scocthhub) {
        if (!scocthhub) {
            res.send(err => {
                message: "Address dosenot exist"
            })
        } else {
            res.send(scocthhub);
        }
    })

})

//getting address with user id
address.get('/:user_id', (req, res) => {
    let id = req.params.user_id;
    Address.findOne({
        user_id: id
    })
        .then(result => {
            if (result) {
                res.json(result)
            }


        })
        .catch(err => {
            res.status(400).send("Couldnot find user ID")
        })

})

//get address with address id
address.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Address.findOne({
        _id: id
    })
        .then(result => {
            if (result) {
                res.json(result)
            }


        })
        .catch(err => {
            res.status(400).send("Couldnot find Address ID")
        })

})


//edit address
address.post('/editAddress/:id', (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    Object.keys(req.body).forEach((ops) => {
        updateOps[ops] = req.body[ops];
    });
    Address.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});

module.exports = address