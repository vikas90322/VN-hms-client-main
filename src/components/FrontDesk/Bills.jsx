
import React, { useEffect, useState } from 'react';
// import { MdDelete } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import { Link } from "react-router-dom";
import './Bills.css';
import Navbar from './Navbar23';

const handleNameClick = (patientId, patientName) => {
  // Store patientId and patientName in localStorage
  localStorage.setItem("selectedrecPatientId", patientId);
  localStorage.setItem("selectedrecPatientName", patientName);
};

const Bills = () => {
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/combined-data')
      .then((response) => response.json())
      .then((data) => setCurrentData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const handlePrint = (item) => {
    
    const printWindow = window.open('', '', 'width=600,height=600');
    
    // Construct the HTML content to print
    const contentToPrint = `
      <html>
        <head>
          <title>Print Bill</title>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Service</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Billed</th>
                <th>Discount</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${item.date}</td>
                <td>${item.items.map((item) => item.type).join(', ')}</td>
                <td>${item.items.map((item) => item.price).join(', ')}</td>
                <td>${item.AmountStatus}</td>
                <td>${item.printerValue}</td>
                <td>${item.items.map((item) => item.discount).join(', ')}</td>
                <td>${item.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const filteredData = currentData.filter((item) => {
    return (
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.some((subItem) =>
        subItem.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
    <div>
    <div className="table-container45">
            <table className="popup-table-11-pp">
              <thead className="headcolor154">
                <tr >
                  <th>Date</th>
                  <th>PatientID</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Paid</th>
                  <th>Payment Mode</th>
                  <th>Billed</th>
                  <th>Discount</th>
                  <th>Bill</th>
                </tr>
              </thead>
              <tbody className="patientsdata30">
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    {/* <td>{item.patientId}</td> */}
                    <td>
                    <Link className='namepatient'
                        to={`/Appointment`}
                        onClick={() => handleNameClick(item.patientId, item.name)}
                      >
                        {item.patientId}
                      </Link>
                  </td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.type}
                        </div>
                      ))}
                    </td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.price}
                        </div>
                      ))}
                    </td>
                    <td>{item.AmountStatus}</td>
                    <td>{item.paymentMode}</td>
                    <td><AiFillPrinter onClick={() => handlePrint(item)} /></td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.discount}
                        </div>
                      ))}
                    </td>
                    <td>{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
        
    </>
  );
};

export default Bills;
