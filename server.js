const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT  = 5000;

app.use(bodyParser.json());
app.use(cors());

//make image folder static
app.use('/uploads',express.static('uploads'));

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

//Local database connection
mongoose.connect('mongodb://localhost:27017/scotchhub',{useNewUrlParser:true})
.then(()=>console.log("MongoDB connected successfully" ))
.catch(err=>console.log(err))

const Users = require('./routes/Users')
const Address = require('./routes/Address')
const Product = require('./routes/Products')
const Cart = require('./routes/Cart')
const Order = require('./routes/Orders')


app.use('/users',Users);
app.use('/address',Address);
app.use('/product',Product);
app.use('/cart',Cart);
app.use('/order',Order);

//listning ports
app.listen(PORT,function()
{
    console.log("Server is running on the PORT : " +PORT);
})
