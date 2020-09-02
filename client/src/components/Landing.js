import React from 'react';
import Img1 from './Images/img1.jpg';
import Img2 from './Images/img2.jpg';
import Img3 from './Images/img3.jpg';

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="container" style={{marginTop:20}}>
            <div id="demo" className="carousel slide" data-ride="carousel">

            
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            
            
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Img1} alt="Los Angeles" width="1100" height="400" />
              </div>
              <div className="carousel-item">
                <img src={Img2} alt="Chicago" width="1100" height="400" />
              </div>
              <div className="carousel-item">
                <img src={Img3} alt="New York" width="1100" height="400" />
              </div>
            </div>
            
            
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
            </div>
        )
    }
}


export default Landing;