import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dentalform.css';
import Navbar from '../../navbar/navbar';
import Sidebar from '../../prescription/sidebar';

function DentalForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    occupation: '',
    address: '',
    email: '',
    phoneNumber: '',
    medicalAlert: '',
    covidHistory: '',
    outpatientNumber: '',
  });

  const [vaccinationHistory, setVaccinationHistory] = useState([]);
  const [activeButton, setActiveButton] = useState('Dental');

  const handleVaccinationToggle = (value) => {
    const updatedHistory = [...vaccinationHistory];

    if (updatedHistory.includes(value)) {
      updatedHistory.splice(updatedHistory.indexOf(value), 1);
    } else {
      updatedHistory.push(value);
    }

    setVaccinationHistory(updatedHistory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/dentalRegistration', {
        ...formData,
        vaccinationHistory,
      });

       alert('Saved Successfully');
      
      // You can reset the form fields here
      setFormData({
        name: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        occupation: '',
        address: '',
        email: '',
        phoneNumber: '',
        medicalAlert: '',
        covidHistory: '',
        outpatientNumber: '',
      });
      setVaccinationHistory([]);
    } catch (error) {
        alert('Error while Saving', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
<>

    <Navbar />
    <Sidebar />
      <div className='two-containers-docks'>
        

<div className='cvvroyaldentalmain'>
        <div className="button-containercvvroyaldental">
          <Link to='/case'>
            <button
              className={`button-generalcvvroyal ${activeButton === 'General' ? 'active' : ''}`}
              onClick={() => handleButtonClick('General')}
            >
              General
            </button>
            </Link>
            <Link to='/diabetic'>
              <button
                className={`button-diabetescvvroyal ${activeButton === 'Diabetes' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Diabetes')}
              >
                Diabetes
              </button>
            </Link>
            <Link to='/dental'>
              <button
                className={`button-diabetescvvroyal ${activeButton === 'Dental' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Diabetes')}
              >
                Dental
              </button>
            </Link>

           {/*  <Link to='/gynic'>
              <button
                className={`button-diabetescvvroyal ${activeButton === 'Gynic' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Gynic')}
              >
                Gynic
              </button>
  </Link> */}
           
          </div>

  <div className='main-container566'>
    <div className='empid144consultation-form'>
      <h2 className='empid144mh2'>Consultation Form</h2>

      <form className='empid144form' onSubmit={handleSubmit}>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="name">Name:</label>
          <input
            className='empid144inputs23'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="gender">Gender:</label>
          <select
            className='empid144inputs'
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="dateOfBirth">Date of Birth/Age:</label>
          <input
             className='empid144inputs890'
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="age">Age:</label>
          <input
            className='empid144inputs'
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="occupation">Occupation:</label>
          <input
            className='empid144inputs'
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="address">Address:</label>
          <input
            className='empid144inputs'
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="email">Email:</label>
          <input
            className='empid144inputs'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='empid144div'>
          <label className='empid144label1' htmlFor="phoneNumber">Phone Number:</label>
          <input
            className='empid144inputs'
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div  className='empid144additional-info'>
        <div className='empid144box1'>
          <label className='empid144label1' htmlFor="medicalAlert">Medical Alert:</label>
          <textarea
            className='empid144medinput'
        
            id="medicalAlert"
            name="medicalAlert"
            value={formData.medicalAlert}
            onChange={handleChange}
            
          />
        </div>
        <div className='empid144box2'>
          <h6 className='empid144label1'>Covid History:</h6>
          <div className='empid144-checkbox'>
            <label>
              <input
                className='empid144yesinput'
                type="radio"
                name="covidHistory"
                value="Yes"
                checked={formData.covidHistory === 'Yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                className='empid144noinput'
                type="radio"
                name="covidHistory"
                value="No"
                checked={formData.covidHistory === 'No'}
                onChange={handleChange}
              />
              No
            </label>
            </div>
            <div>
            <h6 className='empid144label1'>Vaccination History:</h6>
            
          <div className='empid144-checkbox'>
            {[1, 2, 3, 4].map((number) => (
              <label key={number}>
                <input
                  className='empid144numinput'
                  type="checkbox"
                  name={`vaccinationHistory${number}`}
                  value={number}
                  checked={vaccinationHistory.includes(number)}
                  onChange={() => handleVaccinationToggle(number)}
                />
                {number}
              </label>
            ))}
          </div>
          </div>
        </div>
        <div className='empid144box3'>
          <label htmlFor="outpatientNumber" className='empid144label1'>Outpatient Number:</label>
          <textarea
            className='empid144opinput'
            
            id="outpatientNumber"
            name="outpatientNumber"
            value={formData.outpatientNumber}
            onChange={handleChange}
            
          />
        </div>
        
        </div> 

        <div className='empid144submitb'>
          <button className='empid144subbuton1' type="submit">Save</button>
   <Link to='/dentalform2'> <button className='empid144nxtbuton' type="button">Next</button></Link>
        </div>
      </form>
    </div>
    </div>
    
    </div>
    </div>
    </>
  );
}

export default DentalForm;