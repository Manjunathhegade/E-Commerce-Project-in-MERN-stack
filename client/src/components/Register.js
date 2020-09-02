import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname:'',
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
            fullname:this.state.fullname,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/users/register', user)
            .then(result => {
                if (result) {
                    this.props.history.push('/login')
                }
               
            })
            .catch(err=>{
                console.log(err);
                alert("User Exist..Try with new")
            })

    }

    render() {
        return (
            <form style={{marginLeft:400,marginTop:100}}noValidate autoComplete="off">
                <div><h2>Create Account</h2><br/>
                    <TextField
                        type="text"
                        name="fullname"
                        value={this.state.fullname}
                        id="outlined-required"
                        onChange={this.handleChange}
                        label="Full Name"
                        variant="outlined"
                    />
                    <br/><br/>
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
                    <Button  variant="contained" color="primary" onClick={this.onSubmit} style={{width:230}}>
                        SING UP
                    </Button>
                </div>
            </form>
        );
    }
}


export default Register;