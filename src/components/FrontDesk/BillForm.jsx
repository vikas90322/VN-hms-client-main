import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import "./BillForm.css";
import axios from "axios";
import PatientNav from "./PatientNav";

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const BillingForm = () => {
  const [currentData, setCurrentData] = useState([]);
  const [totalDue, setTotalDue] = useState(0);

  // useEffect(() => {
  //   const fetchBillingData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
    
  //       if (Array.isArray(response.data)) {
  //         setCurrentData(response.data);
    
  //         // Calculate the total due
  //         const dueSum = response.data.reduce((sum, item) => {
  //           if (item.AmountStatus === "Not paid") {
  //             return sum + (item.totalAmount || 0);
  //           }
  //           return sum + (item.due || 0);
  //         }, 0);
    
  //         setTotalDue(dueSum);
  //       } else {
  //         // Handle the case where a single object is returned instead of an array
  //         setCurrentData([response.data]);
    
  //         // Calculate the total due for a single item
  //         setTotalDue(response.data.AmountStatus === "Not paid" ? (response.data.totalAmount || 0) : 0);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setCurrentData([]);
  //       setTotalDue(0);
  //     }
  //   };
    
  //   // Fetch data when the component mounts
  //   fetchBillingData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        console.log("Data from first collection:", combinedDataResponse.data);

        let mergedData = [];

        if (Array.isArray(combinedDataResponse.data)) {
          mergedData = combinedDataResponse.data;
        } else if (combinedDataResponse.data) {
          mergedData.push(combinedDataResponse.data);
        }

        try {
          const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
          console.log("Data from second collection:", existingDataResponse.data);

          if (Array.isArray(existingDataResponse.data)) {
            mergedData = [...mergedData, ...existingDataResponse.data];
          } else if (existingDataResponse.data) {
            mergedData.push(existingDataResponse.data);
          }
        } catch (error) {
          console.error("Error fetching data from the second collection:", error);
        }

        setCurrentData(mergedData);
      } catch (error) {
        console.error("Error fetching data from the first collection:", error);
        setCurrentData([]);
      }
    };

    fetchData();
  }, []);

  // Fetch billing data along with existing patient data
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);

        if (Array.isArray(response.data)) {
          setCurrentData(response.data);

          // Calculate the total due
          const dueSum = response.data.reduce((sum, item) => {
            if (item.AmountStatus === "Not paid") {
              return sum + (item.totalAmount || 0);
            }
            return sum + (item.due || 0);
          }, 0);

          setTotalDue(dueSum);
        } else {
          // Handle the case where a single object is returned instead of an array
          setCurrentData([response.data]);

          // Calculate the total due for a single item
          setTotalDue(response.data.AmountStatus === "Not paid" ? (response.data.totalAmount || 0) : 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentData([]);
        setTotalDue(0);
      }
    };

    // Fetch data when the component mounts
    fetchBillingData();
  }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=600,height=600');
    
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
                <th>Bill</th>
                <th>Department</th>
                <th>Paid</th>
                <th>Billed</th>
                <th>Due</th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${item.date}</td>
                <td>${item.totalAmount}</td>
                <td>${item.items.map((item) => item.type).join(', ')}</td>
                <td>${item.AmountStatus}</td>
                <td></td>
                <td>${item.items.map((item) => item.price).join(', ')}</td>
                <td>${item.items.map((item) => item.discount).join(', ')}</td>
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

  const handleDelete = (id) => {
    const itemToDelete = currentData.find((item) => item._id === id);
  
    if (itemToDelete) {
      const newTotalDue = totalDue - itemToDelete.due;
  
      fetch(`http://localhost:5000/api/v1/combined-dataDelete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            // Successful deletion, no JSON response to parse
            setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
            setTotalDue(newTotalDue);
          } else {
            // Handle other status codes as needed
            console.error(`Failed to delete record, status code: ${response.status}`);
          }
        })
        .catch((error) => console.error("Error deleting record:", error));
    }
  };
  

  return (
    <div>
      <PatientNav />
      <div className="popup-overlay-a3_3">
        <div className="popup-a3">
          <div className="popup-a3_3">
            <h1 className="heading-a3_3">Total Due: ₹{totalDue}</h1>
            <table className="popup-table-3_3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bill</th>
                  <th>Department</th>
                  <th>Paid</th>
                  <th>Print</th>
                  <th>Due</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.totalAmount}</td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.type}</div>
                      ))}
                    </td>
                    <td>{item.AmountStatus}</td>
                    <td><AiFillPrinter onClick={() => handlePrint(item)} /></td>

                    {/* <td>₹{item.AmountStatus === "Not paid" ? `${item.totalAmount || 0}` : `${item.due || 0}`}</td> */}
                    <td>₹{item.AmountStatus === "Not paid" ? `${item.totalAmount || 0}` : `${item.due || 0}`}</td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.type}</div>
                      ))}
                    </td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.price}</div>
                      ))}
                    </td>
                    
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.discount}%</div>
                      ))}
                    </td>
                    <td
                      style={{ color: item.deleteColor, cursor: "pointer" }}
                      onClick={() => handleDelete(item._id)} 
                    >
                      <MdDelete />
                    </td>
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
