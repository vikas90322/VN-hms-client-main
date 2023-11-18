
import React, { useState, useEffect,  } from 'react';
import './staff.css';
import { Link , useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Navbar';
import Sidebar from '../Sidebar';

const AddStaff = () => {
  const [isPopupOpen14, setIsPopupOpen14] = useState(false);
  const [staffList, setStaffList] = useState([]);
  
  // useEffect(() => {
  //   fetchStaffList();
  // }, []);

  // const fetchStaffList = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/staff'); // Use '/staff' for consistency
  //     setStaffList(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

   
  const handleSubmit14 = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    try {
      const response = await axios.post('http://localhost:5000/staff', formObject); // Use '/staff' for consistency

      setIsPopupOpen14(false);
      
      alert('Staff registered successfully!');
    
    } catch (error) {
      alert('An error occurred while adding staff.');
      console.error(error);
    }
  };

  const openPopup14 = () => {
    setIsPopupOpen14(true);
  };

  const closePopup14 = () => {
    setIsPopupOpen14(false);
  };

  return (
    <>
    <div>
      <NavBar/>
      <Sidebar/>
     {/* <Navbar/> 
    <Sidebar/> */}
    </div>
    <div  className='sk14shead'>
      <div className="button-container14">
        <button onClick={openPopup14} className="add-button14">
          Add Staff
        </button>
        <Link to="/Addstaff">
          <button className="view-button14">View Staff</button>
        </Link>
      </div>

      {isPopupOpen14 && (
        <div className="popup14">
          <div className="popup-content14">
            <span className="close-button14" onClick={closePopup14}>
              &times;
            </span>
            <form className="doctor-form14" autoComplete="off" onSubmit={handleSubmit14}>
              <h2 className="doctor-heading14">Add Staff</h2>
              <div className="doctor-form-group14">
                <label>Name<span>*</span></label>
                <input type="text" className="doctor-form-control14" name="name" required />
              </div>
              <div className="doctor-form-group14">
                <label>Age<span>*</span></label>
                <input type="number" className="doctor-form-control14" name="age" required />
              </div>
              <div className="doctor-form-group14">
                <label>Gender<span>*</span></label>
                <select className="doctor-form-dropdownl14" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="doctor-form-group14">
                <label>Blood Group<span>*</span></label>
                <select className="doctor-form-dropdownl14" name="bloodgroup" required>
                  
                  <option value="">Select  Blood Group</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="doctor-form-group14">
                <label>Mobile Number<span>*</span></label>
                <input type="number" className="doctor-form-control14" name="mobilenumber" required />
              </div>
              <div className="doctor-form-group14">
                <label>Email<span>*</span> </label>
                <input type="email" className="doctor-form-control14" name="email" required />
              </div>
              <div className="doctor-form-group14">
                <label>Address<span>*</span></label>
                <textarea className="doctor-text-area14" name="address" required></textarea>
              </div>
              <div className="doctor-form-group14">
                <label>Degree<span>*</span></label>
                <input type="text" className="doctor-form-control14" name="degree" required />
              </div>
              <div className="doctor-form-group14">
                <label>Work Experience<span>*</span></label>
                <input type="number" className="doctor-form-control14" name="workexperience" required />
              </div>
              <div className="doctor-form-group14">
                <label>Department<span>*</span></label>
                <select className="doctor-form-dropdownl14" name="specialization" required>
                <option value="">Select Role</option>
                  <option>Reception</option>
                  <option>Nursing</option>
                  <option>Administration</option>
                  <option>Billing</option>
                </select>
              </div>
              <div className="doctor-form-group14 center">
                <button type="submit" className='submit-button14'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default AddStaff;
