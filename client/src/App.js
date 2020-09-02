
import React from 'react';
import {
  BrowserRouter as Router,
  Route

} from "react-router-dom";
import Navbar from './components/Navbar';
import Loading from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Landing from './components/Landing';
import ShippingAddress from './components/shippingAddress';
import AddAddress from './components/AddAddress';
import AllCategory from './components/AllCategory';
import VodkaProducts from './components/VodkaCategory';
import WhiskyProducts from './components/whiskyCategory';
import RumProducts from './components/RumCategory';
import ScotchProducts from './components/ScotchCategory';
import viewProduct from './components/ViewProduct';
import Cart from './components/Cart';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/AllCategory" component={AllCategory} />
        <Route exact path="/shippingaddress/:id" component={ShippingAddress} />
        <Route exact path="/AddAddress" component={AddAddress} />
        <Route exact path="/VodkaCategory" component={VodkaProducts} />
        <Route exact path="/whiskyCategory" component={WhiskyProducts} />
        <Route exact path="/RumCategory" component={RumProducts} />
        <Route exact path="/ScotchCategory" component={ScotchProducts} />
        <Route exact path="/viewproduct/:id" component={viewProduct} />
        <Route exact path="/cart" component={Cart} />
      </div>
    </div>
    </Router>
  );
}

export default App;
