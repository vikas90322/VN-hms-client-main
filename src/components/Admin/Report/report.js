import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import "./report.css";
import ReactJsPagination from 'react-js-pagination';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const TestsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([])
  const [patientNames, setPatientNames] = useState({});
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items per page


  const handleLinkClick = (patientId) => {
    // Store the patientId in local storage as "resultpatientid"
    localStorage.setItem("resultpatientid", patientId);

    // Navigate to the "TestDetails" page
    window.location.href = "/TestDetailReports";
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

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
       <NavBar />
       <Sidebar />
      <div style={{ marginTop: "15vh", marginLeft:"6rem",marginRight:"0.4rem"}}>
        
        <Link to="/frontpage">
            <FaArrowCircleLeft style={{fontSize:'4vh'}} / >
          </Link>
          <br/>&nbsp;    
        <div className="search-bar_1-admin">
          <div className="search-input_1-admin">
            <AiOutlineSearch className="search-icon_1" />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input-field_1-admin"
            />
          </div>
        </div>

        {/* Table */}
        <table className="labser-table_13">
          <thead className="labser-table_125">
            <tr>
              <th>Bill No</th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Bill(₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item) => (
              <tr key={item.id}>
                <td>{item.billNo}</td>
                <td>{item.patientId}</td>
                <td>
                  {patientNames[item.patientId] || "Loading..."}{" "}
                  {/* Display the patient name */}
                </td>
                <td>
                  {/* <FaPrint /> */}
                   {item.totalBalance}
                </td>

                <td className="empid1431tbody" style={{ cursor: "pointer" }}>
                  <Link
                    to="/TestDetailReports"
                    onClick={() => handleLinkClick(item.patientId)}
                  >
                    Result
                  </Link>
                </td>

                <td>    {item.date
                  ? format(new Date(item.date), "yyyy-MM-dd")
                  : item.date === null
                    ? ""
                    : "Loading..."}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display file upload option for the selected row */}
        {/* {selectedRow !== null && (
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        )} */}
         <ReactJsPagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredData.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
          nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} // 
        />
      </div>
    </div>
  );
};
export default TestsTable;