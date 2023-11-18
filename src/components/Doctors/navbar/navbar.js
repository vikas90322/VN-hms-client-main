// navBar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./navbar.css";



import { CgProfile } from "react-icons/cg";


import appointment1 from "./appointment1.png";
import appointment2 from "./appointment2.png";
import jms from '../../lab/jms.png'

const logstaffid = localStorage.getItem("staffid");

const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [/*staffList*/, setStaffList] = useState([]);
  const [matchingStaff, setMatchingStaff] = useState(null);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/GetAllStaff");
      if (Array.isArray(response.data.data)) {
        setStaffList(response.data.data);
        const foundStaff = response.data.data.find(
          (staff) => staff.staffid === logstaffid
        );
        if (foundStaff) {
          setMatchingStaff(foundStaff); // Set the matching staff member
        }
      } else {
        console.error("Invalid data received from the server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };
 

  // Define the filter to change color (e.g., from red to blue)
  const colorFilter = `
  <filter id="white-out">
  <feColorMatrix type="matrix" values="
    1 0 0 0 1 0
    0 1 0 0 1 0
    0 0 1 0 1 0
    0 0 0 1 0 0
  " />
</filter>
  `;

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  // const closeProfileDropdown = () => {
  //   setTimeout(() => {
  //     setShowProfileDropdown(false);
  //   }, 3000);
  // };

  const handleLogOut = () => {
    localStorage.removeItem("staffid");
    localStorage.removeItem("hasPageReloaded");
    // window.location.href = '/';
  };

  const renderProfileIcon = () => {
    if (matchingStaff) {
      const nameParts = matchingStaff.name.split(" ");
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
    <>
      <div className="navbar-doctor">
        <div className="left">
          <div   className="logo">
            <Link  to="/appointments" className="doc-link-nav">
              <img  src={jms}alt='logo'  style={{ width: '150px', height: '65px',}} filter={colorFilter} />
           
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/appointments" className="doc-link-nav">
              <img
                src={appointment1}
                alt="appointment1"
                style={{ width: "42.903px", height: " 38px" }}
              />
              <span className="icon-docks">Appointments</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/allappointments" className="doc-link-nav">
              <img
                src={appointment2}
                alt="appointment2"
                style={{ width: "42.903px", height: " 38px" }}
              />
              <span className="icon-docks"> All Appointments </span>
            </Link>
          </div>
          
        </div>
      
        <div className="right">
          <div className="dots-box">
            <div className="dots-content"></div>
          </div>

          <div
            className="right-doc"
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
            style={{ fontFamily: "Inria Serif" }}
          >
            <div
              className="profile-icon-container"
              onClick={toggleProfileDropdown}
            >
              <span className="icon-profile rounded-icon">
                {renderProfileIcon()}
              </span>
            </div>

            {showProfileDropdown && (
              <div className="profile-dropdown-logout">
                {matchingStaff && (
                  <div className="dropdown-item-logout">
                    <div
                      className="user-id"
                      style={{ fontFamily: "Inria Serif" }}
                    >
                      Name:{capitalizeFirstLetter(matchingStaff.name)}
                    </div>
                    <div
                      className="user-id"
                      style={{ fontFamily: "Inria Serif" }}
                    >
                      Staff ID: {matchingStaff.staffid}
                    </div>
                    <div
                      className="user-id"
                      style={{ fontFamily: "Inria Serif" }}
                    >
                      Department:{" "}
                      {capitalizeFirstLetter(matchingStaff.specialization)}
                    </div>
                    
                  </div>
                )}

                <Link to="/" onClick={handleLogOut} className="profile-link">
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;



