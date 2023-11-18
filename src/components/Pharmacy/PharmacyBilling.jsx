/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiEdit } from "react-icons/bi";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./PharmacyBilling.css";
import PharmacyNav from "./PharmacyNav";

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const initialPatientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const PharmacyBilling = () => {
 
  const [medicineData, setMedicineData] = useState({
    medicineName: "",
    price: "",
    quantity: 10,
    total: 0,
    amount: 0,
  });

  const [  ,setSelectedMedicineDetails] = useState({
    price: "",
    quantity: 10,
    total: 0,
    amount: 0,
  });

  const renderPatientDetails = () => {
    return `
    <div>
      <h2>Patient Details</h2>
      <p>Name: ${patientDetails.name}</p>
      <p>Gender: ${patientDetails.gender}</p>
      <p>Phone: ${patientDetails.phone}</p>
      <p>Email: ${patientDetails.email}</p>
      <p>Referred Doctor: ${patientDetails.referredDoctor}</p>
    </div>
  `;
  };

  const [pharmacyTable, setPharmacyTable] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [ , setGeneratedBillId] = useState(null);
  const [patientId, setPatientId] = useState(initialPatientId);
  const [isMedicineSelected, setIsMedicineSelected] = useState(false);

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    referredDoctor: "",
    billdate: new Date(),
  });

  const [medicineInput, setMedicineInput] = useState("");
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);
  const discountRef = useRef(null);
  const gstRef = useRef(null);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/combined-data/${patientId}`
      );
      const patient = response.data;

      const billDate = patient.billdate
        ? new Date(patient.billdate)
        : new Date();
      setPatientDetails({
        name: patient.name,
        gender: patient.gender,
        phone: patient.mobile,
        email: patient.email,
        referredDoctor: patient.referredBy,
        billdate: billDate,
      });
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fetchMedicineSuggestions = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/medicineSuggestions/${searchTerm}`
      );
      const suggestions = response.data;
      setMedicineSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching medicine suggestions:", error)
    }
  };

  useEffect(() => {
    if (medicineInput) {
      fetchMedicineSuggestions(medicineInput);
    } else {
      setMedicineSuggestions([]);
    }
  }, [medicineInput]);

  const handleMedicineSelection = async (selectedMedicine) => {
    try {
      if (!selectedMedicine) {
        // Don't make the API call if medicine name is empty
        return;
      }

      const encodedMedicineName = encodeURIComponent(selectedMedicine);
      const response = await axios.get(
        `http://localhost:5000/api/medicineDetails/${encodedMedicineName}`
      );

      const medicineDetails = response.data;

      setSelectedMedicineDetails({
        price: medicineDetails.price,
        quantity: medicineDetails.Quantity,
        total: medicineDetails.Total,
        amount: medicineDetails.Amount,
      });

      // Set the selected medicine to the newEntry
      setMedicineData({
        medicineName: selectedMedicine,
        price: medicineDetails.Price,
        quantity: medicineDetails.Quantity,
        total: medicineDetails.Total,
        amount: medicineDetails.Amount,
      });

      setMedicineInput("");
      setMedicineSuggestions([]);
      setIsMedicineSelected(true);
    } catch (error) {
      console.error("Error fetching medicine details:", error);
    }
  };

  const calculateTotalAndAmount = () => {
    const { quantity, price } = medicineData;
    const total = quantity * price;

    setMedicineData({
      ...medicineData,
      total,
    });
  };

  useEffect(() => {
    calculateTotalAndAmount();
  }, [medicineData.quantity, medicineData.price]);

  const handleAddToTable = async () => {
    if (!isMedicineSelected) {
      alert('Please select a medicine before adding to the table.');
      return;
    }
  
    const medicineWithDiscount = {
      ...medicineData,
      total: medicineData.total,
    };
  
    setPharmacyTable([...pharmacyTable, medicineWithDiscount]);
  
    // Update the pharmacy quantity in the backend
    try {
      await axios.put(`http://localhost:5000/api/updatePharmaQuantity/${medicineData.medicineName}`, {
        Quantity: medicineData.quantity,
      });
      console.log('Pharmacy quantity updated successfully.');
    } catch (error) {
      console.error('Error updating pharmacy quantity:', error);
    }
  
    setMedicineData({
      medicineName: '', // Clear the medicineName
      price: '',
      quantity: 10,
      total: 0,
      amount: 0,
    });
  
    setIsMedicineSelected(false); // Reset the selection state
  };
  
  
  
  

  const handleEditClick = (index) => {
    const updatedTable = [...pharmacyTable];
    updatedTable[index].editing = !updatedTable[index].editing;
    setPharmacyTable(updatedTable);
  };
  
  const handleEditQuantity = (index, newQuantity) => {
    const updatedTable = [...pharmacyTable];
    updatedTable[index].quantity = newQuantity;
  
    // Recalculate the total after editing the quantity
    updatedTable[index].total = updatedTable[index].price * newQuantity;
  
    setPharmacyTable(updatedTable);
  };

  const handleDeleteRow = (index) => {
    const updatedTable = [...pharmacyTable];
    updatedTable.splice(index, 1);
    setPharmacyTable(updatedTable);
  };

//   const handlePatientSelection = (selectedPatientId) => {
//     setPatientId(selectedPatientId);
//     fetchPatientDetails(selectedPatientId.toString());
//   };

  const calculateSummary = () => {
    const subTotal = pharmacyTable.reduce(
      (acc, medicine) => acc + parseFloat(medicine.total),
      0
    );
    const discountedTotal = subTotal * (1 - discount / 100);
    const gstAmount = discountedTotal * (gst / 100);
    const netAmount = discountedTotal + gstAmount;

    // Round off to the nearest 10
    const roundedNet = Math.round(netAmount);
    const roundOff = Math.ceil(netAmount / 10) * 10;

    return {
      subTotal,
      discount,
      gst,
      netAmount: roundedNet,
      roundOff,
      billAmount: roundOff,
    };
  };

  const handleSearch = () => {
    fetchPatientDetails();
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || 0);
  };

  const handleGstChange = (e) => {
    setGst(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = async (billId) => {
    try {
      // Prepare data to be sent to the backend
      const dataToSend = {
        billId: billId,
        patientId,
        patientDetails,
        medicineData,
        pharmacyTable,
        discount: discountRef.current
          ? parseFloat(discountRef.current.value) || 0
          : 0,
        gst: gstRef.current ? parseFloat(gstRef.current.value) || 0 : 0,
        netAmount: calculateSummary().netAmount,
        roundOff: calculateSummary().roundOff,
        billAmount: calculateSummary().billAmount,
        paidAmount:
          parseFloat(document.getElementById("paidAmount").value) || 0,
        paymentMode: document.getElementById("paymentMode").value,
      };

      // Make a POST request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/pharmacy-billing",
        dataToSend
      );

      // Handle the response as needed (e.g., show a success message)
      console.log("Data submitted successfully", response.data);
      window.alert("Data submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleClearBill = () => {
    setPharmacyTable([]);
    setDiscount(0);
    setGst(0);
    setMedicineData({
      medicineName: "",
      price: "",
      quantity: 10,
      total: 0,
      amount: 0,
    });
  };

  const updateInventoryInBackend = async (medicinesToUpdateInventory) => {
    try {
      // Make an API request to your backend to update the inventory
      const response = await axios.post(
        "http://localhost:5000/api/update-inventory", // Replace with your actual API endpoint
        { medicines: medicinesToUpdateInventory }
      );

      console.log("Inventory updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating inventory:", error);
      // You can handle the error as needed, such as showing a user-friendly message.
    }
  };

  const handleSaveAndPrint = async () => {
    try {
      // Generate a unique bill ID
      const id = Math.floor(1000000000 + Math.random() * 9000000000);
      const uniqueBillId = `JC-P${id}`;
      setGeneratedBillId(uniqueBillId); // Set generatedBillId in the state
  
      // Set the bill date to the current date and time
      const billDate = new Date();
  
      // Extract medicine details for inventory update
      const medicinesToUpdateInventory = pharmacyTable.map((medicine) => ({
        name: medicine.medicineName,
        quantity: medicine.quantity,
      }));
  
      // Send a request to update the inventory
      await updateInventoryInBackend(medicinesToUpdateInventory);
  
      // Then, handle the save operation
      await handleSubmit(uniqueBillId);
  
      // Update the patientDetails with the new bill date
      setPatientDetails({
        ...patientDetails,
        billdate: billDate,
      });

      const gst = parseFloat(document.getElementById("gst").value) || 0;
const cgst = gst / 2;
const sgst = gst / 2;
  
const printContent = `
<html>
  <head>
    <title>Janani Clinic</title>
    <style>
      /* Add styles for the table and box here */
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
      }
      table, td {
        border: 1px solid black;
      }
      .bill-box {
        border: 1px solid #000;
        padding: 10px;
        width: 80%;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <div class="bill-box">
      <h1>Janani Clinic</h1>
      <p>Concord Garden City, Hemmigepura Ward 198, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098</p>
      <hr/>
      <p>GSTIN: 01ABCD01234A123</p>
      <p>Bill ID: ${uniqueBillId || 'Not generated'}</p>
      
      <p>Bill Date:${new Date(patientDetails.billdate).toLocaleDateString() || 'Not available'}</p>
      <hr/>
      ${renderPatientDetails()} 
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${pharmacyTable
            .map(
              (row) =>
                `<tr>
                <td>${row.medicineName}</td>
                <td>${row.price}</td>
                <td>${row.quantity}</td>
                <td>${row.total}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p>Discount (%): ${discount}%</p>
      <p>GST (%): ${gst}%</p>
      <p>SGST (%): ${sgst}%</p>
      <p>CGST (%): ${cgst}%</p>
      <p>Bill Amount: ${calculateSummary().billAmount}</p>
      <hr/>
      <p>Net Amount: ${calculateSummary().netAmount}</p>
      <p>Thank you for your purchase.</p>
    </div>
  </body>
</html>
`;


      // Create a new window for printing
      const printWindow = window.open("", "", "width=600,height=600");
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Initiate the print dialog
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };

      // Finally, handle the print operation
      handlePrint();
    } catch (error) {
      console.error("Error while saving and printing:", error);
    }
  };
  

  return (
    <>
      <PharmacyNav />
      <div className="main-pharmacy">
        <div className="pharmacy-billing-container">
          <div className="main-head-line">
            <h1 className="pharbill-title-n" ><Link to="/PharmacyHome">
            <FaArrowCircleLeft />
          </Link>&nbsp;Pharmacy Billing</h1>
            <label className="bill123">
            Bill Date:
            <DatePicker  className="pharbill-datepick"
              selected={patientDetails.billdate}
              onChange={(date) =>
                setPatientDetails({ ...patientDetails, billdate: date })
              }
              dateFormat="dd/MM/yyyy"
            />
          </label>
            <button className="clear-bill-button" onClick={handleClearBill}>
              Clear Bill
            </button>
          </div>
          <div className="search-box-pb">
            <input
              type="text"
              placeholder="Search Patient ID"
              value={patientId.toUpperCase()}
              onChange={(e) => setPatientId(e.target.value)}
            />&nbsp;
            <button className="search-box-pb-btn" onClick={handleSearch}>Search</button>
          </div>
          <div className="print-container12">
            <div className="patient-details">
              <div>Name: {patientDetails.name}</div>
              <div>Gender: {patientDetails.gender}</div>
              <div>Phone: {patientDetails.phone}</div>
              <div>Email: {patientDetails.email}</div>
              <div>Referred Doctor: {patientDetails.referredDoctor}</div>
            </div>
          </div>
          <div className="add-medicine">
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineData.medicineName}
              onChange={(e) => {
                setMedicineData({
                  ...medicineData,
                  medicineName: e.target.value,
                });
                fetchMedicineSuggestions(e.target.value);
              }}
            />
            {medicineSuggestions.length > 0 && (
              <div className="medicine-suggestions">
                {medicineSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="medicine-suggestion"
                    onClick={() => handleMedicineSelection(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder="Price"
              value={medicineData.price}
              onChange={(e) =>
                setMedicineData({ ...medicineData, quantity: e.target.value })
              }
              disabled
            />
            <input
              type="number"
              value={medicineData.quantity}
              onChange={(e) =>
                setMedicineData({ ...medicineData, quantity: e.target.value })
              }
            />
            <input type="text" value={medicineData.total} disabled />

            <button onClick={handleAddToTable}>Add</button>
          </div>
          <div className="print-container32">
            <div className="pharmacy-table">
              <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacyTable.map((row, index) => (
                    <tr key={index}>
                      <td>{row.medicineName}</td>
                      <td>{row.price}</td>
                      <td>
                        {row.editing ? (
                          <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) =>
                              handleEditQuantity(index, e.target.value)
                            }
                          />
                        ) : (
                          row.quantity
                        )}
                      </td>
                      <td>{row.total}</td>
                      <td>
  {row.editing ? (
    <button className="save-pb" onClick={() => handleEditClick(index)}>
      <FiSave size={20} />
    </button>
  ) : (
    <button className="edit-pb" onClick={() => handleEditClick(index)}>
      <BiEdit size={20} />
    </button>
  )}
</td>

                      <td>
                        <button className="delete-pb" onClick={() => handleDeleteRow(index)}>
                        <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="side-panel">
          <div>
            <label>Discount (%):</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="number"
              ref={discountRef}
              id="discount"
              placeholder="Enter discount"
              onChange={handleDiscountChange}
            />
          </div>
          <div>
            <label>GST (%):</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="number"
              ref={gstRef}
              id="gst"
              placeholder="Enter GST"
              onChange={handleGstChange}
            />
          </div>

          <div>
            <label>Net:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="number"
              value={calculateSummary().netAmount}
              disabled
            />
          </div>

          <div>
            <label>Round Off:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" value={calculateSummary().roundOff} disabled />
          </div>

          <div>
            <label>Bill Amount:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" value={calculateSummary().billAmount} disabled />
          </div>

          <div className="paid-amount">
          <select id="paymentMode" className="custom-dropdown">
  <option value="Cash">Cash</option>
  <option value="Card">Card</option>
  <option value="UPI">UPI</option>
</select>

            <input
              type="number"
              id="paidAmount"
              placeholder="Enter paid amount"
              value={paidAmount}
              onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="save-print">
            <button
              onClick={handleSaveAndPrint}
              disabled={paidAmount < calculateSummary().billAmount}
            >
              Save & Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyBilling;