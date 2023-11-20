import React, { useState, useEffect } from "react";

import { BiSolidUserRectangle } from "react-icons/bi";
import { AiOutlineBars } from "react-icons/ai";
import { LuCreditCard } from "react-icons/lu";
import { BiSolidUser } from "react-icons/bi";

import { MdEdit } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import jms from '../lab/jms.png';
import "./PatientNav.css";

function PatientNav() {
  const [isModalOpen, ] = useState(false);
  const [patientData, setPatientData] = useState({ name: "" });

  useEffect(() => {
    // Retrieve patient name from localStorage
    const patientName = localStorage.getItem("selectedrecPatientName");
    setPatientData({ name: patientName });
  }, []);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <div className="popup-overlay-23" style={{backgroundColor:"#9b8bf4",height:"60px", position: "sticky",}}>
      
        <div
          className={`popup-content_95 ${isModalOpen ? "center-content" : ""}`}
        >
          <div className="patient-right">
         
            <nav>
              <ul>
                <span style={{marginRight:"400px"}}>
              <Link to="/Homepage" className="doc-link-nav">
              {" "}
              {/* <img src={jms} alt="" style={{ width: '50px', height: '35px',color:"white"}} />  */}
            </Link></span>
                <li style={{color:"white"}}><span className="patientapp1">Patient Name:</span> {patientData.name}</li>
                <li>
                  <a href="/Appointment">
                    <BiSolidUserRectangle /> <span className="patientapp">Appointments</span>
                  </a>
                </li>
                <li>
                  <a href="/BillForm">
                    <AiOutlineBars /> <span className="patientapp">Bills</span>
                  </a>
                </li>
                <li>
                  <a href="/PaidPatient">
                    <LuCreditCard /> <span className="patientapp">paid</span>
                  </a>
                </li>
                <li>
                  <a href="/PatientVisit">
                    <BiSolidUser /><span className="patientapp"> visits</span>
                  </a>
                </li>
                <li>
                  <a href="/PatientEdit">
                    <MdEdit /> <span className="patientapp">Edit</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        
        </div>
      </div>
    </>
  );
}

export default PatientNav;