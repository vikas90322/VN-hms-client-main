import React, { Component } from 'react';
import PharmacyNav from './PharmacyNav';
// import janani from './images/Jananiclinic.jpg';
// import p1 from "./images/p1.png";
// import p2 from "./images/p2.png";
import pone from "./images/pone.png"
export default class PharmacyHome extends Component {
  componentDidMount() {
    const hasPageReloaded = localStorage.getItem('hasPageReloaded');
    if (!hasPageReloaded) {
 
      localStorage.setItem('hasPageReloaded', 'true');
      window.location.reload();
    }
  }
  
  render() {
    // const imageStyles = {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   width: '100%',
    //   height: '100%',
    //   objectFit: 'cover',
    //   zIndex: -1,
    // };

    const containerStyles = {
      width: '100%',
      height: '100vh', // Adjust for the height of the navbar
      // overflow: 'hidden',
    };

    const imageContainerStyles = {
      display: 'inline-block',
      marginRight: '10px',
      marginTop:"70px",
    width:"100%",
    height:"100%"
    };

    return (
      <div>
        <PharmacyNav />
        <div style={containerStyles}>
          <img src={pone} alt="Pharmacy" style={imageContainerStyles} />
         
        </div>
      </div>
    );
  }
}
