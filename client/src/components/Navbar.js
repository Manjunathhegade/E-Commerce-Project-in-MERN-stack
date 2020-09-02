import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Noty from 'noty';
//import css for noty module
import './noty.css';
// bootstrap for noty
import './bootstrap-v4.css';


class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };
        this.logOut = this.logOut.bind(this)
    }
    logOut(e) {
        e.preventDefault();
         let confirmNot = new Noty({
                text: "Are You Sure..You Want To Logout..?",
                type:"success",
                theme:"bootstrap-v4",
                closeWith:['button'],
                buttons:[
                    //for yes
                    Noty.button('yes','btn btn-success',()=>{
                        localStorage.removeItem('usertoken')
                        this.props.history.push('/');
                        confirmNot.close()
                    }, {id:"button1","data-status":"ok"}),

                    //for no 
                    Noty.button('no','btn btn-erro',()=>{

                        confirmNot.close()
                    })

                ]
         })

         confirmNot.show()
           
                
         
    }

    render() {
        const loginLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <i className="fas fa-user-plus"></i>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Signup
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/AllCategory" className="nav-link">
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                        Cart
                    </Link>
                </li>
                <li className="nav-item" >
                    <a onClick={this.logOut} to="/register" className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#" style={{ fontWeight: 'bold' }}>SCOTCH HUB</a>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                        </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginLink}
                </div>
            </nav>
        )
    }
}



export default withRouter(Navbar);