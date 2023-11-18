import React, { useState } from 'react';
import './CSS/PrintPage.css';
import img1 from '../assests/img1.jpg';
import { AiFillMail } from 'react-icons/ai';
import Modal from 'react-modal'; // Import the react-modal library

export default function Page({ onSearch }) {
  const [modalIsOpen, setModalIsOpen] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>

      {/* <button onClick={openModal}>View Page</button> */}

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Page Modal"
      >
          <div className='text-2'>
      <input
        type="text"
        placeholder="Phone no:"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}> <AiFillMail /></button>
    </div>
        <div className="page-container">
      <div className="header">
        <img src={img1} alt="Header Image" />
        <div>
          <h1>health care</h1>
          <h2>consulting</h2>
        </div>
      </div>
      <div className="patient-info">
        <p>1. Name: Arun (50y, Male)</p>
        <p>Date: 23-Aug-2023</p>
        <p>Height: 160cm, Weight: 60kg</p>
        <p>Complaint: Fever, Cold, Headache</p>
        <p>Diagnosis: VIRAL FEVER HYPERTENSION</p>
      </div>
      <hr />
      <div className="prescription">
        <p>
          2. DOLO 650MG TABLE* 1-0-1 After Food-Daily-5Days
          <br />
          Composition: PARACETAMOL 650 MG
          <br />
          Timing: 1-After Breakfast 1-After Dinner
        </p>
        <hr />
        <p>
          3. ROSUVAS CV 10MG CAPSULE* 0-0-1
          <br />
          Composition: Rhinitis 75MG
          <br />
          Timing: 1-After Dinner
        </p>
        <hr />
        <p>
          4. CONCORAM 5MG TABLET* 0-0-1
          <br />
          Composition: Bisoprolol 5mg
          <br />
          Timing: 1-After Dinner
        </p>
        <hr />
      </div>
      <div className="advice">
        <h3>Advice</h3>
        <p>Exercise less salt</p>
        <p>Eat less processed meals</p>
        <p>Eat more fruits and vegetables</p>
        <p>MORE VEGETABLE</p>
        <p>Tests Prescribed: CBC, Blood Count, FBS</p>
        <p>Next visit 2 days after (25-Aug-2023, Friday)</p>
        <br />
        <div className="doctor-info">
          <p>Dr.Arun</p>
          <p>MBBSMD</p>
          <p>CONSULTIN PHYSICIAN</p>
        </div>
      </div>
    </div>
    </Modal>
        </div>
  
  );
}