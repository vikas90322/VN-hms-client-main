import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcSurvey } from "react-icons/fc";
import { BiSolidUserRectangle } from "react-icons/bi";
import { AiOutlineBars } from "react-icons/ai";

import { BiSolidUser } from "react-icons/bi";
import { CgDropOpacity } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import "./CSS/PopupNavbar.css";
import axios from "axios";
// import jms from '../lab/jms.png';


const patientIdLower = localStorage.getItem("labpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";
// arun

function PopupNavbar() {
  // Modal state
  const [appointments, setAppointments] = useState([]);
  // const [editingAppointment, setEditingAppointment] = useState(null);

  const [activeLink, setActiveLink] = useState("/AddBillLab"); // Set the initial active link

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);

        // Check response data type
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          // Handle single object case  
          setAppointments([response.data]);
        }

      } catch (error) {
        console.error(error);
        setAppointments([]); // fallback to empty array
      }
    }

    fetchAppointments();
  }, [])

  return (
    <>
      <div className="popup-overlay-Tj_1">
        <div className="popup-content_1">
          <div className="patient-right_1">
          
            <nav>
            
              <ul>
              <li> <Link to="/FindReports"><h5 style={{  height: '69px',marginRight:'1200px',marginTop:'0%'}}>VNClinic</h5>
                {/* <img src={jms} style={{  height: '69px',marginRight:'1056px',marginTop:'2%'}}  alt="" /> */}
                </Link></li>
                <li style={{ color: "white", fontSize:'20px' }}>Patient Name: {appointments.length > 0 ? appointments[0].name : 'N/A'}</li>
                <li 
                  className={activeLink === "/AddBillLab" ? "active" : ""}
               
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link
                    to="/AddBillLab"
                    onClick={() => handleLinkClick("/AddBillLab")}
                  >
                    <FcSurvey /> Add Bills
                  </Link>
                </li>
                <li className={activeLink === "/Appnt" ? "active" : ""}
                  style={{ backgroundColor: "transparent" }}
                >

                  <Link to="/Appnt" onClick={() => handleLinkClick("/Appnt")}>
                    <BiSolidUserRectangle /> Appnt
                  </Link>
                </li>
                <li className={activeLink === "/Billingforms" ? "active" : ""}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link
                    to="/Billingforms"
                    onClick={() => handleLinkClick("/Billingforms")}
                  >
                    <AiOutlineBars /> Bills
                  </Link>
                </li>
                
                <li className={activeLink === "/VisitsTable" ? "active" : ""}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link to="/VisitsTable" onClick={() => handleLinkClick("/VisitsTable")}>
                    <BiSolidUser /> visits
                  </Link>
                </li>
                <li className={activeLink === "/LabTable" ? "active" : ""}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link to="/LabTable" onClick={() => handleLinkClick("/LabTable")}>
                    <CgDropOpacity /> Lab
                  </Link>
                </li>
                <li className={activeLink === "/LabEdit" ? "active" : ""}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link to="/LabEdit" onClick={() => handleLinkClick("/LabEdit")}>
                    <MdEdit /> Edit
                  </Link>
                </li>
                {/*                 <li className={activeLink === "/Billingforms" ? "active" : ""}>

                  <Link to={"/TestsTable"}>
                    <button className="close-popup-button-Tj_1">
                      <AiOutlineClose />
                    </button>
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <div>
      Modals
      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                x
              </button>
              {selectedModal === 'tests' && 
              <TestsModalContent />
            }
            {selectedModal === 'status' &&
              <StatusModalContent />  
            }
            {selectedModal === 'print' &&
              <PrintModalContent />
            }
              {selectedModal === "addBills" && <Billingforms />}
            </div>
          </div>
        </>
      )}
      </div> */}
    </>
  );
}

export default PopupNavbar;
