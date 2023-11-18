import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar23";
import './attachment.css';

const Attachment = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [fileInputs, setFileInputs] = useState([0]);
  const [uploadedFilename, setUploadedFilename] = useState('');
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState(localStorage.getItem('pid'));

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setFileInputs([0]);
    setUploadedFilename('');
    setPopupVisible(false);
  };
  useEffect(() => {
    // Fetch the patient data based on the ID when the component mounts
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${id}`);
        setPatientData(response.data);
        setPatientId(response.data.patientId)
        console.log("pid"+patientId)
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id, patientId]);
  const handleFileUpload = async (index, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId);

    try {
      const response = await axios.post('http://localhost:5000/uploads/upload', formData);

      if (response.status === 200) {
        console.log('File uploaded successfully.');
        alert('File uploaded successfully.');
        setUploadedFilename(file.name);
      } else {
        console.error('Error uploading file.');
        alert('Error uploading file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    }

    if (index === fileInputs[fileInputs.length - 1]) {
      setFileInputs([...fileInputs, index + 1]);
    }
  };

  const handleSaveFile = async (index) => {
    try {
      const response = await axios.post(`http://localhost:5000/uploads/save`, {
        index,
        filename: uploadedFilename,
        patientId,
      });

      if (response.status === 200) {
        console.log('File information saved successfully.');
        alert('File information saved successfully.');
      } else {
        console.error('Error saving file information:', response.statusText);
        alert('Error saving file information: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error saving file information:', error);
      alert('Error saving file information: ' + error.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='backk'>
    <Link to="/Patient">
          <FaArrowCircleLeft  style={{fontSize:'40px', color:'blue'}}/>
        </Link>
      <h1 className='attachmentsheading23'>
        
        Front Desk
      </h1>
      {patientData && (
      <button className='attachmentsbutton12' onClick={handleOpenPopup}>{patientData.name}'s Attachments</button>
    )}


      {popupVisible && (
        <div className="attachments-overlay_65">
          <div className="popup231">
            <div className="popup-header123">
              <h2 className="attachments-title">{id}&nbsp;Attachments</h2>
              <button className="popup-close-button231" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <hr />
            <div className="attachments-content">
              <div className="popup-scrollable-content">
                {fileInputs.map((inputIndex) => (
                  <div key={inputIndex}>
                    <input
                      className="attachment"
                      type="file"
                      onChange={(e) => handleFileUpload(inputIndex, e.target.files[0])}
                    />
                    <button
                      className="save-button321"
                      onClick={() => handleSaveFile(inputIndex)}
                    >
                      Save
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Attachment;