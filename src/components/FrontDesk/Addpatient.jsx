import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPrinter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Addpatient.css";
import Navbar23 from "./Navbar23";
function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function PatientDetails() {
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [pid, setPID] = useState(generateUniqueId());
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [idtype, setIdType] = useState("");
  const [idno, setIdNo] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
// ---------------------------------
const [sname, setSpouseName] = useState("");
const [sgender, setSpouseGender] = useState("");
const [sage, setSpouseAge] = useState("");
const [smobile, setSpouseMobile] = useState("");
const [sbloodGroup, setSpouseBloodGroup] = useState("");
const [semail, setSpouseEmail] = useState("");
const [sidtype, setSpouseIdType] = useState("");
const [sidno, setSpouseIdNo] = useState("");
const [soccupation, setSpouseOccupation] = useState("");
const [sincome, setSpouseIncome] = useState("");
// ------------------------------
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [selectedType, setSelectedType] = useState("type");
  const [unitPrice, setUnitPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDocDoctor, setSelectedDocDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [enteramount, setEnterAmount] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("AM");
  const [inputError, setInputError] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountpaid, setAmountPaid] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("cash");
  const [billingData, setBillingData] = useState({
    items: [],
    selectedDoctor: "",
    appointmentDate: "",
    selectedDuration: "",
    selectedHour: "",
    selectedTimeOfDay: "AM",
    selectedPaymentMode: "cash",
    selectedAmountStatus: "",
    email: "",
    pid: pid,
  });


  const servicePrices = {
    consultation: 100,
    surgery: 150,
    followupconsultation: 200,
    freefollowup: 0, 
    operation: 250,
  };


  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedDocDoctorName, setSelectedDocDoctorName] = useState("");
  const [selectedDoctorStaffId, setSelectedDoctorStaffId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDocDoctorId, setSelectedDocDoctorId] = useState("");
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateBillingData = (newBillingData) => {
    setBillingData(newBillingData);
  };
  const [selectedAmountStatus, setselectedAmountStatus] = useState("");
  
  const handleAddClick = () => {
    if (isInputValid) {
      setInputError(false);
      const newItem = {
        pid: pid,
        type: selectedType,
        price: unitPrice,
        selectdoctorname:selectedDoctorName,
        
      };

      setAddedItems([...addedItems, newItem]);
      setUnitPrice("");
      setDiscount("");
      setSelectedDoctorName("");
      setSelectedType("");
      setShowAdditionalForm(true);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    if (!isFormValid()) {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
      return;
    }

    const combinedData = {
      name,
      gender,
      age,
      mobile,
      bloodGroup,
      email,
      idtype,
      idno,
      occupation,
      income,
      sname,
      sgender,
      sage,
      smobile,
      sbloodGroup,
      semail,
      sidtype,
      sidno,
      soccupation,
      sincome,
      address,
      city,
      area,
      referredBy,
      items: addedItems,
      doctor: selectedDoctor,
      date: appointmentDate,
      duration: selectedDuration,
      hour: selectedHour,
      timeOfDay: selectedTimeOfDay,
      totalAmount: totalAmount,
      paymentMode: selectedPaymentMode,
      AmountStatus: selectedAmountStatus,
      staffid: selectedDoctorId, 
      moneyreceived: enteramount,
    };

    console.log(combinedData);

    localStorage.setItem("id", pid);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/combined-data",
      combinedData
    );
    console.log(response.data);

    window.alert("Patient added successfully");
    navigate("/Patient", { state: { patientName: name } });
    fetchPatients();
    if (response.status === 201) {
      console.log("Patient added:", response.data);
    } else {
      console.error("Failed to add patient");
    }
  } catch (error) {
    console.error(error);
  }
};
  
  const generateAndStorePatientId = () => {
    const id = generateUniqueId();
    localStorage.setItem("id", id);
    setPID(id); 
    return id;
  };

  useEffect(() => {
    const localPid = localStorage.getItem("id");
    if (!localPid) {
      generateAndStorePatientId();
    } else {
      setPID(localPid);
    }
  }, []);

  const handleDeleteClick = (index) => {
    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  const handleContinueClick = () => {
    const total = addedItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price);
      const discountedAmount = itemPrice;
      return acc + discountedAmount;
    }, 0);

    setTotalAmount(total);
    setShowAdditionalForm(false);
  };
  const isInputValid = selectedType && unitPrice  ;

  const handleDoctorChange = (event) => {
    const selectedDoctorName = event.target.value;
    setSelectedDoctorName(selectedDoctorName);
  
    const doctor = doctorList.find(
      (doctor) => doctor.name === selectedDoctorName
    );
    if (doctor) {
      setSelectedDoctorId(doctor.staffid);
      console.log("doctor.staffid"+doctor.staffid)
    }
  
    setSelectedDoctor(selectedDoctorName); 
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    const selectedServiceType = event.target.value;
    setSelectedType(selectedServiceType);

    setUnitPrice(servicePrices[selectedServiceType] || 0);
  };

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleselectdoctor = (event) => {
    setDiscount(event.target.value);
  };

  const handleBackClick = () => {
    setShowAdditionalForm(false);
  };
  const handlePrintClick = () => {
    window.print();
  };
  const isFormValid = () => {
    return (
      name &&
      gender &&
      age &&
      mobile &&
      bloodGroup &&
      email &&
      idtype &&
      idno &&
      occupation &&
      income &&
      sname &&
      sgender &&
      sage &&
      smobile &&
      sbloodGroup &&
      semail &&
      sidtype &&
      sidno &&
      soccupation &&
      sincome &&
      address &&
      city &&
      area &&
      referredBy &&
      addedItems.length > 0 &&
      selectedDoctor &&
      appointmentDate &&
      selectedDuration &&
      !isNaN(totalAmount) &&
      selectedPaymentMode &&
      selectedAmountStatus
    );
  };
  const isAdditionalFormValid =
    appointmentDate &&
    selectedDuration &&
    selectedHour ;
    // selectedMinute;

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/combined-data"
      );
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBarcodeScan = (barcodeValue) => {
    const patient = patients.find((patient) => patient.id === barcodeValue);
    if (patient) {
      setSelectedPatient(patient);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        if (response.data.success) {
          const fetchedDoctors = response.data.data || [];
          console.log(response.data.data);

          if (fetchedDoctors.length > 0) {
            setDoctorList(fetchedDoctors);

            const selectedDoctor = fetchedDoctors[0];
            if (selectedDoctor) {
              setSelectedDoctorName(selectedDoctor.name);
              setSelectedDoctorStaffId(selectedDoctor.staffid);
            }
          } else {
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

  return (
    <>
    <Navbar23/>
      <div className="Addpatient-form">
        <h1 className="t-patient">Hospital Reception System</h1>
        <form className="a-form" onSubmit={handleFormSubmit}>
        <div className="total-content">
        
          <div className="top-content" >
          <div className="p-name" >
          <label className="p-details" >Patient Details</label>
          <label className="label-heading">Name:</label>
          <input
            className="name-input"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="a-2row">
            <div className="gen-1">
            <label className="label-heading">Gender:</label>
          <select
            className="p-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
            </div>
            <div className="p-age">
            <label className="label-page">Age:</label>
          <input
            className="p-age-input"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
            </div>
          </div>
          
          
          <label className="label-heading">Mobile:</label>
          <input
            className="p-m-no"
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
           <div className="a-3row">
            <div className="gen-2">
            <label htmlFor="BlooGroup" className="label-heading">
            BloodGroup:
          </label>
          <select
            className="p-bgroup"
            id="Blood Group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
            </div>
            <div className="p-email">
            <label className="label-pemail">Email:</label>
          <input
            className="input-pemail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
            </div>
          </div>

          <div className="a-4row">
            <div className="gen-3">
            <label htmlFor="Govt id" className="label-heading">
            Select Type:
          </label>
          <select
            className="id-type"
            id="Govt Id"
            value={idtype}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="">Select ID</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Driving Licence">Driving Licence</option>
          </select>
            </div>
            <div className="p-idno">
            <label className="label-pidno">ID No:</label>
          <input
            className="input-pidno"
            type="text"
            value={idno}
            onChange={(e) => setIdNo(e.target.value)}
            required
          />
            </div>
          </div>
          <div className="a-5row">
            <div className="gen-4">
            <label htmlFor="Govt id" className="label-heading">
            Occupation:
          </label>
          <input
            className="p-occupation"
            id="Govt Id"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          >
          </input>
            </div>
            <div className="p-income">
            <label className="label-pincome">Income:</label>
          <input
            className="input-pincome"
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
            </div>
          </div>

          <label className="label-heading">Address:</label>
          <input
            className="input-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <div className="rows-ca">
            <div className="p-city">
            <label className="label-heading">City:</label>
          <input
            className="input-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
            </div>
            <div className="p-area">
            <label className="label-heading">Area:</label>
          <input
            className="input-area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
            </div>
          </div>
          
         
          <label className="label-heading">ReferredBy:</label>

          <input
            className="input-refby"
            type="text"
            value={referredBy}
            onChange={(e) => setReferredBy(e.target.value)}
            required
          />
          </div>

{/* ----------------------------------------------------------- */}
          <div className="s-name" >
          <label className="s-details" >Spouse/ Guardian Details</label>
          <label className="s-label-heading">Name<span className="mandatory">*</span>:</label>
          <input
            className="s-name-input"
            type="name"
            value={sname}
            onChange={(e) => setSpouseName(e.target.value)}
            required
          />
          <div className="s-a-2row">
            <div className="s-gen-1">
            <label className="s-label-heading">Gender<span className="mandatory">*</span>:</label>
          <select
            className="s-gender"
            value={sgender}
            onChange={(e) => setSpouseGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
            </div>
            <div className="s-age">
            <label className="s-label-page">Age<span className="mandatory">*</span>:</label>
          <input
            className="s-age-input"
            type="number"
            value={sage}
            onChange={(e) => setSpouseAge(e.target.value)}
            required
          />
            </div>
          </div>
          
          
          <label className="s-label-heading">Mobile<span className="mandatory">*</span>:</label>
          <input
            className="s-m-no"
            type="number"
            value={smobile}
            onChange={(e) => setSpouseMobile(e.target.value)}
            required
          />
           <div className="s-a-3row">
            <div className="s-gen-2">
            <label htmlFor="BlooGroup" className="s-label-heading">
            BloodGroup:
          </label>
          <select
            className="s-bgroup"
            id="Blood Group"
            value={sbloodGroup}
            onChange={(e) => setSpouseBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
            </div>
            <div className="s-email">
            <label className="label-semail">Email:</label>
          <input
            className="input-semail"
            type="text"
            value={semail}
            onChange={(e) => setSpouseEmail(e.target.value)}
            required
          />
            </div>
          </div>

          <div className="s-a-4row">
            <div className="s-gen-3">
            <label htmlFor="Govt id" className="s-label-heading">
            Select ID<span className="mandatory">*</span>:
          </label>
          <select
            className="s-id-type"
            id="Govt Id"
            value={sidtype}
            onChange={(e) => setSpouseIdType(e.target.value)}
          >
            <option value="">Select ID</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Driving Licence">Driving Licence</option>
          </select>
            </div>
            <div className="s-idno">
            <label className="label-sidno">ID No<span className="mandatory">*</span>:</label>
          <input
            className="input-sidno"
            type="text"
            value={sidno}
            onChange={(e) => setSpouseIdNo(e.target.value)}
            required
          />
            </div>
          </div>
          <div className="s-a-5row">
            <div className="s-gen-4">
            <label htmlFor="Govt id" className="s-label-heading">
            Occupation:
          </label>
          <input
            className="s-occupation"
            id="Govt Id"
            value={soccupation}
            onChange={(e) => setSpouseOccupation(e.target.value)}
          >
          </input>
            </div>
            <div className="s-income">
            <label className="label-sincome">Income:</label>
          <input
            className="input-sincome"
            type="text"
            value={sincome}
            onChange={(e) => setSpouseIncome(e.target.value)}
            required
          />
            </div>
          </div>
        </div>

      </div>
          <div className="below-content">
            <div className="below-content-1">
               <div className="below-content-2">
                 <div className="user-input">
                   <div className="input-table-container-patient">
                     <table className="input-table-content">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Doctor Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {addedItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.selectdoctorname}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <button className="delete-icon" onClick={() => handleDeleteClick(index)}>
                          <AiOutlineDelete className="" size={"20px"} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <select
                        className="select-service"
                        value={selectedType}
                        onChange={handleTypeChange}
                      >
                        <option className="Size" value="type">Select service</option>
                        <option value="consultation">Consultation</option>
                        <option value="surgery">Surgery</option>
                        <option value="followupconsultation">
                          follow-Up Consultation
                        </option>
                        <option value="freefollowup">Free followup</option>
                        <option value="operation">Operation</option>
                      </select>
                    </td>
                    <td>
                    <select 
                     htmlFor="doctor"
                    className="select-service-dname"
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
                    </td>
                    <td>
                      <input
                        className="input-prize"
                        type="number"
                        value={unitPrice}
                        onChange={handleUnitPriceChange}
                      />
                    </td>
                    
                    <td>
                      <button type="button" onClick={handleAddClick} className="add-button1234">
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              </div>
            </div>
            
            <br/>
            <div className="fro">
            {showAdditionalForm && !showBill && (
              <div className="additional-form-borders additional-form">
                <div className="row-n">
                <div className="input-group-n">
                  
                </div>

                
                </div>

                <div className="rowp">
                <div className="input-group-n">
                  <label
                    className="label-with-border12"
                    htmlFor="appointmentDate"
                  >
                    Appointment Date:
                  </label>
                  <input
                    className="input-fieldi-date"
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group-k">
                  <label className="label-with-border12" htmlFor="duration">
                    Duration:
                  </label>
                  <div className="qiu">
                  <select
                    className="input-fieldr-duration"
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
                </div>
                </div>
                <div className="rowp">
                <div className="input-group-n-p">
                  <div className="row9-g">
                    <div className="tr">
                  <label
                    className="label-with-border12e"
                    htmlFor="appointmentTime"
                  >
                    AppointmentTime:
                  </label>
                  </div>
                  <div className="g">
                  <div className="time-inputs">
                    
                    
                    <input 
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}  
                    type="time" className="input-time-select"/>
                  </div>
                  </div>
                  </div>
                </div>
               

                <div className="button-groups">
                  <button onClick={handleBackClick} className="back-button">
                    Back
                  </button>
                  <button
                    onClick={handleContinueClick}
                    disabled={!isAdditionalFormValid}
                    className="cont"
                  >
                    Continue{" "}
                  </button>
                </div>
                </div>
                {inputError && (
                  <p className="message">Please enter all fields.</p>
                )}
              </div>
            )}
            {!showAdditionalForm && addedItems.length > 0 && !showBill && (
              <div className="total-section">
                <label className="label-with-border120">Consultations</label>
                <span className="total-value">
                  &nbsp;&nbsp;₹{totalAmount.toFixed(2)}
                </span>
                <br />
                <hr />
                <label className="label-with-border120">Total:</label>
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
                <label className="label-with-border120">Consultations:</label>
                <span className="total-value">₹{totalAmount.toFixed(2)}</span>
                <hr />
                <label className="label-with-border120">Total Balance:</label>
                <span className="total-value">₹{totalAmount.toFixed(2)}</span>
                <div className="input-group">
                  <label className="label-with-border120">Mode:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>
                  <select
                    className="input-fieldg"
                    value={selectedPaymentMode}
                    onChange={(e) => setSelectedPaymentMode(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="wallet">M-Wallet</option>
                    <option value="online">Online</option>
                  </select>
                  </div>
                </div>
                <div className="input-group">
                  <label className="label-with-border120">Amount Status:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>
                  <select
                    className="input-fieldg"
                    value={selectedAmountStatus}
                    onChange={(e) => setselectedAmountStatus(e.target.value)}
                  >
                    <option value="----">----</option>
                    <option value="paid">paid</option>
                    <option value="Not paid">Not paid</option>
                  </select>
                  </div>

                 <label className="label-with-border120">Amount Paid:</label><br/>
                 <input   value={enteramount}
                    onChange={(e) => setEnterAmount(e.target.value)}  
                     type="number" className="pa-paid-amount" ></input>
                
                </div>
                 
                <div className="button-group">
                  &nbsp;&nbsp;&nbsp;
                  
                  <br />
                  <br />
                  &nbsp;&nbsp;&nbsp;
                  
                </div>
                
              </div>
            )}
            </div>
            </div>
          </div>

          <button className="submittts" type="submit">Submit</button> <br/>
          <button
                    className="print-bill-button"
                    onClick={handlePrintClick}
                  >
                    <BsPrinter size={"20px"} />
                    &nbsp;Print Bill
                  </button>
          </div>

          </div>
        </form>

      </div>

   </>
  );
}

export default PatientDetails;