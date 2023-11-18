// navBar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import jms from '../lab/jms.png'
import './CSS/LabNavbar.css'
import { AiFillSetting } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BsSearch } from "react-icons/bs";


import check from "../FrontDesk/check.png";
const logstaffid = localStorage.getItem("staffid");

const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const LabNavbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [, setStaffList] = useState([]);
  const [matchingStaff, setMatchingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/combined-data/${searchTerm.toUpperCase()}`
      );
      if (response.data.error || searchTerm==='') {
     
        toast.error("Patient data not found"); 
      } else {
       
        localStorage.setItem("labpatientid", searchTerm);
  
     
        window.location.href = "/AddBillLab";
      }
    } catch (error) {
      if (error.response.status === 404) { 
        toast.error("Patient not found");
      } else {
        console.log(error);
      }
    }
  };
  

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
          setMatchingStaff(foundStaff); 
        }
      } else {
        console.error("Invalid data received from the server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogOut = () => {
    localStorage.removeItem("staffid");
    localStorage.removeItem("hasPageReloaded");
    
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="navbar-doctor-lab" style={{boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)"}}>
        <div className="left-lab">
          <div className="labnav-logo">
            <Link to="/TestsTable" className="doc-link-nav">
              {" "}
              <h5>VN Clinic</h5>
              {/* <small style={{color:"#3e6eab"}}><img  src={jms}alt='logo' className="lab-logo"  /></small> */}
            </Link>
          </div>
         
          <div className="nav-item" style={{fontFamily:"Inria Serif"}}>
            <Link to="/FindReports" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
              <img src={check} alt="check" className="lab-nav-img" />
              </span>

              Find Report
            </Link>
          </div>
          <div className="nav-item-1" style={{fontFamily:"Inria Serif"}}>
            <Link to="/labservicetable" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
              <AiFillSetting style={{fontSize:"30px",color:'#fff'}}/>
              </span>
              Services
            </Link>
          </div>
          
        </div>
        <div className="right-lab">
          

          <input
            type="text"
            placeholder="Search Patient ID"
            style={{fontFamily:"Inria Serif"}}
            className="search-bar-doc-lab"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="searching321Button">
          <button onClick={handleSearch}>
            <BsSearch className="search-lab-icon" />
          </button>
          </div>

          <div className="right-doc" onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
            <div
              className="profile-icon-container"
              onClick={toggleProfileDropdown}
            >
              <span className="icon-profile rounded-icon">
                {renderProfileIcon()}
              </span>
            </div>

            {showProfileDropdown && (
              <div className="profile-dropdown-logout" >
                {matchingStaff && (
                  <div className="dropdown-item-logout">
                    <div className="user-id">
                      Name:{capitalizeFirstLetter(matchingStaff.name)}
                    </div>
                    <div className="user-id">
                      Staff ID: {matchingStaff.staffid}
                    </div>
                    <div className="user-id">
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

export default LabNavbar;
