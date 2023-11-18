// TestDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from '../navbar/navbar'
import Sidebar from '../prescription/sidebar'

const patientIdLower = localStorage.getItem("selectedPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const TestDetailsDoc = ({ match }) => {
    const [, setRowData] = useState({});
    
    const [files, setFiles] = useState([]);

    // Create a function to fetch files and call it initially
    const fetchFiles = async () => {
        try {
          const patientId = localStorage.getItem("selectedPatientId") || "";
          console.log("patientId: " + patientId);
      
          const response = await fetch(`http://localhost:5000/api/get-fileslabById?patientId=${patientId.toUpperCase()}`);
          if (response.ok) {
            const data = await response.json();
            console.log("data: " + JSON.stringify(data)); // Log the data as a string
            console.log("patientId: " + patientId);
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

    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // const handleFileUpload = async () => {
    //     if (!file) {
    //         alert('Please select a file.');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const response = await fetch(`http://localhost:5000/api/uploadslab`, {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             alert('File uploaded successfully.');
    //             // After a successful upload, fetch files again to update the list
    //             fetchFiles();
    //         } else {
    //             alert('Error uploading file.');
    //         }
    //     } catch (error) {
    //         alert('Error uploading file: ' + error.message);
    //     }
    // };

    return (
        <>


            <Navbar />

            <Sidebar  />
            <div>
                <div style={{ marginLeft: "8%" }}>
                    <h2 >Uploaded Files</h2>
                    <h2 style={{ marginTop: "10vh" }}>Uploaded Files {patientId}</h2>
                    
                    <table>
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
                                    <td>{index + 1}</td>
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
            </div>

        </>
    );
};

export default TestDetailsDoc;


