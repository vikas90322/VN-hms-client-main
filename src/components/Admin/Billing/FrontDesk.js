// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './FrontDesk.css'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactJsPagination from 'react-js-pagination';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const logstaffid = localStorage.getItem("staffid");

function Frontdesk() {
  const [billingData, setBillingData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    // Fetch billing data from the backend
    axios.get('http://localhost:5000/api/v1/combined-data')
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pageCount = Math.ceil(billingData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const displayedBillingData = billingData.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <div >
      
      <NavBar/>
      <Sidebar/>
      <div className='frontpage-mainsk14'>
        <div className="front-desk-backarrow">
          <Link to='/Billing'>
            <FaArrowCircleLeft />
          </Link>

          <div className='heading6789'>
            <h1 className='frontdesk-billing-heading'>Frontdesk Billing Data</h1>
            {/* <h2>{logstaffid}</h2> */}
          </div>
        </div>
        <table className='frtbsk14'>
          <thead>
            <tr className='tr-class-bg'>
              <th className='sk14s2'>S.No</th>
              <th className='sk14s2'>Name</th>
              <th className='sk14s2'>Date</th>
              <th className='sk14s2'>Total Bill</th>
              <th className='sk14s2'>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {displayedBillingData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.totalAmount.toFixed(2)}</td>
                <td>{item.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactJsPagination 
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={billingData.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText={<span className="custom-pagination-arrow13-1"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
          nextPageText={<span className="custom-pagination-arrow13-1"><KeyboardArrowRightIcon /></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow13-1"><KeyboardDoubleArrowLeftIcon /></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow13-1"><KeyboardDoubleArrowRightIcon /></span>} //  
        />
      </div>
    </div>
  );
}

export default Frontdesk;
