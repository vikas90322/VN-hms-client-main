import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';


function Landingpage() {
  return (

    <div>
    <div>
    <Sidebar/>
    <Navbar/>
    </div>
    <div className="Landingpagemaincvvroyal">
   
        {/* <div >
            <h1 className="h1formaincvvroyal">Welcome to the Landing Page</h1>
        </div> */}

     
      
      <div className='doclistbuttoncvvroyal'>
      <Link to="/doctor-registration">
        <button  className="docbutton-reg">Doctor Registration</button>
        </Link>
       
      
       
      <Link to="/doctor-list">
      
        <button  className="docbutton-list89" >Doctor List</button>
        
      </Link>
      
      </div>
      </div>
    </div>
  );
}

export default Landingpage;