import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import "./Labtest.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactJsPagination from "react-js-pagination";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function App() {
  const [searchText, 
  /*setSearchText */] = useState("");
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState(null);
  const [/*files*/, setFiles] = useState([]);
  const [selectedRow, /*setSelectedRow*/] = useState(null); // Track the selected row
  const [patientNames, setPatientNames] = useState({});
  const [patientAmountStatus, setPatientAmountStatus] = useState({});
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully.");
        getFiles(); // Refresh the file list after a successful upload
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      alert("Error uploading file: " + error.message);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/get-files");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.data);
      } else {
        console.error("Error fetching files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleLinkClick = (patientId) => {
    // Store the patientId in local storage as "resultpatientid"
    localStorage.setItem("resultpatientid", patientId);

    // Navigate to the "TestDetails" page
    window.location.href = "/TestDetails";
  };

  const testsBackendURL = "http://localhost:5000/api/get-allBill";

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(testsBackendURL)
      .then((response) => {
        console.log(response); // Log the entire response
        setTableData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch patient names for all patient IDs in tableData
    const fetchPatientNames = async () => {
      const patientIds = tableData.map((item) => item.patientId);

      for (const patientId of patientIds) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/combined-data/${patientId}`
          );

          if (response.status === 200) {
            // Store the patient name in the patientNames state object
            setPatientNames((prevState) => ({
              ...prevState,
              [patientId]: response.data.name,
            }));
            setPatientAmountStatus((prevState) => ({
              ...prevState,
              [patientId] : response.data.AmountStatus,
            }));
          }
        } catch (error) {
          console.error(
            `Error fetching patient name for ID ${patientId}:`,
            error
          );
        }
      }
    };

    // Once you have the table data, trigger fetching patient names
    fetchPatientNames();
  }, [tableData]);

  const filteredData = tableData.filter((item) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      (item.billNo &&
        item.billNo.toLowerCase().includes(searchTextLowerCase)) ||
      (item.patientId &&
        item.patientId.toLowerCase().includes(searchTextLowerCase)) ||
      (patientNames[item.patientId] &&
        patientNames[item.patientId]
          .toLowerCase()
          .includes(searchTextLowerCase))
    );
  });

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div className="labtest-main123-s">
        <div className="sk14-arrows143-s-lab">
          <Link to="/Billing">
            <FaArrowCircleLeft  />
          </Link>

          <div className="heading6789">
            <h1 className="h1cvvroyal-head-lab">Lab Billing Data</h1>
          </div>
        </div>
        <table className="tbsk14-lab">
          <thead>
            <tr className="tr-class-bg">
              <th className="sk14s">Bill No</th>
              <th className="sk14s">Patient ID</th>
              <th className="sk14s">Name</th>
              {/* <th className='sk14s'>Bill</th> */}
              <th className="sk14s">Status</th>
              <th className="sk14s">Total Bill</th>
              {/* <th className='sk14s'>Payment Method</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr className="lab-test-td" key={item.id}>
                <td>{item.billNo}</td>
                <td>{item.patientId}</td>
                <td>
                  {patientNames[item.patientId] || "Loading..."}{" "}
                  {/* Display the patient name */}
                </td>
                <td>{patientAmountStatus[item.patientId] || "Loading..."} </td>
                <td>{item.totalBalance}</td>

                {/* <td>Print</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <ReactJsPagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={tableData.length}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePage(pageNumber)}
          prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
          nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} //
        />
      </div>
    </div>
  );
}

export default App;
