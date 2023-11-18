import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './general.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import axios from 'axios';


function useHealthCondition(initialState) {
  const [state, setState] = useState(initialState);
  const [details, setDetails] = useState('');

  return { state, setState, details, setDetails };
}



function General() {
  const healthConditions = {
    diabetes: useHealthCondition('No'),
    hypertension: useHealthCondition('No'),
    typhoid: useHealthCondition('No'),
    arthritis: useHealthCondition('No'),
    cmr: useHealthCondition('No'),
  };
  const [activeButton, setActiveButton] = useState('General');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        diabetes: {
          state: healthConditions.diabetes.state,
          details: healthConditions.diabetes.details,
        },
        hypertension: {
          state: healthConditions.hypertension.state,
          details: healthConditions.hypertension.details,
        },
        typhoid: {
          state: healthConditions.typhoid.state,
          details: healthConditions.typhoid.details,
        },
        arthritis: {
          state: healthConditions.arthritis.state,
          details: healthConditions.arthritis.details,
        },
        cmr: {
          state: healthConditions.cmr.state,
          details: healthConditions.cmr.details,
        },
      };

      const response = await axios.post('http://localhost:5000/api/general', dataToSend);

      if (response.status === 200) {
        alert('Data saved successfully!');
      } else {
        alert('Error saving data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };


  const handleConditionChange = (condition, value) => {
    condition.setState(value);
  };

  
  return (
    <>
<Navbar/>
    <div className='two-containers-docks' >
    <Sidebar/>
  
    <div className='buttons-and-formcvvroyal'> 
      
     

<div className="button-containercvvroyaldiabetis">
      <button
        className={`button-generalcvvroyal ${activeButton === 'General' ? 'active' : ''}`}
        onClick={() => handleButtonClick('General')}
      >
        General
      </button>
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
  
  <div className="buttons-and-formcvvroyal2">
      {Object.keys(healthConditions).map((conditionKey) => (
        <div key={conditionKey} className="containercvvroyaldiabetis">
          <label className="labelcvvroyaldiabetis"> {conditionKey.charAt(0).toUpperCase() + conditionKey.slice(1)}: </label>
          <div className="radio-buttonscvvroyaldiabetis">
            <label className="labelcvvroyaldiabetis">
              <input
                type="radio"
                value="Yes"
                checked={healthConditions[conditionKey].state === 'Yes'}
                onChange={() => handleConditionChange(healthConditions[conditionKey], 'Yes')}
              />
              Yes
            </label>
            <label className="labelcvvroyaldiabetis">
              <input
                type="radio"
                value="No"
                checked={healthConditions[conditionKey].state === 'No'}
                onChange={() => handleConditionChange(healthConditions[conditionKey], 'No')}
              />
              No
            </label>
          </div>
          <textarea
            className="textareacvvroyaldiabetis"
            placeholder={`Additional information about ${conditionKey.toLowerCase()}...`}
            value={healthConditions[conditionKey].details}
            onChange={(e) => healthConditions[conditionKey].setDetails(e.target.value)}
          />
        </div>
      ))}
      <div className="button-containercvvroyal">
        <button className="buttonscvvroyaldiabetis" onClick={handleSave}>
          Save
        </button>
        
      </div>
    </div>
    </div>
    </div>
    
 
    </>
  );
}

export default General;