const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users')

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        date: today,
        role: 0
    }
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.status(200).json({
                                message: user.email + " " + "Registerd"
                            })
                        })
                        .catch(err => {
                            res.json({
                                message: "error" + err
                            })
                        })
                })
            }
            else {
                res.json({
                    message: "User already exists..."
                })
            }
        })
        .catch(err => {
            message: "error" + err
        })
})

//Login 

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                            const payload = {
                                _id: user._id,
                                fullname: user.fullname,
                                email: user.email,
                                date : user.date,
                                role : user.role
                            }
                            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.send(token)
                    } 
                else {
                        res.json({
                            error: "User password incorrect..! "
                        })
                    }
            }else{
                res.json({error:"user dosenot exist"})
            }
        })
        .catch(err=>{
            res.send("error"+err);
        })
})

//get all registered users
users.get('/',(req,res)=>{
    User.find(function(err,scocthhub){
        if(!scocthhub){
            res.send(err=>{
                message:"User dosenot exist"
            })
        }else{
            res.send(scocthhub);
        }
    })
 
})

users.get('/profile',(req,res)=>{
    const decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    User.findOne({
        _id:decoded._id
    })
    .then(user=>{
        if(user){
            res.send(user)
        }else{
            res.send("User not exist");
        }
    })
    .catch(err=>{
        res.send('error : '+err);
    })
})

module.exports = users