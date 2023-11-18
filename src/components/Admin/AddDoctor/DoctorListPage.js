import React, { useState, useEffect } from "react";
import "./DoctorListPage.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function DoctorListPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from your MongoDB backend API
    fetch("http://localhost:5000/api/doctors") // Assuming your backend is running on port 5010
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the 'doctors' state with the fetched data
        setDoctors(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty array [] ensures this effect runs once after the initial render

  const handleDelete = (id) => {
    // Implement your delete logic here
    // This code will send a DELETE request to the backend to delete the doctor with the given ID
    fetch(`http://localhost:5000/api/doctors/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If the delete operation is successful, update the 'doctors' state
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor._id !== id)
          );
        } else {
          console.error("Error deleting doctor:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting doctor:", error);
      });
  };

  return (
    <div>
      <div>
        <Sidebar />
        <Navbar />
      </div>
      {/* <div className="sk14-arrows14s">
     <Link to='/doctor'>
             <FaArrowCircleLeft /> 
             </Link>
          </div> */}

      <div className="patient-details-containercvvroyal">
        <div className="sk14-arrows143">
          <Link to="/doctor">
            <FaArrowCircleLeft fontSize={'50px'} />
          </Link>

          <div className="heading678">
            <h1 className="h1cvvroyal">Doctor Details</h1>
          </div>
        </div>
        <table className="patient-tablecvvroyal">
          <thead className="theadcvvroyal">
            <tr className="doctor-hight89">
              <th className="theadcvvroyal">DOCID</th>
              <th className="theadcvvroyal">First Name</th>
              <th className="theadcvvroyal">Password</th>

              <th className="theadcvvroyal">Email</th>
              <th className="theadcvvroyal">Specialty</th>
              <th className="theadcvvroyal">Number</th>
              <th className="theadcvvroyal">Blood Group</th>
              <th className="theadcvvroyal">Designation</th>
              <th className="theadcvvroyal">Experience</th>
              <th className="theadcvvroyal">City</th>
              <th className="theadcvvroyal">Action</th>
            </tr>
          </thead>
          <tbody className="tdbodycvvroyal">
            {Array.isArray(doctors) && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr className='trcvvroyal' key={doctor._id}> {/* Assuming the MongoDB document has an "_id" field */}
                <td className='tdbodycvvroyal'>{doctor.docid}</td>
                <td className='tdbodycvvroyal'>{doctor.name}</td>
                <td className='tdbodycvvroyal'>{doctor.password}</td>
                <td className='tdbodycvvroyal'>{doctor.email}</td>
                <td className='tdbodycvvroyal'>{doctor.department}</td>
                <td className='tdbodycvvroyal'>{doctor.mobilenumber}</td>
                <td className='tdbodycvvroyal'>{doctor.bloodgroup}</td>
                <td className='tdbodycvvroyal'>{doctor.department}</td>
                <td className='tdbodycvvroyal'>{doctor.workexperience}</td>
                <td className='tdbodycvvroyal'>{doctor.address}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No doctors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorListPage;
