import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../prescription/sidebar';
import Navbar from '../navbar/navbar';
import './addappointments.css'

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    recentVisit: '',
    vitals: '',
    time: '',
    wait: '',
    status: '',
    purpose: '',
  });
  

  // Function to handle input changes and update the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('form dara ',formData);
      await axios.post('http://localhost:5000/appointments', formData);
      alert('Saved Successfully');
    
    } catch (error) {
      alert('Error while logging in', error);
    }

    setFormData({
        id:'',
        name: '',
        recentVisit: '',
        vitals: '',
        time: '',
        wait: '',
        status: '',
        purpose: '',
    });
    
    
  };

  return (
    <div>

<Navbar />
      <div className='two-containers-docks'>
        <Sidebar />
        <div className='container321'>
      <h4 className='heading321'>Create New Appointment</h4>
      <form onSubmit={handleSubmit} className='form321' autoComplete='off'>
      <div >
          <label className='label321'>id:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Recent Visit:</label>
          <input
            type="date"
            name="recentVisit"
            value={formData.recentVisit}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Vitals:</label>
          <input
            type="text"
            name="vitals"
            value={formData.vitals}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Time:</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Wait:</label>
          <input
            type="text"
            name="wait"
            value={formData.wait}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <div>
          <label className='label321'>Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className='input321'
          />
        </div>
        <button type="submit" className='button321'>Create Appointment</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreateAppointment;