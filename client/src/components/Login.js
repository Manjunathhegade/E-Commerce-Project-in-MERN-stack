import React from 'react';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';



class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id:'',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/users/login', user)
            .then(result => {
                localStorage.setItem('usertoken',result.data)
                const token = localStorage.usertoken;
                const decoded = jwt_decode(token)
                this.setState({
                    id: decoded._id
                })
                if (result) {
                    this.props.history.push(`/AllCategory`)
                }
            })
            .catch(err=>{
                console.log(err);
                alert("User not Registered yet...")
            })
            

    }

    render() {
        return (
            <form style={{marginLeft:400,marginTop:100}} noValidate autoComplete="off">
                <div>
                <h2>LogIn Here</h2><br/>
                    <TextField
                        type="email"
                        name="email"
                        value={this.state.email}
                        id="outlined-required"
                        onChange={this.handleChange}
                        label="Email"
                        variant="outlined"
                    />
                    <br/><br/>
                    <TextField
                        id="outlined-password-input"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={this.onSubmit}  style={{width:230}}>
                        LOGIN
                    </Button>
                </div>
            </form>
        );
    }
}


export default Login;