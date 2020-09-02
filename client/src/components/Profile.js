import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Button from '@material-ui/core/Button';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fullname: '',
            email: '',
            date: '',
            _id:'',
            address1: '',
            address2: '',
            phonenumber: '',
            pincode: '',
            state: ''

        };
        this.onClick=this.onClick.bind(this)
        this.onClicked=this.onClicked.bind(this)
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
        axios.get(`http://localhost:5000/address/${decoded._id}`)
            .then(result => this.setState({ ...result.data }))
            .catch(error => console.log(error))
    }

    onClick(e){
        e.preventDefault();
        this.props.history.push(`/shippingaddress/${this.state._id}`)
    }
    onClicked(e){
        e.preventDefault();
        this.props.history.push(`/AddAddress`)
    }

    render() {
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
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h2 className="text-center">Shipping Address</h2>
                </div>
                <table className="table col-md-6 max-auto">
                    <tbody>
                        <tr>
                            <th>id</th>
                            <td>{this.state._id}</td>
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
                            <th>Mobile Number</th>
                            <td>{this.state.phonenumber}</td>
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
                <br /><br />
                <Button onClick={this.onClick} variant="contained" color="primary">
                    EDIT
                    </Button>
            </div>

        )
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-6 max-auto">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{this.state.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{this.state.fullname}</td>
                            </tr>
                            <tr>
                                <th>Email ID</th>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <th>Account Created in </th>
                                <td>{this.state.date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {this.state.address1 ? editAddres : addAddress}

            </div>

        );

    }

}



export default Profile