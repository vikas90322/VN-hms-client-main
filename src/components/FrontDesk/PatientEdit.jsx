
import React, { useState, useEffect } from 'react';
import './PatientEdit.css';
import axios from 'axios';
import PatientNav from './PatientNav';

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const PatientEdit = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [existingId, setExistingId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [channel, ] = useState('');

  useEffect(() => {
    fetchPatientData();
  }, []);
  

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
      const patientData = response.data;
  
      setName(patientData.name);
      setGender(patientData.gender);
      setAge(patientData.age);
      setMobile(patientData.mobile);
      setExistingId(patientData.existingId);
      setBloodGroup(patientData.bloodGroup);
      setEmail(patientData.email);
      setAddress(patientData.address);
      setCity(patientData.city);
      setArea(patientData.area);
      setReferredBy(patientData.referredBy);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  

  const handleUpdate = async () => {
    const updatedData = {
      name,
      gender,
      age,
      mobile,
      existingId,
      bloodGroup,
      email,
      address,
      city,
      area,
      referredBy,
      channel,
    };
  
    try {
      await axios.put(`http://localhost:5000/api/v1/combined-dataUpdatepid/${patientId}`, updatedData);
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    <>
    <div>
    <PatientNav/>-
      <div className="popup-overlay-2">
        <div className="popup-2">
          <div className="popup-c2">
            <h2>Edit page</h2>
            <div className="columns-2">
              <div className="col-02">
                <div className="input-group-2">
                  <span>Name:</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>Gender:</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="input-group-2">
                  <span>Age:</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>Mobile:</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>BloodGroup:</span>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="input-group-2">
                  <span>setExistingId:</span>
                  <input
                    type="text"
                    value={existingId}
                    onChange={(e) => setExistingId(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-2_1">
                <div className="input-group-2">
                  <span>Email:</span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>Address:</span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>City:</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>Area:</span>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <div className="input-group-2">
                  <span>ReferredBy:</span>
                  <input
                    type="text"
                    value={referredBy}
                    onChange={(e) => setReferredBy(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="but2" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientEdit;