

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Link, } from "react-router-dom";
import appointments from './appointments.png';
// import check from "./check.png";
// import jms from '../lab/jms.png';
import "./navbar.css";
const logstaffid = localStorage.getItem("staffid");



const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPatientMenu, setShowAddPatientMenu] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };
  const toggleAddPatientMenu = () => {
    setShowAddPatientMenu(!showAddPatientMenu);
  };
  

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [, setStaffList] = useState([]);
  const [matchingStaff, setMatchingStaff] = useState(null);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get("https://hmsbackend-wbfe.onrender.com/api/GetAllStaff");
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
      <div className="navbar-doctor" style={{
             
              }}>
        <div className="left">
          <div className="logo" >
            <Link to="/Homepage" className="doc-link-nav">
              {" "}
              <h4>VN Clinic</h4>
              {/* <img src={jms} style={{ width: '100px', height: '50px'}} alt='' /> */}
             
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/Bills" className="doc-link-nav" style={{color:"white",  fontFamily: "Inria Serif"}}>
              {" "}
              <span className="icon-docks">
              {/* <img src={check} alt="check" /> */}

              </span>
              AllBills
            </Link> 
          </div>
          <div className="nav-items">  
            <Link to="/Patient" className="doc-link-nav" >
              {" "}
              <span className="icon-docks">
              <img src={appointments} alt="appoitments" style={{height:"30px"}}/>

              </span>
              <span style={{color:"white",  fontFamily: "Inria Serif"}}>Patients Q</span>
            </Link>
          </div>
        </div>
        <div className="right">
  <div className="add-patient-dropdown" onMouseEnter={toggleAddPatientMenu} onMouseLeave={toggleAddPatientMenu}>
    <MdPersonAddAlt1 className="add-patient-icon" />
    {showAddPatientMenu && (
      <div className="add-patient-menu">
        <Link to="/Addpatient" className="add-patient-card">
          <AiOutlinePlusSquare />
          Add Patient
        </Link>
        <hr />
        <Link to="/Existingpatient" className="add-patient-card">
          <BsReverseLayoutTextWindowReverse />
          &nbsp;Existing Patient
        </Link>
      </div>
    )}
  </div>


          <div className="search-container321" >
            <input
              type="text"
              placeholder="Search patients"
              className="search-bar-docgt"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                // width:"300px",
                height:"30px",
                fontFamily: "Inria Serif",
                marginRight: "57px",
                 }}
            />
            <div className="searching321Button">
            <button
            className="buttones"
  onClick={handleSearch}
  style={{
    // width: "130px",
    height: "30px",
    color: "white",
    background: "#3E6EA8",
    boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)",
    border: "none",
    transition: "transform 0.2s", 
    fontFamily: "Inria Serif",
      }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  Search
</button>

            </div>
          </div>
          <div className="right-doc"onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown} style={{fontFamily: "Inria Serif"}}>
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
                  <div className="dropdown-item-logout" >
                    <div className="user-id" style={{fontFamily: "Inria Serif"}}>
                      Name:{capitalizeFirstLetter(matchingStaff.name)}
                    </div>
                    <div className="user-id" style={{fontFamily: "Inria Serif"}}>
                      Staff ID: {matchingStaff.staffid}
                    </div>
                    <div className="user-id" style={{fontFamily: "Inria Serif"}} >
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
