import React, { useState, useEffect } from "react";
import "./Existingpatient.css"; 
import Navbar from "./Navbar23";

import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ExistingPatient = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [alertMessage, setAlertMessage] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    gender: "",
    age: "",
    mobile: "",
    bloodGroup: "",
    email: "",
    address: "",
  });
  const [pid, ] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [selectedType, setSelectedType] = useState("type");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedAmountStatus, setselectedAmountStatus] = useState("");
  const [email, ] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [, setSelectedDoctorStaffId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const isInputValid = selectedType && unitPrice && discount;
  const totalAmount = addedItems.reduce((total, item) => {
    return total + (item.price - (item.price * item.discount) / 100);
  }, 0);

  const handleAddClick = () => {
    if (isInputValid) {
      setInputError(false);
      const newItem = {
        pid: pid,
        type: selectedType,
        price: unitPrice,
        discount: discount,
      };

      setAddedItems([...addedItems, newItem]);
      setUnitPrice("");
      setDiscount("");
      setSelectedType("");
      setShowAdditionalForm(true);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
    }
  };
  const handleSearch = () => {
    fetch(`http://localhost:5000/api/v1/combined-data?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentData(data);
        console.log("Fetched Data:", data);

        if (data.length > 0) {
          const firstPatient = data[0];
          setFormData({
            patientId: firstPatient.patientId || "",
            name: firstPatient.name || "",
            gender: firstPatient.gender || "",
            age: firstPatient.age || "",
            mobile: firstPatient.mobile || "",
            bloodGroup: firstPatient.bloodGroup || "",
            email: firstPatient.email || "",
            address: firstPatient.address || "",
          });
        } else {
          // Clear the form data if no matching patient is found
          setFormData({
            patientId: "",
            name: "",
            gender: "",
            age: "",
            mobile: "",
            bloodGroup: "",
            email: "",
            address: "",
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  const handleDeleteClick = (index) => {
    const updatedItems = [...addedItems];
    updatedItems.splice(index, 1);
    setAddedItems(updatedItems);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      patientData: {
        patientId: formData.patientId,
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
        mobile: formData.mobile,
        bloodGroup: formData.bloodGroup,
        email: formData.email,
        address: formData.address,
      },
      services: addedItems,
      appointment: {
        doctor: selectedDoctor,
        date: appointmentDate,
        duration: selectedDuration,
        staffid: selectedDoctorId, 
        time: `${selectedHour}:${selectedMinute} ${selectedTimeOfDay}`,
      },
      payment: {
        mode: selectedPaymentMode,
        amountStatus: selectedAmountStatus,
        email,
        totalAmount,
      },
      
    };
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/existingpatients-data",
        requestData
      );
      
      if (response.status === 201) {
        console.log("Patient added:", response.data);
        setAlertMessage("Data updated successfully");
      toast.success("Data updated successfully", {
        autoClose: 2000,
      });
        navigate('/Patient')
      } else {
        console.error("Failed to add patient");
      }
    }  catch (error) {
      console.error("Error:", error); 
    }
  };

  const handlePrintClick = () => {};
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleUnitPriceChange = (e) => {
    setUnitPrice(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleContinueClick = () => {
    setShowAdditionalForm(false);
    setShowBill(true);
  };

  const handleBackClick = () => {
    setShowAdditionalForm(false);
  };

  const isAdditionalFormValid =
    selectedDoctor &&
    appointmentDate &&
    selectedDuration &&
    selectedHour &&
    selectedMinute &&
    selectedTimeOfDay;

    useEffect(() => {
      fetch("http://localhost:5000/api/v1/combined-data")
        .then((response) => response.json())
        .then((data) => {
          setCurrentData(data);
          console.log("Fetched Data:", data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    
    

    useEffect(() => {
      const filteredPatient = currentData.find((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mobile.includes(searchTerm) ||
          item.patientId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    
      if (filteredPatient) {
        setFormData({
          patientId: filteredPatient.patientId || "",
          name: filteredPatient.name || "",
          gender: filteredPatient.gender || "",
          age: filteredPatient.age || "",
          mobile: filteredPatient.mobile || "",
          bloodGroup: filteredPatient.bloodGroup || "",
          email: filteredPatient.email || "",
          address: filteredPatient.address || "",
        });
      } else {
        // Clear the form data if no matching patient is found
        setFormData({
          patientId: "",
          name: "",
          gender: "",
          age: "",
          mobile: "",
          bloodGroup: "",
          email: "",
          address: "",
        });
      }
    }, [searchTerm, currentData]);
    
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );
        if (response.data.success) {
          const fetchedDoctors = response.data.data || [];
          console.log(response.data.data)

          // Check if there are doctors in the response
          if (fetchedDoctors.length > 0) {
            setDoctorList(fetchedDoctors);

            // Access the first doctor if available
            const selectedDoctor = fetchedDoctors[0];
            if (selectedDoctor) {
              setSelectedDoctorName(selectedDoctor.name);
              setSelectedDoctorStaffId(selectedDoctor.staffid);
            }
          } else {
            // Handle the case when there are no doctors
            console.error("No doctors found in the response.");
          }
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const selectedDoctorName = event.target.value;
    setSelectedDoctorName(selectedDoctorName);

    // Find the selected doctor's ID based on the name
    const doctor = doctorList.find(
      (doctor) => doctor.name === selectedDoctorName
    );
    if (doctor) {
      setSelectedDoctorId(doctor.staffid);
    }

    setSelectedDoctor(selectedDoctorName); // Update selectedDoctor
  };
  
  
  

  return (
    <>
      <Navbar onSearch={setSearchTerm} onSearchClick={handleSearch} />
      <div className="existing-patient-containers">
        <h2 className="Existing-patientname">Existing Patient Details</h2>
        <form className="existing-patient-form" onSubmit={handleFormSubmit}>
          <div className="rowsa">
            <div className="fo">
          <div className="form-group">
            <label className="existing-labels" htmlFor="pid">
              Patient ID:
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              className="ids"
              value={formData.patientId}
              onChange={(e) =>
                ({ ...formData, patientId: e.target.value })
              }readOnly
            />
          </div>
          <div className="roq">
          <div className="form-group">
            <label className="existing-labels" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="namess"
              value={formData.name}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly                                                                                 
            />
          </div>
          <div className="form-group">
            <label className="existing-labelsss" htmlFor="gender">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              className="genders"
              value={formData.gender}
              onChange={(e) =>
               ({ ...formData, name: e.target.value })
              }readOnly
            />
          </div>
          </div>
          
         <div className="roq">

         
          <div className="form-group">
            <label className="existing-labels" htmlFor="name">
              Age:
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="ages"
              value={formData.age}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly
            />
          </div>
          <div className="form-group">
            <label className="existing-labelssss" htmlFor="mobile">
              Mobile number:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="mobiles"
              value={formData.mobile}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly
            />
            </div>
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="name">
              Blood Group:
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              className="groups"
              value={formData.bloodGroup}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly
            />
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="email">
              Email:
            </label>
            <div>
            <input
              type="email"
              id="email"
              name="email"
              className="emails"
              value={formData.email}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly
            /></div>
          </div>
          <div className="form-group">
            <label className="existing-labelss" htmlFor="address">
              Address:
            </label>
            <div >
            <textarea
              type="text"
              id="address"
              name="address"
              className="addre"
              value={formData.address}
              onChange={(e) =>
                ({ ...formData, name: e.target.value })
              }readOnly
            />
            </div>
          </div>
          </div>
          <div className="de">
          <div className="input-table-container123">
            <table className="input-table12">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>Discount (%)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {addedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>₹{item.price}</td>
                    <td>{item.discount}%</td>
                    <td>
                      <button onClick={() => handleDeleteClick(index)}>
                        <AiOutlineDelete size={"20px"} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <select
                      className="select12"
                      value={selectedType}
                      onChange={handleTypeChange}
                    >
                      <option value="type">Select service</option>
                      <option value="consultation">Consultation</option>
                      <option value="followupconsultation">
                        follow-Up Consultation
                      </option>
                      <option value="freefollowup">Free followup</option>
                      <option value="operation">Operation</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="input23"
                      type="number"
                      value={unitPrice}
                      onChange={handleUnitPriceChange}
                    />
                  </td>
                  <td>
                    <input
                      className="input23"
                      type="number"
                      value={discount}
                      onChange={handleDiscountChange}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={handleAddClick} className="add-button12">
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {inputError && (
              <p className="message">Please enter required fields.</p>
            )}
          </div>
          {showAdditionalForm && !showBill && (
            <div className="additional-form-border additional-form">
              <div className="input-group">
                  <label className="label-with-border12" htmlFor="doctor">
                    Choose Doctor:
                  </label>
                  <select
                    className="input-field"
                    value={selectedDoctorName}
                    onChange={handleDoctorChange}
                  >
                    <option>Select doctor</option>
                    {doctorList.map((doctor) => (
                      <option key={doctor.staffid} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div className="input-group">
                  <label className="label-with-border12">
                    Doctor Staff ID:
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    value={selectedDoctorId}
                    readOnly 
                  />
                </div>
              <div className="input-group">
                <label
                  className="label-with-border12"
                  htmlFor="appointmentDate"
                >
                  Appointment Date:
                </label>
                <input
                  className="input-field"
                  type="date"
                  id="appointmentDate"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="label-with-border12" htmlFor="duration">
                  Duration:
                </label>
                <select
                  className="input-field"
                  id="duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option>Select duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              <div className="input-group">
                <label
                  className="label-with-border12"
                  htmlFor="appointmentTime"
                >
                  Appointment Time:
                </label>
                <div className="time-input">
                  <select
                    className="time-dropdown"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                  >
                    <option value="">Hour</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <select
                    className="time-dropdown"
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                  >
                    <option value="">Minute</option>
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    className="time-dropdown"
                    value={selectedTimeOfDay}
                    onChange={(e) => setSelectedTimeOfDay(e.target.value)}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="button-group">
                <button onClick={handleBackClick} className="back-button">
                  Back
                </button>
                <button className="btn btn-primary"
                  onClick={handleContinueClick}
                  disabled={!isAdditionalFormValid}
                >
                  Continue{" "}
                </button>
              </div>
              {inputError && (
                <p className="message">Please enter all fields.</p>
              )}
            </div>
          )}
          {!showAdditionalForm && addedItems.length > 0 && !showBill && (
            <div className="total-section">
              <label className="label-with-border12">Consultations</label>
              <span className="total-value">
                &nbsp;&nbsp;₹{totalAmount.toFixed(2)}
              </span>
              <br />
              <hr />
              <label className="label-with-border12">Total:</label>
              <span className="total-value">
                &nbsp;&nbsp;&nbsp;&nbsp;₹{totalAmount.toFixed(2)}
              </span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="create-bill-button"
                onClick={() => setShowBill(true)}
              >
                Create Bill
              </button>
            </div>
          )}
          {showBill && (
            <div className="total-section">
              <label className="label-with-border12">Consultations:</label>
              <span className="total-value">₹{totalAmount.toFixed(2)}</span>
              <hr />
              <label className="label-with-border12">Total Balance:</label>
              <span className="total-value">₹{totalAmount.toFixed(2)}</span>
              <div className="input-group">
                <label className="label-with-border12">Mode:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                  className="input-field"
                  value={selectedPaymentMode}
                  onChange={(e) => setSelectedPaymentMode(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="wallet">M-Wallet</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div className="input-group">
                <label className="label-with-border12">Amount Status:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                  className="input-field"
                  value={selectedAmountStatus}
                  onChange={(e) => setselectedAmountStatus(e.target.value)}
                >
                  <option value="----">select amount status</option>
                  <option value="paid">paid</option>
                  <option value="Not paid">Not paid</option>
                </select>
              </div>
              <div className="button-group">
                
              </div>

            </div>
          )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btnbtn-primary"
          onClick={handlePrintClick}
        >&nbsp;Submit
        </button>
        </div>
        </div>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
};

export default ExistingPatient;