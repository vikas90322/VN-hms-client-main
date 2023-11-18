import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CSS/TestsTable.css";
import LabNavbar from "./LabNavbar";
import ReactJsPagination from "react-js-pagination";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BillPopup from "./BillPopup";
import CachedIcon from '@mui/icons-material/Cached';

const FindReports = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedModal, setSelectedModal] = useState(null);
  // const [file, setFile] = useState(null);
  const [/*files*/, setFiles] = useState([]);
  // const [/*selectedRow*/, setSelectedRow] = useState(null);
  const [patientNames, setPatientNames] = useState({});

  const [/*filteringByDate*/, setFilteringByDate] = useState(false)
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  



  const [showPopup, setShowPopup] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleBillClick = (item) => {
    // Set the selectedBill and show the popup
    setSelectedBill(item);
    setShowPopup(true);
    document.body.classList.add('find-reports-page');
  };

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
    document.body.classList.remove('find-reports-page');
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

  const reportsBackendURL = "http://localhost:5000/api/get-allBill";

  useEffect(() => {
    axios
      .get(reportsBackendURL)
      .then((response) => {
        setTableData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGoButtonClick = () => {
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

    // Filter data based on search text and selected date
    const filtered = tableData.filter((item) => {
      const nameIncludesSearchText =
        item.name && item.name.toLowerCase().includes(searchText.toLowerCase());
      const idIncludesSearchText =
        item.id && item.id.toString().includes(searchText);
      const billNoIncludesSearchText =
        item.billNo && item.billNo.toString().includes(searchText);

      const formattedTableDate = format(new Date(item.date), "yyyy-MM-dd");

      return (
        (nameIncludesSearchText ||
          idIncludesSearchText ||
          billNoIncludesSearchText) &&
        formattedTableDate === formattedSelectedDate
      );
    });

    setFilteredData(filtered);
    setFilteringByDate(true);
  };

  const handleTodayButtonClick = () => {
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

    // Filter data based on search text and today's date
    const filtered = tableData.filter((item) => {
      const nameIncludesSearchText =
        item.name && item.name.toLowerCase().includes(searchText.toLowerCase());
      const idIncludesSearchText =
        item.id && item.id.toString().includes(searchText);
      const billNoIncludesSearchText =
        item.billNo && item.billNo.toString().includes(searchText);

      const formattedTableDate = format(new Date(item.date), "yyyy-MM-dd");

      return (
        (nameIncludesSearchText ||
          idIncludesSearchText ||
          billNoIncludesSearchText) &&
        formattedTableDate === formattedCurrentDate
      );
    });

    setFilteredData(filtered);
    setFilteringByDate(true); 
  };

  // Function to reset the filter
  const resetFilter = () => {
    setFilteredData(tableData);
    setSearchText(""); // Clear search text
    setSelectedDate(new Date()); // Reset date filter
    setFilteringByDate(false); // Update the filtering status
  };

  const handleSearch = (searchText) => {
    // Update the searchText state
    setSearchText(searchText);

    // Escape special characters in searchText and create a regex pattern
    const escapedSearchText = searchText.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g,
      "\\$&"
    );
    const regex = new RegExp(escapedSearchText, "i"); // "i" for case-insensitive search

    // Filter data based on the search text
    const filtered = tableData.filter((item) => {
      const nameIncludesSearchText = item.name && regex.test(item.name);
      const idIncludesSearchText =
        item.patientId && regex.test(item.patientId.toString());
      const billNoIncludesSearchText =
        item.billNo && regex.test(item.billNo.toString());
      const NoameIncludesSearchText =
        patientNames[item.patientId] &&
        regex.test(patientNames[item.patientId].toString());

      return (
        nameIncludesSearchText ||
        idIncludesSearchText ||
        billNoIncludesSearchText ||
        NoameIncludesSearchText
      );
    });

    setFilteredData(filtered);
  };

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

  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <LabNavbar />

      <div style={{ marginTop: "5vh" }}>
        <div className="search-bar_1-lab13">
          <div className="search-input_1">
            <AiOutlineSearch className="search-icon_1" />
            <input
              type="text"
              placeholder="Search by Name, ID, or Bill No."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-field_1"
            />
          </div>
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="date-input-lab"
          />
          <div className="button-container-lab">
            <button className="asdf_007-lab" onClick={handleGoButtonClick}>
              Go
            </button>
            <button className="asdf_007-lab" onClick={handleTodayButtonClick}>
              Today
            </button>
          </div>
          <button className="refresh-button-lab" onClick={resetFilter}>
          <CachedIcon/>
        </button>
        </div>

        <table className="labser-table_1">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Bill</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.billNo}</td>
                <td>{item.patientId}</td>
                <td>
                  {patientNames[item.patientId] || "Loading..."}{" "}
                  {/* Display the patient name */}
                </td>
                <td onClick={() => handleBillClick(item)} style={{cursor:"pointer"}}>
                <FaPrint/>{item.totalBalance}
                </td>

                <td className="empid1431tbody" style={{ cursor: "pointer" }}>
                  <Link
                    to="/TestDetails"
                    onClick={() => handleLinkClick(item.patientId)}
                  >
                    Result
                  </Link>
                </td>

                <td>
                  {item.date
                    ? format(new Date(item.date), "yyyy-MM-dd")
                    : item.date === null
                    ? ""
                    : "Loading..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactJsPagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredData.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>} // Use custom content for the previous arrow
          nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon/></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon/></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon/></span>} // 
        />

        {showPopup && selectedBill && (
          <BillPopup item={selectedBill} patientNames={patientNames} onClose={closePopup} />
        )}
      </div>
    </div>
  );
};

export default FindReports;
