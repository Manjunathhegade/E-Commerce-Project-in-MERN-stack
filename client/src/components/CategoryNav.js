import React from 'react';
import Button from '@material-ui/core/Button';
import AllProducts from './Images/img4.jpg';
import Vodka from './Images/img5.jpg';
import Rum from './Images/img7.jpg';
import Scotch from './Images/img6.jpg';
import Whisky from './Images/img8.jpg';
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';


class CategoryNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: false,
            vodka: false,
            rum: false,
            whisky: false,
            scotch: false,
            fullname:'',
            id:''
        };
        this.allClick = this.allClick.bind(this);
        this.vodkaClick = this.vodkaClick.bind(this);
        this.scotchClick = this.scotchClick.bind(this);
        this.rumClick = this.rumClick.bind(this);
        this.whiskyClick = this.whiskyClick.bind(this);
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded._id,
            fullname: decoded.fullname,
            })
      
    }

    allClick(e) {
        e.preventDefault();
        this.setState({ all: true })
    }
    vodkaClick(e) {
        e.preventDefault();
        this.setState({ vodka: true })

    }
    rumClick(e) {
        e.preventDefault();
        this.setState({ rum: true })
    }
    scotchClick(e) {
        e.preventDefault();
        this.setState({ scotch: true })
    }
    whiskyClick(e) {
        e.preventDefault();
        this.setState({ whisky: true })
    }

    render() {
        if (this.state.vodka) {
            return <Redirect to={'/VodkaCategory'} />
        }
        if (this.state.rum) {
            return <Redirect to={'/RumCategory'} />
        }
        if (this.state.scotch) {
            return <Redirect to={'/ScotchCategory'} />
        }
        if (this.state.whisky) {
            return <Redirect to={'/WhiskyCategory'} />
        }
        if(this.state.all){
            return <Redirect to={'/AllCategory'} />
        }
        return (
            <div>
            <br/><h3>Dear {this.state.fullname}</h3>
                <nav className="navbar navbar-expand-sm bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <img style={{ width: 200, height: 130 }} src={AllProducts} />
                            <a className="nav-link" href="#"></a>
                            <Button onClick={this.allClick}  variant="contained" style={{ width: 160 }}>All Categories</Button>
                        </li>
                        <li className="nav-item" style={{ marginLeft: 40 }}>
                            <img style={{ width: 200, height: 130 }} src={Vodka} />
                            <a className="nav-link" href="#"></a>
                            <Button onClick={this.vodkaClick} variant="contained"  style={{ width: 150 }}>Vodka</Button>
                        </li>
                        <li className="nav-item" style={{ marginLeft: 40 }}>
                            <img style={{ width: 200, height: 130 }} src={Scotch} />
                            <a className="nav-link" href="#"></a>
                            <Button onClick={this.scotchClick} variant="contained"  style={{ width: 150 }}>Scotch</Button>
                        </li>
                        <li className="nav-item" style={{ marginLeft: 15 }}>
                            <img style={{ width: 200, height: 130 }} src={Rum} />
                            <a className="nav-link" href="#"></a>
                            <Button onClick={this.rumClick} variant="contained"  style={{ width: 150 }}>Rum</Button>
                        </li>
                        <li className="nav-item" style={{ marginLeft: 15 }}>
                            <img style={{ width: 200, height: 130 }} src={Whisky} />
                            <a className="nav-link" href="#"></a>
                            <Button onClick={this.whiskyClick} variant="contained"  style={{ width: 150 }}>Whiskies</Button>
                        </li>
                    </ul>

                </nav>
            </div>
        );
    }
}


export default CategoryNav;