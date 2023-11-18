import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/LabReport.css";
import Tablerow1 from "./TableRow";
import axios from 'axios';

const Test = ({ onClose }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [testStatus, setTestStatus] = useState("Booked");
  const [isTestCollected, setTestCollected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [ setCurrentDate] = useState("");
  const [ setCurrentHour] = useState("");
  const [ setCurrentMinute] = useState("");
  const [ setCurrentPeriod] = useState("");
  const [filledValues, setFilledValues] = useState(Array(14).fill({}));
  const [updateButtonVisible, setUpdateButtonVisible] = useState(true);
  const [ setViewButtonVisible] = useState(false);

  const [rows, setRows] = useState([]);

  const [modalContent, setModalContent] = useState({
    pid: "",
    name: "",
    refDoctor: "",
    collectedOn: "",
  });

  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(true);
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [submittedParameterData, setSubmittedParameterData] = useState({});


  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toISOString().split("T")[0]);
    setCurrentHour(now.getHours() % 12 || 12);
    setCurrentMinute(now.getMinutes());
    setCurrentPeriod(now.getHours() < 12 ? "AM" : "PM");

    const initialRows = Array(14).fill({
      parameter: "",
      result: "",
      units: "",
      interval: "",
    });
    setRows(initialRows);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setTestStatus("Collected");
    setTestCollected(true);
  };

  // const handleResultsClick = () => {
  //   setSelectedDate(currentDate);
  //   setSelectedHour(currentHour);
  //   setSelectedMinute(currentMinute);
  //   setSelectedPeriod(currentPeriod);
  //   setPopupOpen(true);
  //   setTestStatus("Booked");
  //   setTestCollected(false);
  //   setUpdateButtonVisible(true);
  //   setViewButtonVisible(false);
  //   setSubmittedData({}); // Reset submitted data
  // setSubmittedParameterData({}); // Reset submitted parameter data
  // };

  const handlePrint = () => {
    toast.success("Saved successfully");
  };

  const handleUpdateReport = () => {
    setTestStatus("Collected");
    setTestCollected(true);
    setPopupOpen(true);

    const updatedModalContent = {
      ...modalContent,
      collectedOn: `${selectedDate} ${selectedHour}:${selectedMinute} ${selectedPeriod}`,
    };
    setModalContent(updatedModalContent);

    setUpdateButtonVisible(false);
    setViewButtonVisible(true);
    setUpdatePopupOpen(true);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedFilledValues = [...filledValues];
    updatedFilledValues[index] = {
      ...updatedFilledValues[index],
      [field]: value,
    };
    setFilledValues(updatedFilledValues);
  };

  const handleViewReport = async (data, parameterData) => {
    setSubmittedData(data);
    setSubmittedParameterData(parameterData);
    setPopupOpen(false);
    setUpdatePopupOpen(false);
    setViewPopupOpen(true);

    try {
      const response = await axios.post("http://localhost:5000/api/reportdata", data);
      console.log("Data saved:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  const closeViewPopup = () => {
    setViewPopupOpen(false);
  };

  return (
    <div>
      <div>
        {isPopupOpen && (
          <div className="ppup1_4">
            <div className="popup-con_4">
              <div className="top-header_4">
                <h2>Update Test Report</h2>
                <button
                  className="close-button_4"
                  onClick={() => {setPopupOpen(false); onClose();}}
                >
                  X
                </button>
              </div>

              <div className="header-section_4">
                <div className="left-header_4">
                  <h2>
                    PID: <span>{modalContent.pid}</span>
                  </h2>
                  <h2>
                    Name: <span>{modalContent.name}</span>
                  </h2>
                </div>
                <div className="right-header_4">
                  <h2>
                    Ref Doctor: <span>{modalContent.refDoctor}</span>
                  </h2>
                  <h2>
                    {testStatus === "Booked" ? (
                      ""
                    ) : (
                      <span>Collected On: {modalContent.collectedOn}</span>
                    )}
                  </h2>
                </div>
              </div>

              {isTestCollected && (
                <Tablerow1
                  rows={rows}
                  handleRowChange={handleRowChange}
                  onSubmit={handleViewReport}
                />
              )}

              <div className="button-container_4">
                {updateButtonVisible && (
                  <button
                    className="update-button_4"
                    onClick={handleUpdateReport}
                  >
                    Update Report
                  </button>
                )}
              </div>

              {!isTestCollected && (
                <div className="date-input_4">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                  />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {isUpdatePopupOpen && (
          <div className="ppup1_4">
            <div className="popup-con_4">
              <div className="top-header_4">
                <h2>Update Test Report</h2>
                <button
                  className="close-button_4"
                  onClick={() => {setUpdatePopupOpen(false); onClose();}}
                >
                  X
                </button>
              </div>

              <div className="header-section_4">
                <div className="left-header_4">
                  <h2>
                    PID: <span>{modalContent.pid}</span>
                  </h2>
                  <h2>
                    Name: <span>{modalContent.name}</span>
                  </h2>
                </div>
                <div className="right-header_4">
                  <h2>
                    Ref Doctor: <span>{modalContent.refDoctor}</span>
                  </h2>
                  <h2>
                    {testStatus === "Booked" ? (
                      ""
                    ) : (
                      <span>Collected On: {modalContent.collectedOn}</span>
                    )}
                  </h2>
                </div>
              </div>

              {isTestCollected && (
                <Tablerow1
                  onSubmit={handleViewReport}
                  initialData={submittedData}
                  onClose={onClose}
                />
              )}

              <div className="button-container_4">
                {updateButtonVisible && (
                  <button
                    className="update-button_4"
                    onClick={handleUpdateReport}
                  >
                    Update Report
                  </button>
                )}
              </div>

              {!isTestCollected && (
                <div className="date-input_4">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                  />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {isViewPopupOpen && (
          <div className="ppup2_4">
            <div className="popup-con_4">
              <div className="top-header_4">
                <h2>View Test Report</h2>
                <button className="close-button_4"onClick={() => {
    closeViewPopup();
    onClose(); // Call onClose function here
  }}>
                  X
                </button>
              </div>

              <div className="header-section_4">
                <div className="left-header_4">
                  <h2>
                    PID: <span>{modalContent.pid}</span>
                  </h2>
                  <h2>
                    Name: <span>{modalContent.name}</span>
                  </h2>
                </div>
                <div className="right-header_4">
                  <h2>
                    Ref Doctor: <span>{modalContent.refDoctor}</span>
                  </h2>
                  <h2>
                    {testStatus === "Booked" ? (
                      ""
                    ) : (
                      <span>Collected On: {modalContent.collectedOn}</span>
                    )}
                  </h2>
                </div>
              </div>

              {isTestCollected && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>TEST PARAMETER</th>
                        <th>RESULT</th>
                        <th>UNITS</th>
                        <th>BIOLOGICAL REF,INTERVAL</th>
                        <th colSpan="3">ACT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(submittedData).map(
                        (parameter) =>
                          submittedData[parameter] && (
                            <tr key={parameter}>
                              <td className="left-align_4">{parameter}</td>
                              <td>{submittedData[parameter]}</td>
                              <td>{submittedParameterData[parameter].units}</td>
                              <td>
                                {submittedParameterData[parameter].referenceInterval}
                              </td>
                              <td colSpan="3">
                                <a href="#a">Range</a>
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="button-container_4">
                <button className="print-button_4" onClick={handlePrint}>
                  Print
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Test;