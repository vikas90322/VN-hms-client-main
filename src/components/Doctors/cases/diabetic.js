import React, { useState } from 'react';
import './diabetic.css'; // Import your CSS file
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Diabetic() {
  const [state, setState] = useState({
    medical: '',
    drugs: '',
    firstComplaint: '',
    patientTreatment: '',
    familyHistory: '',
    review: '',
  });

  const [activeButton, setActiveButton] = useState('Diabetes');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/diabetes', state);

      if (response.status === 200) {
        alert('Data saved successfully!');
      } else {
        alert('Error saving data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  }


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Navbar />
      <div className='two-containers-docks'>
        <Sidebar />

        <div className="diabetes-formdbfcvvroyal">
          <div className="button-containercvvroyaldiabetis">
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
                onClick={() => handleButtonClick('Dental')}
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
  </Link>  */}
           
          </div>

         <div className='diabetesmain-cvvroyal'>
          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="medical">Medical:</label>
            <textarea className='textareadbfcvvroyal'
              name="medical"
              id="medical"
              value={state.medical}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="drugs">Drugs:</label>
            <textarea className='textareadbfcvvroyal'
              name="drugs"
              id="drugs"
              value={state.drugs}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="firstComplaint">First Complaint:</label>
            <textarea className='textareadbfcvvroyal'
              name="firstComplaint"
              id="firstComplaint"
              value={state.firstComplaint}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="patientTreatment">Patient Treatment:</label>
            <textarea className='textareadbfcvvroyal'
              name="patientTreatment"
              id="patientTreatment"
              value={state.patientTreatment}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="familyHistory">Family History:</label>
            <textarea className='textareadbfcvvroyal'
              name="familyHistory"
              id="familyHistory"
              value={state.familyHistory}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="containerdbfcvvroyal">
            <label className='labeldbfcvvroyal' htmlFor="review">Review:</label>
            <textarea className='textareadbfcvvroyal'
              name="review"
              id="review"
              value={state.review}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="button-containerdbfcvvroyal">
            <button className="save-buttondbfcvvroyal" onClick={handleSave}>Save</button>
            
          </div>
          </div>
          </div>
        </div>
      
    </>
  );
}

export default Diabetic;
