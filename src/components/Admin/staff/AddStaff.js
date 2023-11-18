import React, { useState, useEffect, } from 'react';
import './staff.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import staff1 from './staff1.jpg'

const AddStaff = () => {
  const [isPopupOpen14, setIsPopupOpen14] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [generatedID, setGeneratedID] = useState('');
  const [nextStaffId, setNextStaffId] = useState('');

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;

    try {
        const departmentAbbreviation = selectedDepartment.substring(0, 3).toUpperCase();
        const response = await axios.get(`http://localhost:5000/api/GetNextStaffId/${departmentAbbreviation}`);

        if (response.data.success) {
            const nextStaffId = response.data.staffId;
            console.log('Next Staff ID:', nextStaffId);
            setGeneratedID(nextStaffId); // Update the state with the formatted ID
        } else {
            alert('Failed to retrieve the next staff ID for the department.');
        }
    } catch (error) {
        alert('An error occurred while fetching the next staff ID.');
        console.error(error);
    }
};

  
  
  const handleSubmit14 = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    try {
      // Fetch the current department from the form data
      const department = formObject.specialization.toLowerCase();
  
      // Add the generated ID to the form data
      formObject.staffid = generatedID;
  
      // Send a request to add the staff with the generated ID
      await axios.post('http://localhost:5000/api/Addstaff', formObject);

      // Send a separate request to add the staff summary with only 'staffid,' 'password,' and 'specialization'
      const staffSummaryData = {
        staffid: formObject.staffid,
        password: formObject.password,
        specialization: formObject.specialization,
      };
      await axios.post('http://localhost:5000/api/addlogin', staffSummaryData);
  
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
        <NavBar />
        <Sidebar />
       
      </div>
      <div className='sk14shead'>
        <div className="button-container14">
          <button onClick={openPopup14} className="add-button14">
            Staff Registration
          </button>
          <Link to="/Addstaff">
            <button className="view-button14">Staff List</button>
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
                  <label>Department<span>*</span></label>
                  <select
                    className="doctor-form-dropdownl14"
                    name="specialization"
                    required
                    onChange={handleDepartmentChange}
                    defaultValue="reception" // Set the default value to "reception"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="reception">Reception</option>
                    <option value="laboratory">Laboratory</option>
                    <option value="admin">Admin</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>

                <div className="doctor-form-group14">
                  <label>Staff Id<span>*</span></label>
                  <input
                    type="text"
                    className="doctor-form-control14"
                    name="staffid"
                    value={generatedID}
                    readOnly
                  />

                </div>


                <div className="doctor-form-group14">
                  <label>Name<span>*</span></label>
                  <input type="text" className="doctor-form-control14" name="name" required />
                </div>
                <div className="doctor-form-group14">
                  <label>Password<span>*</span></label>
                  <input type="password" className="doctor-form-control14" name="password" required />
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

                <div className="doctor-form-group14 center">
                  <button type="submit" className='submit-button14'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
          <img className='addstaff-image' src={staff1}  />
      </div>
    </>
  );
};

export default AddStaff;