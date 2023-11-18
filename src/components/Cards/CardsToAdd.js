import React from 'react';
import {Link} from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { AiFillProject } from 'react-icons/ai';
import { SiMoneygram } from 'react-icons/si';
import { MdLocalHospital } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function CardsToAdd() {
  return (
    <div className="container-fluid-below">
      <div className="row">
    
        <div className="col-lg-2 col-md-3 col-sm-6 mb-5">
        <Link className='link' to="/AddNewSpecialist">  
          <div className="card card-primary-below">
            <div className="card-body-below">
              <div className="card-content-below">
              
                <p>Add Specalist</p>
              </div>
              <div className="card-icon-below">
                <MdLocalHospital  className="icon-below" />
              </div>
            </div>
          </div>
      </Link>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6 mb-5">
        <Link className='link' to="/ProfileForm">  
          <div className="card card-primary-below">
            <div className="card-body-below">
              <div className="card-content-below">
               
                <p>Add a Patient</p>
              </div>
              <div className="card-icon-below">
                <IoIosPeople className="icon-below" />
              </div>
            </div>
          </div>
      </Link>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6 mb-5">
        <Link className='link' to="/ProfileForm">  
          <div className="card card-primary-below">
            <div className="card-body-below">
              <div className="card-content-below">
               
                <p>Add an Admin</p>
              </div>
              <div className="card-icon-below">
                <FaUserShield  className="icon-below" />
              </div>
            </div>
          </div>
      </Link>
        </div>
       
      
       
      </div>
    </div>
  );
}

export default CardsToAdd;
