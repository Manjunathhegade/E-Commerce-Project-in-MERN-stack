import React from 'react';
import CategoryNav from './CategoryNav';
import Footer from './Footer'
import axios from 'axios';
import './product.css';
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class AllCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fullname: '',
            allProducts: [],
            user_id:'',
            viewproduct: { isView: false, id: null }
        };
        this.onView = this.onView.bind(this);
        this.onSendCart = this.onSendCart.bind(this);
    }
    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded._id
            
            })
          
            axios.get(`http://localhost:5000/product`)
            .then(result => this.setState({ allProducts: result.data }))
            .catch(error => console.log(error))
             console.log(this.state.allProducts)
    }
    onView(Id) {
        this.setState({ viewproduct: { isView: true, id: Id } })
        console.log(this.state._id);

    }

    onSendCart(id,name,img,price){
       const cartDate={
           user_id:this.state.user_id,
           item_id:id,
           item_name:name,
           item_image:img,
           item_price:price,
           item_quantity:1
       }
       axios.post(`http://localhost:5000/cart/add_item`, cartDate)
       .then(res => {console.log(res.data);
           alert("Product added to cart")
           this.props.history.push(`/cart`)})
       .catch(err => {
               console.log(err)
               alert("This Product is already in Cart");
           });

    }
    render() {
        if (this.state.viewproduct.isView) {
            return <Redirect to={`/viewproduct/${this.state.viewproduct.id}`} />
        }
        return (
            <div>
                <CategoryNav />
                <hr></hr>
                <h3>All Categories / Scotch / Rum / Vodka / Whisky</h3>
                <hr></hr>
                <div className="container">
                    <div className="row" style={{ margin: 30 }}>
                        {this.state.allProducts.map((row) => (
                            <div className="card">
                                <br></br>
                                <div className="p-1">
                                    <div className="col-md-3 col-sm-6">
                                        <div className="product-grid" style={{ width: 250 }}>
                                            <div className="img-part" style={{ width: 250, height: 250 }}>
                                                <div className="col-md-12 col-sm-12 colxs-12 img-section" >
                                                    <img src={`http://localhost:5000/${row.product_image}`} style={{ width: 200, height: 210, margin: 20 }} />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 image-title">
                                                <h4>{row.product_name}</h4>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 image-description">
                                                <p><b>PRICE : </b>{row.product_price}  &#8377;</p>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 image-description">
                                                <p><b>Quantity : </b> {row.product_quantity}</p>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <a onClick={() => this.onView(row._id)} style={{ width: 100 }} className="btn btn-success add-cart-btn">VIEW PRODUCT</a>&emsp;
                                            <a onClick={()=>this.onSendCart(row._id,row.product_name,row.product_image,row.product_price)} style={{ width: 100 }} className="btn btn-success add-cart-btn">ADD TO CART</a>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
                <br></br>
                <Footer />
            </div>
        );
    }
}



export default AllCategory;