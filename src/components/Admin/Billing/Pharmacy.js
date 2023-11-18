import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import "./Pharmacy.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactJsPagination from "react-js-pagination";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const Pharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the backend API for Pharmacy billing
    axios
      .get("http://localhost:5000/api/pharmacy-billing")
      .then((response) => {
        console.log("Received pharmacy data:", response.data);
        setPharmacyData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pharmacyData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
     <NavBar/>
     <Sidebar/>
      <div className="pharma-container123">
        <div className="pharmacy-back-arrow">
          <Link to="/Billing">
            <FaArrowCircleLeft />
          </Link>
          <div className="heading6789">
            <h1 className="pharmacy-bill-heading">Pharmacy Billing Data</h1>
          </div>
        </div>
        <table border="1" className="admin-pharmacy-table">
          <thead>
            <tr className="tr-class-bg">
              <th className="sk14s">S.No</th>
              <th className="sk14s">Name</th>
              <th className="sk14s">Patient ID</th>
              <th className="sk14s">Invoice Number</th>
              <th className="sk14s">Date</th>
              <th className="sk14s">Total Amount</th>
              <th className="sk14s">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id.$oid}>
                <td>{index + 1}</td>
                <td>{item.patientDetails.name}</td>
                <td>{item.patientId}</td>
                <td>{item.billId}</td>
                <td>
                  {new Date(item.patientDetails.billdate).toLocaleDateString()}
                </td>
                <td>{item.paidAmount}</td>
                <td>{item.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactJsPagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={pharmacyData.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText={<span className="custom-pagination-arrow13"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
          nextPageText={<span className="custom-pagination-arrow13"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow13"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow13"><KeyboardDoubleArrowRightIcon/></span>} // Use custom content for the next arrow
        />
      </div>
    </div>
  );
};

export default Pharmacy;
