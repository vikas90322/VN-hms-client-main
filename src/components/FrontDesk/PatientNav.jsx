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
      <div className="popup-overlay-23" style={{backgroundColor:"#3E6EAB",fontFamily:"Inria Serif",height:"60px", position: "sticky",}}>
      
        <div
          className={`popup-content_95 ${isModalOpen ? "center-content" : ""}`}
        >
          <div className="patient-right">
         
            <nav>
              <ul>
                <span style={{marginRight:"400px"}}>
              <Link to="/Homepage" className="doc-link-nav">
              {" "}
              <img src={jms} alt="" style={{ width: '50px', height: '35px',color:"white"}} /> 
            </Link></span>
                <li style={{color:"white"}}>Patient Name: {patientData.name}</li>
                <li>
                  <a href="/Appointment">
                    <BiSolidUserRectangle /> Appointments
                  </a>
                </li>
                <li>
                  <a href="/BillForm">
                    <AiOutlineBars /> Bills
                  </a>
                </li>
                <li>
                  <a href="/PaidPatient">
                    <LuCreditCard /> paid
                  </a>
                </li>
                <li>
                  <a href="/PatientVisit">
                    <BiSolidUser /> visits
                  </a>
                </li>
                <li>
                  <a href="/PatientEdit">
                    <MdEdit /> Edit
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <Link to="/Patient">
            <FaArrowCircleLeft />
          </Link>
        </div>
      </div>
    </>
  );
}

export default PatientNav;
