import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

import { PiCalculatorLight } from "react-icons/pi";

import { CgProfile } from "react-icons/cg";
import { MdPersonAddAlt1 } from "react-icons/md";

import { BiPlusMedical } from "react-icons/bi";

import jms from '../lab/jms.png';
import appointments from './appointments.png';
import check from "./check.png";
import { PiNotepadThin } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";

const logstaffid = localStorage.getItem("staffid");



// Function to capitalize the first letter of each word
const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const Navbar23 = ({ onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPatientMenu, setShowAddPatientMenu] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };
  const toggleAddPatientMenu = () => {
    setShowAddPatientMenu(!showAddPatientMenu);
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [ , setStaffList] = useState([]);
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
      <div className="navbar-doctor" style={{
              backgroundColor:"#9b8bf4"
              }}>
        <div className="left">
          <div className="logow" >
            <Link to="/Homepage" className="doc-link-nav">
              {" "}
              <h2 style={{fontStyle:'italic',fontSize:'1.3em' ,fontWeight:'bolder'}}>VNC</h2>
              {/* <img src={jms} style={{ width: '50px', height: '35px',color:"white"}} /> */}
{/* ======= 
              <img src={jms} style={{ width: '100px', height: '50px',color:"white"}} alt="" />
{/* >>>>>>> 88782afb895a447aeef1a8222fed2379829af5b7 */}
            </Link>
          </div>
          <div className="nav-itemb">
            <Link to="/Bills" className="doc-link-nav" style={{color:"white",  fontFamily: "Inria Serif"}}>
              {" "}
              <span className="icon-docks">
              {/* <img src={check} alt="check" /> */}
              <PiNotepadThin className="Allbills"/>

              </span>
            <span className="All">AllBills</span>
            </Link> 
          </div>
          <div className="nav-itemb">  
            <Link to="/Patient" className="doc-link-nav" >
              {" "}
              <span className="icon-docks">
              {/* <img src={appointments} alt="appoitments" style={{height:"30px"}}/> */}
              <GoChecklist className="Check"/>
              </span>
              <span className="All" style={{color:"white"}}>Patients Q</span>
            </Link>
          </div>
        </div>
        <div className="right">
  <div className="add-patient-dropdown" onMouseEnter={toggleAddPatientMenu} onMouseLeave={toggleAddPatientMenu}>
    <MdPersonAddAlt1 className="add-patient-icon" />
    {showAddPatientMenu && (
      <div className="add-patient-menu">
        <Link to="/Addpatient" className="add-patient-card">
          <BiPlusMedical />
          Add Patient
        </Link>
        <hr />
        <Link to="/Existingpatient" className="add-patient-card">
          <PiCalculatorLight />
          &nbsp;Existing Patient
        </Link>
      </div>
    )}
  </div>
  {location.pathname !== "/Homepage" && location.pathname !== "/Addpatient" &&(
            <div className="search-container321">
              <input
                type="text"
                placeholder="Search patients"
                className="search-bar-doc1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width:"250px",
                  height:"35px",
                  // fontFamily: "Inria Serif",
                  marginRight: "0px",
                   }}
              />
              <div className="searching321Button">
              <button
                  onClick={handleSearch}
                  className="weyh"
                  style={{
                    color: "white",
                    background: "#3E6EA8",
                    border: "none",
                      }}
                  // onMouseEnter={(e) => {
                  //   e.currentTarget.style.transform = "scale(1.1)";
                  // }}
                  // onMouseLeave={(e) => {
                  //   e.currentTarget.style.transform = "scale(1)";
                  // }}
                >
                  Search
                </button>
              </div>
            </div>
          )}

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

export default Navbar23;