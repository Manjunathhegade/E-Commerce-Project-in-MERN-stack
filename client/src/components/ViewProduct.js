import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';



class ViewProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product_image:'',
            product_price:'',
            product_name:'',
            product_quantity:'',
            product_discription:''
        };
        this.ProductId = this.props.match.params.id;
    }

    componentDidMount() {
        console.log(this.ProductId);
        axios.get(`http://localhost:5000/product/getwithid/${this.ProductId}`)
            .then(result => this.setState({...result.data }))
            .catch(error => console.log(error))
        
        
    }

    render() {
        return (
            <div>
                <div class="container">
                    <h1 class="my-4">{this.state.product_name}</h1>
                    <div class="row">
                        <div class="col-md-6">
                            <img class="img-fluid" src={`http://localhost:5000/${this.state.product_image}`} style={{height:440}}/>
                        </div>
                        <div class="col-md-6">
                            <h3 class="my-3">Product Description</h3>
                            <p>{this.state.product_discription}</p>
                            <h3 class="my-3">Product Details</h3>
                            {console.log(this.state.product_discription)}
                            <ul>
                                <li><b>Price : </b>&#8377; {this.state.product_price}</li>
                                <li><b>Quantity : </b> {this.state.product_quantity}</li>
                                <li><b>Type : </b> {this.state.product_category}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(ViewProduct);