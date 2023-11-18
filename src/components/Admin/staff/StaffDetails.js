import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffdetails.css';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactJsPagination from 'react-js-pagination';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



const StaffTable = () => {
  const [staffList, setStaffList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const staffPerPage = 4; 

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/GetAllStaff');
      if (Array.isArray(response.data.data)) {
        // If the response data is an array, set it as the staff list
        setStaffList(response.data.data);
      } else {
        console.error('Invalid data received from the server:', response.data);
      }
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/DeleteStaff/${id}`);
      // Filter out the deleted item from the list
      const updatedStaffList = staffList.filter((staff) => staff._id !== id);
      setStaffList(updatedStaffList);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };


  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const displayedStaff = staffList.slice(
    (activePage - 1) * staffPerPage,
    activePage * staffPerPage
  );
  
  return (
    <>
   <NavBar/>
    <Sidebar/>
   <div className='main-container123'>
   <div className="back-arrow">
     <Link to='/staff'>
             <FaArrowCircleLeft /> 
             </Link>   
     <div className='heading678'>
      <h1 className='staff-details-heading'>Staff Details</h1>
      </div>
      </div>
      <div className="fetch-data14">
      <table className="staff-details-table">
        <thead className='staff-details-tb-header'>
          <tr className='sktr-14'>
            <th className='sk14s'>Staff Id</th>
            <th className='sk14s' >Name</th>
            <th className='sk14s'>Age</th>
            <th className='sk14s'>Gender</th>
            <th className='sk14s'>Blood Group</th>
            <th className='sk14s'>Ph N0</th>
            {/* <th className='sk14s'>Email</th> */}
            {/* <th className='sk14s'>Address</th> */}
            <th className='sk14s'>Degree</th>
            <th className='sk14s'>Exp</th>
            <th className='sk14s'>Department</th>
            <th className='sk14s'>Password</th>
            <th className='sk14s'>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedStaff.map((staff, index) => (
            <tr className='staffdetails-td' key={staff._id}>
              <td className='sk14k'>{staff.staffid}</td>
              <td>{staff.name}</td>
              <td>{staff.age}</td>
              <td>{staff.gender}</td>
              <td>{staff.bloodgroup}</td>
              <td>{staff.mobilenumber}</td>
              {/* <td>{staff.email}</td> */}
              {/* <td>{staff.address}</td> */}
              <td>{staff.degree}</td>
              <td>{staff.workexperience}</td>
              <td>{staff.specialization}</td>
              <td>{staff.password}</td>
              <td>
                <button  className='sk14bsk14' onClick={() => handleDelete(staff._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='negation-1' >
      <ReactJsPagination
            activePage={activePage}
            itemsCountPerPage={staffPerPage}
            totalItemsCount={staffList.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
            nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
            firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
            lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} //  
          />
          </div>
    </div>
    </div>
    </>
  );
};

export default StaffTable;