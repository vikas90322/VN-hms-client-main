// LabReport.js

import React from "react";
import axios from "axios";

const LabReport = ({ onClose, testId, fileInput, setFileInput }) => {

    const [currentDate, setCurrentDate] = useState(initialValue);
          
  const uploadFile = () => {
    // Create a FormData object to send the file and test ID
    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("testId", testId); // Include the test ID

    // Send the file and test ID to the backend
    axios
      .post(`http://localhost:5000/api/upload`, formData)
      .then((response) => {
        console.log("File uploaded successfully");
        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };

  return (
    <div>
      <h3>Upload File for Test ID: {testId}</h3>
      <input
        type="file"
        onChange={(e) => setFileInput(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default LabReport;
