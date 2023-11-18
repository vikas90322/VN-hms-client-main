import React, { useState, useEffect } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios";
import img1 from "./img1.jpg";
import PopupNavbar from "./PapupNavbar";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const patientIdLower = localStorage.getItem("labpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const VisitTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [labData, setLabData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); // Initialize selectedData as null
  // const [pre, setPre] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ setModalData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  // const [editingAppointment, setEditingAppointment] = useState(null);

  // const openModal = () => {
  //   setModalIsOpen(true);
  //   setModalData(item); // Set the data for the modal
  // };
  const openModal = (item) => {
    setModalIsOpen(true);
    setSelectedData(item);
  
    // Fetch patient data based on ID
    axios
      .get(`http://localhost:5000/api/labPatient/${item._id}`)
      .then((response) => {
        setModalData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  };
  

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedData(null);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {};

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch data from the first endpoint
        const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        console.log("Data from first collection:", combinedDataResponse.data);
  
        // Initialize an array to hold the merged data
        let mergedAppointments = [];
  
        // Check if data is present in the first response and add it to the merged array
        if (Array.isArray(combinedDataResponse.data)) {
          mergedAppointments = combinedDataResponse.data;
        } else if (combinedDataResponse.data) {
          mergedAppointments.push(combinedDataResponse.data);
        }
  
        // Fetch data from the second endpoint
        try {
          const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
          console.log("Data from second collection:", existingDataResponse.data);
  
          // Check if data is present in the second response and append it to the merged array
          if (Array.isArray(existingDataResponse.data)) {
            mergedAppointments = [...mergedAppointments, ...existingDataResponse.data];
          } else if (existingDataResponse.data) {
            mergedAppointments.push(existingDataResponse.data);
          }
        } catch (error) {
          // Handle the 404 error for the second request by setting an empty array
          console.error("Error fetching data from the second collection:", error);
        }
  
        // Update the state with the merged data
        setAppointments(mergedAppointments);
      } catch (error) {
        console.error("Error fetching data from the first collection:", error);
        // Handle the error case (e.g., show an error message or set an empty array)
        setAppointments([]);
      }
    };
  
    fetchAppointments();
    /*patientId */
  }, []);
  

  return (
    <>
      <PopupNavbar />
      <div>
      <Link to="/Billingforms"> 
      <FaArrowCircleLeft style={{fontSize:'7vh'}} />
    </Link> &nbsp;
        <table className="table-2" style={{ border: "none" }}>
          <thead>
            <tr>
              <th className="first-th-2">Date</th>
              <th>View</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item.date}>
              <td className="first-th-2">{item.date}</td>
              <td>Dr.{item.doctor}</td>
                <td className="View-2">
                  <AiFillPrinter onClick={() => openModal(item)} />
                </td>
                <td className="View1-2">
                  <AiFillMail onClick={() => openModal(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Page Modal"
        >
          <div className="page-container">
            <div className="text-2">
              <input
                type="text"
                placeholder="Phone no:"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button onClick={handleSearch}>
                {" "}
                <AiFillMail />
              </button>
            </div>
            <div className="header">
              <img src={img1} alt="Header Lab" />
              <div>
                <h1>health care</h1>
                <h2>consulting</h2>
              </div>
            </div>

            {selectedData && (
              <div className="lab-data">
                <ul>
                  <li key={selectedData._id}>
                    <div className="patient-info">
                      <p>1. Name: {selectedData.PageName}</p>
                      <p>Date: {selectedData.PageDate}</p>
                      <p>Height: {selectedData.PageHeight} Weight: 60kg</p>
                      <p>Complaint:{selectedData.PageComplaint}</p>
                      <p>Diagnosis:{selectedData.PageDiagnosis} </p>
                      <hr />
                      <p>
                        2. DOLO 650MG TABLE* 1-0-1 After Food-Daily-5Days
                        {selectedData.Page_DOLO_650MG_TABLE}
                        <br />
                        Composition:{selectedData.PageComposition}
                        <br />
                        Timing:{selectedData.PageTiming}
                      </p>
                      <hr />
                      <p>
                        3. ROSUVAS CV 10MG CAPSULE* 0-0-1
                        {selectedData.Page_ROSUVAS_CV_10MG_CAPSULE}
                        <br />
                        Composition:{selectedData.PageComposition1}
                        <br />
                        Timing:{selectedData.PageTiminG}
                      </p>
                      <hr />
                      <p>
                        4. CONCORAM 5MG TABLET* 0-0-1
                        {selectedData.Page_CONCORAM_5MG_TABLET}
                        <br />
                        Composition:{selectedData.Pagecomposition}
                        <br />
                        Timing:{selectedData.Pagetiming}
                      </p>
                      <hr />
                      <p>Advice </p>
                      <p>{selectedData.PageAdvice}</p>
                      <p> {selectedData.PageFruit}</p>
                      <p>{selectedData.PageSalt}</p>
                      <br />
                      <br />
                      <div className="Doctor-2">
                        <p>{selectedData.PageDoctor}</p>
                        <p>{selectedData.PageEducation}</p>
                        <p>{selectedData.PageCONSULTIN}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VisitTable;
