import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


class ShippingAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            address1:'',
            address2:'',
            phonenumber:'',
            pincode:'',
            state:''
        };
        this.AddressId = this.props.match.params.id;
        this.handleChange = this.handleChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
   
componentDidMount(){
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token)
            this.setState({
                user_id: decoded._id,
            })

            axios.get(`http://localhost:5000/address/get/${this.AddressId}`)
            .then(res => this.setState({ ...res.data }))
            .catch(err => console.log(err));
    
}



onEdit(e){
    e.preventDefault();
    const newAddress = {
        user_id:this.state.user_id,
        address1:this.state.address1,
        address2:this.state.address2,
        phonenumber:this.state.phonenumber,
        pincode:this.state.pincode,
        state:this.state.state
    }
    axios.post(`http://localhost:5000/address/editAddress/${this.AddressId}`, newAddress)
    .then(res => console.log(res.data));
        alert("Shipping Address Updated Successfully");

        this.setState({
            user_id:'',
            address1:'',
            address2:'',
            phonenumber:'',
            pincode:'',
            state:''
        })
}

    handleChange(e) {
        const statename = e.target.name;
        this.setState({ [statename]: e.target.value })
    }
    render() {
        return (<form style={{ marginLeft: 400, marginTop: 60 }} noValidate autoComplete="off">
            <div><h2>Edit Address</h2><br />
                <TextField
                    type="text"
                    name="address1"
                    value={this.state.address1}
                    id="outlined-required"
                    onChange={this.handleChange}
                    label="Address Line 1"
                    variant="outlined"
                />
                <br /><br />
                <TextField
                    type="text"
                    name="address2"
                    value={this.state.address2}
                    id="outlined-required"
                    onChange={this.handleChange}
                    label="Address Line 2"
                    variant="outlined"
                />
                <br /><br />
                <TextField
                    id="outlined-phonenumber-input"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.handleChange}
                    label="Mobile Number"
                    type="number"
                    autoComplete="current-phonenumber"
                    variant="outlined"
                />
                <br /><br />
                <TextField
                    id="outlined-pincode-input"
                    name="pincode"
                    value={this.state.pincode}
                    onChange={this.handleChange}
                    label="City Pincode"
                    type="number"
                    autoComplete="current-pincode"
                    variant="outlined"
                />
                <br /><br />
                <TextField
                id="outlined-state-input"
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
                label="State"
                type="text"
                autoComplete="current-state"
                variant="outlined"
            />
            <br /><br />
                <Button variant="contained" color="primary" onClick={this.onEdit} style={{ width: 230 }}>
                    Update
            </Button>
            <br /><br />
            </div>
        </form>
        );
    }
}


export default withRouter(ShippingAddress);