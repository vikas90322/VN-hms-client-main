import React, { useState, useEffect } from "react";

import { AiFillPrinter } from "react-icons/ai";
import "./CSS/BillingForm.css";
import PopupNavbar from "./PapupNavbar";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const patientIdLower = localStorage.getItem("labpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const BillingForm = () => {
  const [currentData, setCurrentData] = useState([]);
  const [, setTotalDue] = useState(0); // Initialize totalDue with 0

  useEffect(() => {
    // Fetch billing data from the server
    console.log(patientId);
    fetch(`http://localhost:5000/api/get-billBypId/${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        setCurrentData(data);

        
        const dueSum = data.reduce((sum, item) => sum + item.due, 0);
        setTotalDue(dueSum);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

  return (
    <div>
      <PopupNavbar />
      <div className="popup-overlay-a3_3">
        <div className="popup-a3">
          <div className="popup-a3_3">
            <Link to="/Appnt">
              <FaArrowCircleLeft style={{ fontSize: '40px' }} />
            </Link> &nbsp;
            
            <table className="popup-table-3_3" style={{ marginTop: "5vh" }}>
              <thead>
                <tr>
               
                  <th>Bill</th>
                  <th>Department</th>
                  <th>Paid</th>
                  <th>Billed</th>
                  <th>Price</th>
                
                  <th>Service</th>
                  <th>Discount</th>
                 
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                
                    <td>{item.billNo}</td>
                    <td>LAB</td>
                    <td>{item.paymentMode}</td>
                    <td>
                      <AiFillPrinter />
                      {item.totalBalance}
                    </td>
                    
                    <td>{item.services.map((subItem, idx) => (
                      <div key={idx}>{subItem.price}</div>
                    ))}</td>
                    <td>
                      {item.services.map((subItem, idx) => (
                        <div key={idx}>{subItem.name}</div>
                      ))}
                    </td>
                    
                    <td>{item.services.map((subItem, idx) => (
                      <div key={idx}>{subItem.discount}</div>
                    ))}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
