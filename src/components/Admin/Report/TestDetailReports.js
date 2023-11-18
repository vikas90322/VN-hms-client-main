// TestDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import Sidebar from "../Navbar/Sidebar";
import NavBar from "../Navbar/Navbar";
import './TestDetailReports.css'


const patientIdLower = localStorage.getItem("resultpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";


const TestDetailReports = ({ match }) => {
  const [rowData, setRowData] = useState({});
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);


  const fetchFiles = async () => {
    try {
      // Get patientId from localStorage
      const patientId = localStorage.getItem("resultpatientid") || "";
  
      const response = await fetch(`http://localhost:5000/api/get-fileslabById?patientId=${patientId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setFiles(data.data);
      } else {
        console.error('Error fetching files.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  
  

  useEffect(() => {
    // Fetch data for the selected row
    axios
        .get(`http://localhost:5000/api/tests`)
        .then((response) => {
            console.log(response); // Log the entire response
            setRowData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    // Call the fetchFiles function to initially fetch files
    fetchFiles();
}, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Define patientId here
    const patientId = localStorage.getItem("resultpatientid") || "";
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId); // Include the patientId in the form data

    try {
      const response = await fetch(`http://localhost:5000/api/uploadslab`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        // After a successful upload, fetch files again to update the list
        fetchFiles();
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  
  return (
    <div>
       <NavBar />
       <Sidebar />
      

      {/* <div style={{ marginTop: "15vh" }}>
      
      <Link to="/reports"> 
      <FaArrowCircleLeft />
    </Link>
    &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}></button>
      </div> */}
      <div className="admin-testd">
      <Link to="/reports"> 
      <FaArrowCircleLeft />
    </Link>
      <h2 >Uploaded Files</h2>  </div>
      <h1 className="admin-upload-test" >{patientId}</h1>
      <table className="admin-testd-table"  >
        <thead>
          <tr>
            <th>Sl No</th>
            <th>File Name</th>
            <th>Uploaded Date</th>
            <th>Uploaded Time</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>
                <a
                  href={`http://localhost:5000/uploadslab/${file.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.originalname}
                </a>
              </td>
              <td>{new Date(file.uploadedAt).toLocaleDateString()}</td>
              <td>{new Date(file.uploadedAt).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestDetailReports;

