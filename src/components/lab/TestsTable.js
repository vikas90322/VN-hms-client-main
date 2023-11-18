// //below code is the updated code
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaPrint } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import LabNavbar from "./LabNavbar";
// // import LabReport from "./LabReport";
// // import Tests from "./Tests";
// import { format } from "date-fns";
// import "./CSS/TestsTable.css";
// import "../Doctors/uploadfiles/uploadfiles.css";

// const TestsTable = () => {
//   const [searchText, setSearchText] = useState("");
//   const [tableData, setTableData] = useState([]);
//   const [file, setFile] = useState(null);
//   const [/*files*/, setFiles] = useState([]);
//   // const [selectedRow, setSelectedRow] = useState(null); 
//   const [patientNames, setPatientNames] = useState({});

//   const  handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       alert("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:5000/api/uploads", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("File uploaded successfully.");
//         getFiles(); // Refresh the file list after a successful upload
//       } else {
//         alert("Error uploading file.");
//       }
//     } catch (error) {
//       alert("Error uploading file: " + error.message);
//     }
//   };

//   useEffect(() => {
//     getFiles();
//   }, []);

//   const getFiles = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/get-files");
//       if (response.ok) {
//         const data = await response.json();
//         setFiles(data.data);
//       } else {
//         console.error("Error fetching files.");
//       }
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   const handleLinkClick = (patientId) => {
//     // Store the patientId in local storage as "resultpatientid"
//     localStorage.setItem("resultpatientid", patientId);

//     // Navigate to the "TestDetails" page
//     window.location.href = "/TestDetails";
//   };

//   const testsBackendURL = "http://localhost:5000/api/get-allBill";

//   useEffect(() => {
//     // Fetch data from the backend
//     axios
//       .get(testsBackendURL)
//       .then((response) => {
//         console.log(response); // Log the entire response
//         setTableData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch patient names for all patient IDs in tableData
//     const fetchPatientNames = async () => {
//       const patientIds = tableData.map((item) => item.patientId);

//       for (const patientId of patientIds) {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/v1/combined-data/${patientId}`
//           );

//           if (response.status === 200) {
//             // Store the patient name in the patientNames state object
//             setPatientNames((prevState) => ({
//               ...prevState,
//               [patientId]: response.data.name,
//             }));
//           }
//         } catch (error) {
//           console.error(
//             `Error fetching patient name for ID ${patientId}:`,
//             error
//           );
//         }
//       }
//     };

//     // Once you have the table data, trigger fetching patient names
//     fetchPatientNames();
//   }, [tableData]);

//   const filteredData = tableData.filter((item) => {
//     const searchTextLowerCase = searchText.toLowerCase();

//     return (
//       (item.billNo &&
//         item.billNo.toLowerCase().includes(searchTextLowerCase)) ||
//       (item.patientId &&
//         item.patientId.toLowerCase().includes(searchTextLowerCase)) ||
//       (patientNames[item.patientId] &&
//         patientNames[item.patientId]
//           .toLowerCase()
//           .includes(searchTextLowerCase))
//     );
//   });

  

//   return (
//     <div>
//       <LabNavbar />
//       <div style={{ marginTop: "15vh" }}>
//         {/* Search Bar */}
//         <div className="search-bar_1">
//           <div className="search-input_1">
//             <AiOutlineSearch className="search-icon_1" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="input-field_1"
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <table className="labser-table_1232">
//           <thead>
//             <tr>
//               <th>Bill No</th>
//               <th>Patient ID</th>
//               <th>Name</th>
//               <th>Bill</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.billNo}</td>
//                 <td>{item.patientId}</td>
//                 <td>
//                   {patientNames[item.patientId] || "Loading..."}{" "}
//                   {/* Display the patient name */}
//                 </td>
//                 <td>
//                   <FaPrint /> 
//                   {item.totalBalance}
//                 </td>

//                 <td className="empid1431tbody" style={{ cursor: "pointer" }}>
//                   <Link
//                     to="/TestDetails"
//                     onClick={() => handleLinkClick(item.patientId)}
//                   >
//                     Result
//                   </Link>
//                 </td>

//                 <td>    {item.date
//                   ? format(new Date(item.date), "yyyy-MM-dd")
//                   : item.date === null
//                     ? ""
//                     : "Loading..."}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Display file upload option for the selected row */}
//         {/* {selectedRow !== null && (
//           <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload}>Upload</button>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default TestsTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";
import LabNavbar from "./LabNavbar";
import { format } from "date-fns";
import "./CSS/TestsTable.css";
import "../Doctors/uploadfiles/uploadfiles.css";

const TestsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  // const [/*files*/, setFiles] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(null); 
  const [patientNames, setPatientNames] = useState({});

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

  const handleLinkClick = (patientId) => {
    // Store the patientId in local storage as "resultpatientid"
    localStorage.setItem("resultpatientid", patientId);

    // Navigate to the "TestDetails" page
    window.location.href = "/TestDetails";
  };

  return (
    <div>
      <LabNavbar />
      <div style={{ marginTop: "15vh" }}>
        {/* Search Bar */}
        <div className="search-bar_1">
          <div className="search-input_1">
            <AiOutlineSearch className="search-icon_1" />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input-field_1"
            />
          </div>
        </div>

        {/* Table */}
        <table className="labser-table_1232">
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
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.billNo}</td>
                <td>{item.patientId}</td>
                <td>
                  {patientNames[item.patientId] || "Loading..."}{" "}
                  {/* Display the patient name */}
                </td>
                <td>
                  <FaPrint /> 
                  {item.totalBalance}
                </td>

                <td className="empid1431tbody" style={{ cursor: "pointer" }}>
                  <Link
                    to="/TestDetails"
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
      </div>
    </div>
  );
};

export default TestsTable;


















