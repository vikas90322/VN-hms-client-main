
// Cards.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { AiFillProject } from 'react-icons/ai';
import { SiMoneygram } from 'react-icons/si';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Cards() {

  const [totalDoctors, setTotalDoctors] = useState(0);
  useEffect(() => {
    const fetchTotalDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getNewSpecialization'); // Replace with your API endpoint
        console.log('res doct',response.data.length);
        const totalDoctorsCount = response.data.length; // Update the property according to your API response
        setTotalDoctors(totalDoctorsCount);
      } catch (error) {
        console.error(error);
      }
    };    
    fetchTotalDoctors();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-6 mb-3">
          <Link className='link' to="/ProfileForm">  
            <div className="card card-primary">
              <div className="card-body">
                <div className="card-content">
                  <h3 className="card-value">14</h3>
                  <p>Total Patients</p>
                </div>
                <div className="card-icon">
                  <IoIosPeople className="icon" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <Link className='link' to="/projects">  
            <div className="card card-success">
              <div className="card-body">
                <div className="card-content">
                  <h3 className="card-value">{totalDoctors}</h3>
                  <p>Total Doctors</p>
                </div>
                <div className="card-icon">
                  <AiFillProject className="icon" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="col-lg-3 col-md-6 col-sm-6 mb-3">
          <Link className='link' to="/Earnings">  
            <div className="card card-danger">
              <div className="card-body">
                <div className="card-content">
                  <h3 className="card-value"><FaRupeeSign size={25}/>16000</h3>
                  <p>Total Clinic</p>
                </div>
                <div className="card-icon">
                  <SiMoneygram className="income" />
                </div>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Cards;
