// TestDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './CSS/TestDetails.css'
import LabNavbar from "./LabNavbar";
import { FaArrowCircleLeft } from "react-icons/fa";


const patientIdLower = localStorage.getItem("resultpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";


const TestDetails = ({ match }) => {
  const [/*rowData */, setRowData] = useState({});
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Create a function to fetch files and call it initially
  // const fetchFiles = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/get-fileslab`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setFiles(data.data);
  //     } else {
  //       console.error('Error fetching files.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching files:', error);
  //   }
  // };

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
      
      
      <LabNavbar />
      <Link to="/FindReports"> 
      <FaArrowCircleLeft className="fa-back-arrow"/>
    </Link>
    <br/> <br/>
      <div >
      
      
   
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}> Upload</button>
      </div>
      <h2>Uploaded Files</h2>
      <h1>{patientId}</h1>
      <table className="lab-test-details-tb">
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

export default TestDetails;

