import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/AddBillLab.css";
import { MdEmail } from "react-icons/md";
import { AiTwotonePrinter } from "react-icons/ai";
import PopupNavbar from "./PapupNavbar";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// const id = localStorage.getItem("clickedTestId");
const patientIdLower = localStorage.getItem("labpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const AddBillLab = () => {
  const [data, setData] = useState([
    { serverName: "", unitPrice: 0, discount: 0 },
  ]);

  const handleAddRow = () => {
    const newRow = { serverName: "", unitPrice: 0, discount: 0 };
    setData([...data, newRow]);
  };

  // Bill form data
  // const [consultationFee, setConsultationFee] = useState(0);
  const [labreferal, setLabreferal] = useState("");
  // const [totalBalance, setTotalBalance] = useState();
  const [paymentMode, setPaymentMode] = useState("cash"); // Set the default value to "cash" or any other desired default option
  const [email, setEmail] = useState("");
  const [testData, setTestData] = useState([]);

  

  useEffect(() => {
    async function fetchTestData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/lab-services"
        ); // Replace with your API endpoint
        setTestData(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    }

    fetchTestData();
  }, []);

  // Define handleServerNameChange function
  const handleServerNameChange = (event, index) => {
    const newData = [...data];
    const selectedService = event.target.value;

    // const serviceInfo = {
    //   "Server 1": { unitPrice: 100 },
    //   "Server 2": { unitPrice: 150 },
    //   "Server 3": { unitPrice: 200 },
    // };

    const selectedTest = testData.find(
      (test) => test.testName === selectedService
    );

    newData[index].serverName = selectedService;

    if (selectedService !== "") {
      newData[index].unitPrice = selectedTest.testPrice;
    } else {
      newData[index].unitPrice = 0;
    }

    setData(newData);
  };

  const handleDeleteRow = (index) => {
    if (data.length > 1) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
    }
  };

  const [totalLabServicesFee, setTotalLabServicesFee] = useState(0);

  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      total += item.unitPrice * ((100 - item.discount) / 100);
    });
    setTotalLabServicesFee(total);
  }, [data]);

  const consultationFee = 50; // Set the dummy consultation fee

  const handlePay300 = async () => {
    const billData = {
      services: data.map((item) => {
        const discountedAmount = item.unitPrice - item.discount;
        return {
          name: item.serverName,
          price: item.unitPrice,
          discount: item.discount,
          discountedPrice: discountedAmount,
        };
      }),
      consultationFee,
      totalBalance:  totalLabServicesFee,
      paymentMode,
      email,
      labreferal,
      patientId: patientId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-bill",
        billData
      );
      window.alert("Bill data sent successfully:", response.data);
       // Reset the form after a successful payment
       setData([{ serverName: "", unitPrice: 0, discount: 0 }]);
       setLabreferal("");
       setPaymentMode("cash");
       setEmail("");
       setTotalLabServicesFee(0);
    } catch (error) {
      console.error("Error sending bill data:", error);
    }
  };

  // const handlePrintBill = () => {
  //   // Handle the "Print Bill" button click here.
  //   // You can implement the bill printing logic as needed.
  // };

  return (
    <>
      <PopupNavbar />
      <Link to="/labservicetable"> 
          <FaArrowCircleLeft  style={{fontSize:'40px'}}/>
        </Link>
      <div className="top-bar-06">
        <div className="search-bar-06">
        
          <hi>   Patient ID: {patientId}</hi>
          <h1>
            {/* labreferal: -
            <input
              className="labref_6"
              type="text"
              placeholder=""
              value={labreferal}
              onChange={(e) => setLabreferal(e.target.value)}
            />{" "} */}
            {/* <button className="search-button-06">save</button> */}
          </h1>
        </div>

        <div className="data-table-06">
          <table>
            <thead className="tablebill256">
              <tr>
                <th>Service Name</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={item.serverName}
                      onChange={(event) => handleServerNameChange(event, index)}
                    >
                      {/* <option value="">Select Service</option>
                      <option value="Server 1">Follow up consultation</option>
                      <option value="Server 2">
                        Complete blood count - CBC
                      </option>
                      <option value="Server 3">Select Service Name</option> */}
                      {/* Add more options as needed */}
                      <option value="">Select Service</option>
                      {testData.map((test) => (
                        <option key={test._id} value={test.testName}>
                          {test.testName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>₹{item.unitPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].discount = e.target.value;
                        setData(newData);
                      }}
                    />
                    %
                  </td>
                  <td>
                    {index === data.length - 1 && (
                      <button className="add-button-06" onClick={handleAddRow}>
                        Add
                      </button>
                    )}
                  </td>
                  <td>
                    {data.length > 1 && (
                      <button
                        className="search-button-06"
                        onClick={() => handleDeleteRow(index)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bill Form */}
          <div className="bill-form-06">
            {/* <div className="form-row-06">
              <label htmlFor="consultationFee">Consultation Fee:</label>
              <AiTwotonePrinter className="printer-icon-06" />
              <input
                type="number"
                id="consultationFee"
                value={consultationFee}
                readOnly // Make the field non-editable
                // onChange={(e) => setConsultationFee(e.target.value)}
              />
            </div> */}
            <div className="form-row-06">
              <label htmlFor="labServicesFee">Lab Services Fee:</label>
              <AiTwotonePrinter className="printer-icon-06" />
              <input
                type="number"
                id="labServicesFee"
                value={totalLabServicesFee}
                readOnly // Make the field non-editable
              />
            </div>

            <div className="form-row-06">
              <label>Total Balance:</label>
              <span>₹{ totalLabServicesFee}</span>
            </div>

            <div className="form-row-06">
              <label htmlFor="paymentMode">Payment Mode:</label>
              <select
                className="paymentmode_6"
                id="paymentMode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            <div className="button-container-06">
              <button onClick={handlePay300}>
                Pay Rs {totalLabServicesFee}
              </button>
            </div>
            {/* <div className="button-container-06">
              <button onClick={handlePrintBill}>
                <AiTwotonePrinter />
                Print Bill
              </button>
            </div> */}
            <div className="form-row-06">
              <MdEmail className="email-icon-06" />{" "}
              {/* Apply a class to the icon */}
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBillLab;
