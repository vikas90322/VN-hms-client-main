import React, { useState, useEffect } from "react";
import "./appointments.css";

import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";

import { FiPrinter } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { CgEnter } from "react-icons/cg";
import "../previousdata/previousdata.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
const [activePage, /*setActivePage*/] = useState(1);
  const staffPerPage = 8; 
 
  const [/*originalAppointments*/, setOriginalAppointments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  // const [state, setState] = useState("");
  // const [details, setDetails] = useState("");
  const [/*currentDateTime*/, setCurrentDateTime] = useState(new Date()); // Initialize with the current date and time
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    // Set up an interval to update the current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // const selectedPatientId = localStorage.getItem("selectedPatientId");

  const docstaffid = localStorage.getItem("staffid");

  useEffect(() => {
    const hasPageReloaded = localStorage.getItem("hasPageReloaded");
    if (!hasPageReloaded) {
      // Reload the page when the component mounts
      localStorage.setItem("hasPageReloaded", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    // Fetch specialization options from the API
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/Generalcase"
        );
        const responseData = response.data;
        console.log(responseData);
        setDiagnosis(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecializations();
  }, []);

  const [/*exsistingData*/, setExsistingData] = useState([]);

  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    // Fetch initial data when the component mounts
    axios
      .get("http://localhost:5000/api/v1/combined-data")
      .then((response) => {
        const appointmentsData = response.data.map((data) => ({
          ...data,
          patientId: data.patientId.toLowerCase(),
        }));
        // Fetch exsistingData from the other collection or API
        axios
          .get("http://localhost:5000/api/v1/existingpatients-data")
          .then((response) => {
            const exsistingData = response.data;
            setExsistingData(exsistingData);

            // Merge appointmentsData and exsistingData into one array
            const mergedData = [...appointmentsData, ...exsistingData];
            setCombinedData(mergedData);

            // Set both appointments and originalAppointments initially
            setAppointments(mergedData);
            setOriginalAppointments(mergedData);
          })
          .catch((error) => {
            console.error("Error fetching exsistingData:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching appointmentsData:", error);
      });
  }, []);

  const formatTime = (hour, minute, timeOfDay) => {
    // Convert hour and minute to strings and pad with leading zeros if necessary
    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");

    // Combine the formatted values with time of day
    return `${formattedHour}:${formattedMinute} ${timeOfDay}`;
  };

  const isToday = (inputDate) => {
    const today = new Date();
    const date = new Date(inputDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    // Fetch appointments as before

    // Set up an interval to update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleViewClick = (appointmentId) => {
    const selected = appointments.find(
      (data) => data.patientId.toLowerCase() === appointmentId.toLowerCase()
    );

    if (!selected) {
      console.error(`data with ID ${appointmentId} not found.`);
      return;
    }

    // Set the patientId in localStorage
    localStorage.setItem("selectedPatientId", selected.patientId);

    setSelectedAppointment(selected);
    console.log(selected);
    navigate("/prescription", { state: selected });
  };

  const handleSearch = () => {
    // Always filter the combinedData based on the searchTerm
    const filteredAppointments = combinedData.filter((data) =>
      data.patientId.includes(searchTerm.toLowerCase())
    );

    // Update the displayed appointments based on the filtered data
    setAppointments(filteredAppointments);
  };

  const filteredCombinedData = combinedData.filter(
    (data) => docstaffid === data.staffid && isToday(data.date)
  );

  const totalAppointmentsCount = filteredCombinedData.length;
  // s

  // const handlePageChange = (pageNumber) => {
  //   setActivePage(pageNumber);
  // };

  const displayedStaff = appointments.slice(
    (activePage - 1) * staffPerPage,
    activePage * staffPerPage
  );

  return (
    <>
      <Navbar />

      <div className="two-containers-docks">
        <div className="empid143appointments">
          {!selectedAppointment && (
            <div className="appoinments-empid143">
              <div className="Total-Appointments-empid143">
                <h4> Total Appointments ({totalAppointmentsCount})</h4>
                {docstaffid}
                {/* Search bar */}
              </div>
              <div className="search-empid143">
                <input
                  className="empid143inputsearch"
                  type="text"
                  placeholder="Search by ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button className="empid143buttonsearch" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div className="empid143currentDateTime">
                <h6 className="empiddt">Date:  {currentDate}</h6>
                <h6 className="empiddt">Time: {currentTime}</h6>
              </div>

              {/* <Link to='/addappointments'><button className='empid143addbutton'>CreateAppointment</button></Link> */}
            </div>
          )}

          {/* Display the table only if no data is selected */}
          {!selectedAppointment && (
            <table className="empid143table">
              <thead className="empid143head">
                <tr className="empid143row">
                  <th className="empid143h123">ID</th>
                  <th className="empid143h123">Name</th>
                  <th className="empid143h123">View</th>
                  <th className="empid143h123">Visit Date</th>
                  {/* <th className="empid143h123">Vitals</th> */}
                  <th className="empid143h123">Time</th>
                  <th className="empid143h123">Wait</th>
                  <th className="empid143h123">Status</th>
                  <th className="empid143h123">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {displayedStaff.map(
                  (data) =>
                    // Conditionally render table rows based on staffid and docstaffid equality
                    docstaffid === data.staffid &&
                    isToday(data.date) && (
                      <tr key={data.id} className="appointment123">
                        <td className="empid143b1">{data.patientId}</td>
                        <td className="empid143b1">{data.name}</td>
                        <td className="empid143b1">
                          <button
                            className="empid143view"
                            onClick={() => handleViewClick(data.patientId)}
                          >
                            View
                          </button>
                        </td>
                        <td className="empid143b1">{data.date.slice(0, 10)}</td>
                        {/* <td className="empid143b1">{data.staffid}</td> */}
                        <td className="empid143b1">
                          {formatTime(data.hour, data.minute, data.timeOfDay)}
                        </td>

                        <td className="empid143b1">{data.duration}min</td>
                        <td className="empid143b1">{data.AmountStatus}</td>
                        <td className="empid143b1">{data.items[0].type}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>

            
          )}
          {/* <ReactJsPagination
            activePage={activePage}
            itemsCountPerPage={staffPerPage}
            totalItemsCount={appointments.length}
            pageRangeDisplayed={8}
            onChange={handlePageChange}
            prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
            nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
            firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
            lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} //  
          /> */} 

          {/* Display selected data details */}
          {selectedAppointment && (
            <div>
              <header className="patient-name12">
                <h6>
                  {selectedAppointment.name} &nbsp;&nbsp;&nbsp;
                  {selectedAppointment.id}&nbsp;|&nbsp;7995453289
                </h6>
              </header>

              <div className="case-container">
                <table className="case-table">
                  <div className="case-div143">
                    <label>
                      {" "}
                      <FiPrinter />
                      &nbsp;Print
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                      <FaDownload />
                      &nbsp;Download
                    </label>
                    <br />
                    <br />
                    <label>
                      General &nbsp;&nbsp;
                      <CgEnter />
                    </label>
                    <br />
                  </div>
                  {Array.isArray(diagnosis) ? (
                    diagnosis.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td className="table-cell143">Other Comorbidities</td>
                        </tr>
                        <tr>
                          <td className="table-cell143">
                            Diabetic : {item.diabetes.state}
                          </td>
                        </tr>
                        <tr>
                          <td className="table-cell143">
                            Hypertension : {item.hypertension.state}
                          </td>
                        </tr>
                        <tr>
                          <td className="table-cell143">
                            Typhoid : {item.typhoid.state}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="table-cell143">
                            CMR : {item.cmr.state}
                          </td>
                        </tr>
                      </tbody>
                    ))
                  ) : (
                    // Handle the case where diagnosis is not an array, e.g., show an error message
                    <p>
                      Diagnosis data is not available or in an unexpected
                      format.
                    </p>
                  )}
                </table>
                <center>
                  <div className="consultation-detailes">
                    <button
                      className="newvisit-button"
                      onClick={() =>
                        navigate("/prescription", {
                          state: selectedAppointment,
                        })
                      }
                    >
                      CREATE NEW VISIT
                    </button>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>OR</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/previousdata">
                      <button className="old-visit">
                        Move and Continue 19 Aug 2023 Visit
                      </button>
                    </Link>
                    <br />
                    <br />
                    <p className="oldvisit-date">
                      {selectedAppointment.name} has come 3 days early (Actual
                      New Visit Date 1-Sep-2023 )
                    </p>
                    <h6>25 VISITS</h6>
                    <p>Since 09 Dec 2021</p>
                  </div>
                </center>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
