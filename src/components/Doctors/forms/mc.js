import React, { useState, useEffect } from "react";
import "./mc.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Sidebar from "../prescription/sidebar"; 
import { BsXCircle} from 'react-icons/bs';

const docId = localStorage.getItem("staffid");
const patientId = localStorage.getItem("selectedPatientId");

const Mc = () => {
  const [formData, setFormData] = useState({
    patientName14: "",
    treatmentFrom14: "",
    treatmentTo14: "",
    treatmentFor14: "",
    resumeDutyFrom14: "",
    docId: docId, // Include the docId from localStorage
    patientId: patientId, // Include the patientId from localStorage
  });

  const [formErrors, setFormErrors] = useState({
    patientName14: "",
    treatmentFrom14: "",
    treatmentTo14: "",
    treatmentFor14: "",
    resumeDutyFrom14: "",
    // Add other input fields here
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };
  
    for (const field in formData) {
      if (!formData[field] && field !== "patientName14") {
        newErrors[field] = "This field is required.";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    }
  
    setFormErrors(newErrors);
    return isValid;
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/Mc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            patientName14: patientName, // Include the patientName14 field
          }),
        });
  
        if (response.status === 201) {
          alert("Data saved successfully.");
          setFormData({
            patientName14: "",
            treatmentFrom14: "",
            treatmentTo14: "",
            treatmentFor14: "",
            resumeDutyFrom14: "",
            docId: docId, // Include the docId again
            patientId: patientId, // Include the patientId again
          });
        } else {
          alert("Failed to save data.");
        }
      } catch (error) {
        alert("Error saving data:", error);
      }
    }
  };
  

  const handleClear = () => {
    setFormData({
      patientName14: "",
      treatmentFrom14: "",
      treatmentTo14: "",
      treatmentFor14: "",
      resumeDutyFrom14: "",
      // Add other input fields here
    });
    setFormErrors({
      patientName14: "",
      treatmentFrom14: "",
      treatmentTo14: "",
      treatmentFor14: "",
      resumeDutyFrom14: "",
      // Add other input fields here
    });
  };

  const [patientName, setPatientName] = useState("");

  // Fetch patient name when the component mounts
  useEffect(() => {
    async function fetchPatientName() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/combined-data/${patientId.toUpperCase()}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setPatientName(data.name); // Assuming that the patient name is available in the response
        } else {
          console.error("Failed to fetch patient name.");
        }
      } catch (error) {
        console.error("Error fetching patient name:", error);
      }
    }

    fetchPatientName();
  }, []); // This effect will run when patientId changes

  return (
    <>
      <Navbar />
      <div className="two-containers-docks">
        <Sidebar />

        <div className="container14">
          
          <h2 className="f14">Medical Form</h2> 
         
          <Link to="/forms">
          {" "}
         <BsXCircle className=" close-button1ae4" onClick={handleClear}/>
        </Link>
          <form>
          
            <label>
              Patient ID:
              <input
                type="text"
                name="patientId"
                value={patientId}
                onChange={handleChange}
                disabled
              />
              <div className="error">{formErrors.patientId}</div>
            </label>
            <label>
              Patient Name:
              <input
                type="text"
                name="patientName14"
                value={patientName} // Display the fetched patient name
                onChange={handleChange}
              />
              <div className="error">{formErrors.patientName14}</div>
            </label>
           
            <label>
              Treatment From:
              <input
                type="date"
                name="treatmentFrom14"
                value={formData.treatmentFrom14}
                onChange={handleChange}
                required
              />
              <div className="error">{formErrors.treatmentFrom14}</div>
            </label>
            
            <label>
              Treatment To:
              <input
                type="date"
                name="treatmentTo14"
                value={formData.treatmentTo14}
                onChange={handleChange}
                required
              />
              <div className="error">{formErrors.treatmentTo14}</div>
            </label>
            
            <label>
              Treatment For:
              <input
                type="text"
                name="treatmentFor14"
                value={formData.treatmentFor14}
                onChange={handleChange}
                required
              />
              <div className="error">{formErrors.treatmentFor14}</div>
            </label>
            
            <label>
              Resume Duty From:
              <input
                type="date"
                name="resumeDutyFrom14"
                value={formData.resumeDutyFrom14}
                onChange={handleChange}
                required
              />
              <div className="error">{formErrors.resumeDutyFrom14}</div>
            </label>
            
            {/* Add other input fields here */}
            <button className="button14" type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mc;
