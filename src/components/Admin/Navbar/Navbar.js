/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { CgProfile } from 'react-icons/cg';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { RiHospitalFill } from 'react-icons/ri';
import jms from '../../lab/jms.png';

const logstaffid = localStorage.getItem('staffid');

const capitalizeFirstLetter = (str) => {
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const NavBar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [matchingStaff, setMatchingStaff] = useState(null);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/GetAllStaff');
      if (Array.isArray(response.data.data)) {
        const foundStaff = response.data.data.find((staff) => staff.staffid === logstaffid);
        setMatchingStaff(foundStaff);
      } else {
        console.error('Invalid data received from the server:', response.data);
      }
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogOut = () => {
    localStorage.removeItem('staffid');
    localStorage.removeItem('hasPageReloaded');
  };

  const renderProfileIcon = () => {
    if (matchingStaff) {
      const nameParts = matchingStaff.name.split(' ');
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      } else {
        return (
          nameParts[0].charAt(0).toUpperCase() +
          nameParts[1].charAt(0).toUpperCase()
        );
      }
    } else {
      return <CgProfile />;
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="navbar-doctor13" style={{ boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)"}}>
        <div className="left-doc">
          <div className="logo-doc">
            <h4>VN Clinic</h4>
            {/* <img src={jms} style={{ width: '120%', height: '61px'}} alt='' /> */}
          </div>
        </div>
        <marquee style={{ fontSize: "30px", fontFamily: "Inria Serif", color:"#fff" }}>
          {matchingStaff ? (
            <span>
              <RiHospitalFill />Welcome To VN Clinic Admin Page __
              <span style={{ color: "yellow", fontFamily: "Inria Serif" }}>{capitalizeFirstLetter(matchingStaff.name)}</span>
            </span>
          ) : (
            "Loading..."
          )}
        </marquee>

        <div className="right-doc" onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
          <div className="profile-icon" onClick={toggleProfileDropdown}>
            <span className="icon-profile rounded-icon">
              {renderProfileIcon()}
            </span>
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown-logout">
              {matchingStaff && (
                <div className="dropdown-item-logout" >
                  <div className="user-id">Name: {capitalizeFirstLetter(matchingStaff.name)}</div>
                  <div className="user-id">Staff ID: {matchingStaff.staffid}</div>
                  <div className="user-id">Department: {capitalizeFirstLetter(matchingStaff.specialization)}</div>
                  {/* Add more fields as needed */}
                </div>
              )}

              <Link to="/" onClick={handleLogOut} className="profile-link" style={{ color: ' #1A3FA0' }}>
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
