import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address1: '',
            address2: '',
            phonenumber: '',
            pincode: '',
            state: '',
            allItems: [],
            fullname: '',
            email: '',
            isContinue:''
        };
        this.onDelete = this.onDelete.bind(this);
        this.onClicked = this.onClicked.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
        this.onIncrease = this.onIncrease.bind(this);
        this.onContinue = this.onContinue.bind(this);
        this.onCheckout = this.onCheckout.bind(this);
        
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded._id,
            fullname: decoded.fullname,
            email: decoded.email,
            date: decoded.date
        })

        axios.get(`http://localhost:5000/cart/userItem/${decoded._id}`)
            .then(result => this.setState({ allItems: result.data }))
            .catch(error => console.log(error))

        axios.get(`http://localhost:5000/address/${decoded._id}`)
            .then(result => this.setState({ ...result.data }))
            .catch(error => console.log(error))

        const quantity = this.state.allItems.map((row) => row.item_quantity)
    }

    onDelete(cart_id) {
        axios.delete(`http://localhost:5000/cart/${cart_id}`)
            .then(res => this.componentDidMount())
            .catch(err => console.log(err));
    }

    onClicked(e) {
        e.preventDefault();
        this.props.history.push(`/AddAddress`)
    }

    onDecrease(id, quantity) {
        if (quantity <= 1) {
            alert("Product Quantity Cannot be less then 1");
        }
        else {
            axios.post(`http://localhost:5000/cart/decreaseItem/${id}/${quantity}`)
                .then(result => {
                    this.componentDidMount()
                })
                .catch(err => { console.log(err); alert("Cannot Decrease Product Quantity") })
        }
    }
    onIncrease(id, quantity) {
        if (quantity >= 4) {
            alert("Product Quantity Cannot be Greater then 4");
        }
        else {
            axios.post(`http://localhost:5000/cart/increaseItem/${id}/${quantity}`)
                .then(result => {
                    this.componentDidMount()
                })
                .catch(err => { console.log(err); alert("Cannot Increase Product Quantity") })
        }
    }
  
    onContinue(){
        this.setState({isContinue : true})
    }
   
    onCheckout(){
        if(this.state.address1 == ''){
            alert("Please Add Delivery Address");
        }else
        {
            alert("Order Placed");
        }
    }

    render() {

        if(this.state.isContinue){
            return <Redirect to={'/AllCategory'} />
        }

        const addAddress = (
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h2 className="text-center">Add Shipping Address</h2>
                    <br /><br />
                    <Button onClick={this.onClicked} variant="contained" color="primary">
                        ADD
                    </Button>
                </div>
            </div>
        )
        const editAddres = (
            <div className="jumbotron mt-5" >
                <div className="col-sm-8 mx-auto">
                    <h3 className="text-center">Product will be Deliver to</h3>
                </div><br></br>
                <table className="table col-md-6 max-auto">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{this.state.fullname}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th>Mobile Number</th>
                            <td>{this.state.phonenumber}</td>
                        </tr>
                        <tr>
                            <th>Address Line 1</th>
                            <td>{this.state.address1}</td>
                        </tr>
                        <tr>
                            <th>Address Line 2</th>
                            <td>{this.state.address2}</td>
                        </tr>
                        <tr>
                            <th>Pin Code </th>
                            <td>{this.state.pincode}</td>
                        </tr>
                        <tr>
                            <th>State</th>
                            <td>{this.state.state}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            
        )

        //calculating total price
        const price = this.state.allItems.map((data)=>data.item_price);
        const quality = this.state.allItems.map((data)=>data.item_quantity);
        var totalPrice = 0;
        for(var i=0;i<price.length;i++){
            totalPrice += price[i]* quality[i];
        } 
        console.log(totalPrice);

        return (
            
            <div>
                <div className="pb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                <div className="table-responsive">

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Total Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Remove</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {this.state.allItems.map((row) => (
                                            <tbody>
                                                <tr key={row._id}>
                                                    <th scope="row" className="border-0">
                                                        <div className="p-2">
                                                            <img src={`http://localhost:5000/${row.item_image}`} width="70" className="img-fluid rounded shadow-sm" />
                                                            <div className="ml-3 d-inline-block align-middle">
                                                                <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{row.item_name}</a></h5>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <td className="border-0 align-middle"><strong>&#8377; {row.item_price}</strong></td>
                                                    <td className="border-0 align-middle"><strong><button onClick={() => this.onDecrease(row._id, row.item_quantity)} style={{ width: 27 }}>-</button>  <input type="text" value={row.item_quantity} style={{ width: 30, textAlign: 'center' }} />  <button onClick={() => this.onIncrease(row._id, row.item_quantity)}>+</button> </strong></td>
                                                   
                                                    <td className="border-0 align-middle"><strong>&#8377; {row.item_price * row.item_quantity}</strong></td>
                                                    <td className="border-0 align-middle"><Button onClick={() => this.onDelete(row._id)} variant="contained" color="secondary">
                                                        Remove
                                                    </Button></td>
                                                </tr>
                                            </tbody>
                                        ))}

                                    </table>
                                </div>
                                <hr></hr>
                            </div>
                            
                        </div>
                        <div>{this.state.address1 ? editAddres : addAddress}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="pull-right" style={{ margin: 10 }}>
                        <div className="pull-right" style={{ margin: 5 }}>
                            Include Taxes : <b>0.00</b><br /><br />
                             Grand Total : <b> {totalPrice} &#8377;</b><br /><br />
                        </div>
                        <button style={{ width: 200 }} onClick={this.onCheckout} disabled={this.state.allItems.length ? false:true} className="btn btn-success pull-right">Checkout</button> &emsp;
                        <button onClick={this.onContinue} style={{ width: 200 }} className="btn btn-success pull-right">Continue Shopping</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cart;