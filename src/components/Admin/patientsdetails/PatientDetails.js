import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import ReactJsPagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './PatientsDetails.css'; // Import your CSS


function PatientList() {
  const [patients, setPatients] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const patientsPerPage = 5; // Number of patients per page

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/api/v1/combined-data')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const pageCount = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const displayedPatients = patients.slice(
    (activePage - 1) * patientsPerPage,
    activePage * patientsPerPage
  );

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className="patients-main234">
        <div className="sk14-arrows143-n1-pat">
          <Link to="/frontpage">
            <FaArrowCircleLeft / >
          </Link>
          <div className="heading56789">
            <h1 className="h1cvvroyal-n1-pat">Patients Data</h1>
          </div>
        </div>
        <div className="PatientListContainer-sk14s12">
          <table className="PatientTable-sk14s12">
            <thead>
              <tr className="tr-class-bg">
                <th className="sk14s12">S.No</th>
                <th className="sk14s12">Patient ID</th>
                <th className="sk14s12">Name</th>
                <th className="sk14s12">Age</th>
                <th className="sk14s12">Gender</th>
                <th className="sk14s12">Blood Group</th>
                <th className="sk14s12">Mobile Number</th>
                <th className="sk14s12">Referred By</th>
                {/* <th className="sk14s12">Last Visit Date</th> */}
              </tr>
            </thead>
            <tbody>
              {displayedPatients.map((patient, index) => (
                <tr key={patient.patientId}>
                  <td>{index - 4 + activePage * patientsPerPage}</td>
                  <td>{patient.patientId}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.referredBy}</td>
                  {/* <td>{patient.last_visit_date}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <ReactJsPagination
           itemClass="custom-pagination-number" // Add a custom class for pagination numbers
           activeClass="active"
            activePage={activePage}
            itemsCountPerPage={patientsPerPage}
            totalItemsCount={patients.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
            nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
            firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
            lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} // Use custom content for the next arrow
          />
        </div>
      </div>
    </>
  );
}

export default PatientList;









