import React, { useState, useEffect } from "react";
import "./patient.css";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link } from "react-router-dom";
import Navbar from "./Navbar23";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/combined-data")
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredPatients(patients); 
    } else {
      
      const filtered = patients.filter(
        (patient) =>
          (patient.name &&
            patient.name.toLowerCase().includes(query.toLowerCase())) ||
          (patient.patientId &&
            patient.patientId.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPatients(filtered);
    }
  };

  const handleNameClick = (patientId, patientName) => {
    // Store patientId and patientName in localStorage
    localStorage.setItem("selectedrecPatientId", patientId);
    localStorage.setItem("selectedrecPatientName", patientName);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="table-container35">
      <table className="patienttable20">
      <thead className="headcolor1">
                <tr>
                  <th>PatientID</th>
                  <th>Patient Name</th>
                  <th>Amount</th>
                  <th>Select Details</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Service</th>
                </tr>
              </thead>
        <tbody className="patientsdata20">
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.patientId}</td>
              <td>
              <Link className="namepatient"
                  to={`/Appointment`}
                  onClick={() => handleNameClick(patient.patientId, patient.name)}
                >
                  {patient.name}
                </Link>
            </td>
              <td>
                {patient.items && patient.items.length > 0 ? (
                  <>
                    &nbsp;&nbsp; <FcMoneyTransfer />
                    &nbsp;&nbsp;{patient.items[0].price}
                  </>
                ) : (
                  "No items available"
                )}
              </td>
              <td>
                <select onChange={(e) => (window.location.href = e.target.value)}>
                  <option value="/Patient">select</option>
                  <option value={`/patient/${patient.patientId}/vitals`}>Vitals</option>
                  <option value={`/patient/${patient.patientId}/testresults`}>Test Results</option>
                  {/* <option value={`/patient/${patient.patientId}/PrescriptionData`}>Prescription</option> */}
                  <option value={`/patient/${patient.patientId}/attachment`}>Attachments</option>
                </select>
              </td>

              
              <td>
                {patient.hour}Hrs &nbsp;{patient.minute}mins
              </td>
              <td>{patient.doctor}</td>
              <td> {patient.items.map((item, index) => (
                <div key={index}>{item.type}</div>
              ))}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Patient;