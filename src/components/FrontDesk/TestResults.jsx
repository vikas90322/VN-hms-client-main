import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './TestResults.css';
import Navbar from "./Navbar23";

import { FaArrowCircleLeft } from "react-icons/fa";

const TestDetailsDoc = ({ match }) => {
  const { id } = useParams();
  const [/*rowData*/, setRowData] = useState({});
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      const patientId = id || "";
      console.log("patientId: " + patientId);

      const response = await fetch(
        `http://localhost:5000/api/get-fileslabById?patientId=${patientId.toUpperCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data: " + JSON.stringify(data));
        console.log("patientId: " + patientId);
        setFiles(data.data);
      } else {
        console.error("Error fetching files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tests`);
        console.log(response);
        setRowData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchFiles();
  }, [fetchFiles, id]); // Include fetchFiles and id in the dependency array

  return (
    <>
      <Navbar />
      <div>
        <Link to="/Patient">
          <FaArrowCircleLeft style={{ fontSize: '2em', marginTop: "13vh" }} />
        </Link>
        <div className="testresult-table">
        <h2> Uploaded Files {id}</h2>
        <table >
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
