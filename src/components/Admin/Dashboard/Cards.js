
// Cards.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdPersonAdd } from "react-icons/md";
import { LuPenSquare } from "react-icons/lu";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Cards.css"

function Cards() {

  const [doctors, setDoctors] = useState([]);
  
  const [staff, setStaff] = useState([]);
  const [billing, setBilling] = useState([]);
 
  const [staffList, setStaffList] = useState([]);
  const [reports, setReports] = useState({});



  useEffect(() => {
    // Fetch billing data from the backend
    axios.get('http://localhost:5000/api/v1/combined-data')
      .then((response) => {
        setBilling(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/GetAllStaff');
      if (Array.isArray(response.data.data)) {
        // If the response data is an array, set it as the staff list
        setStaffList(response.data.data);
      } else {
        console.error('Invalid data received from the server:', response.data);
      }
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  // Count the number of doctors with specialization equal to "doctor"
const doctorCount = staffList.filter((staff) => staff.specialization === "doctor").length;
const staffCount = staffList.filter((staff) => staff.specialization !== "doctor").length;


  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/api/v1/combined-data')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])


  const countPatients = patients.length;
  

  useEffect(() => {
    // Define the URL of your backend API endpoint
    const apiUrl = 'http://localhost:5000/api/get-allBill'; // Replace with your actual endpoint URL

    // Use axios to send a GET request to the API endpoint
    axios
      .get(apiUrl)
      .then((response) => {
        setReports(response.data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const countReports = reports.length;
  

  

  return (
    <div className="container-fluid-admin23">
      
       <div  className="maindiv-admin89"> 
       
          <Link to="/Billing" className="commondiv-admin89">
              {/* <h1>{data?.doctor}</h1> */}
              <h1>{billing.length}</h1>
              <p className='admin-container-names89'>Billing</p> 
            <LuPenSquare className="overviewIcon" />
            </Link>
            <Link to="/staff" className="commondiv-admin89">
              {/* <h1>{data?.doctor}</h1> */}
              <h1>{doctorCount}</h1>
              <p>Doctor</p>       
            <MdPersonAdd className="overviewIcon" />
            </Link>


            </div>
        
            <div  className="maindiv-admin89"> 

            <Link to="/staff" className="two commondiv-admin89">
              {/* <h1>{data?.nurse}</h1> */}
              <h1>{staffCount}</h1>
              <p>Staff</p>          
            <FaUserNurse className="overviewIcon" />
            </Link>
         

          <Link to="/PatientDetails" className="three commondiv-admin89">
              <h1>{countPatients}</h1>
              <p>Patient</p>           
            <RiEmpathizeLine className="overviewIcon" />
            </Link>

            </div>

         <div className="maindiv-admin89">
            <Link to="/reports" className="six commondiv-admin89">
              {/* <h1>{data?.admin}</h1> */}
              <h1>{countReports}</h1>
              <p>Reports</p>
              
            <TbReportSearch className="overviewIcon" />
            </Link>
            </div>
            
          
       
      
    </div>
  );
}

export default Cards;










































































































































