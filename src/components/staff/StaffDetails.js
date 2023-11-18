import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffdetails.css';
import NavBar from '../Navbar';
import Sidebar from '../Sidebar';
const StaffTable = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      // Filter out the deleted item from the list
      const updatedStaffList = staffList.filter((staff) => staff._id !== id);
      setStaffList(updatedStaffList);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <>
   <NavBar/>
   <Sidebar/>
    <div className="fetch-data14">
      <h1 className="head14">Staff List :</h1>
      <table className="table-for-data14">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Degree</th>
            <th>Work Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff._id}>
              <td>{index + 1}</td>
              <td>{staff.name}</td>
              <td>{staff.age}</td>
              <td>{staff.gender}</td>
              <td>{staff.bloodgroup}</td>
              <td>{staff.mobilenumber}</td>
              <td>{staff.email}</td>
              <td>{staff.address}</td>
              <td>{staff.degree}</td>
              <td>{staff.workexperience}</td>
              <td>
                <button  className='sk14bsk14' onClick={() => handleDelete(staff._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default StaffTable;
