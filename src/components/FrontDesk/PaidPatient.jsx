

// import React, { useState, useEffect } from "react";
// import { MdDelete } from "react-icons/md";
// import "./PaidPatient.css";
// import PatientNav from "./PatientNav";
// import axios from "axios";

// const patientIdLower = localStorage.getItem("selectedrecPatientId");
// const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

// const PaidTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     console.log("Fetching data for patient ID:", patientId);

//     const fetchData = async () => {
//       try {
//         const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
//         console.log("Data from first collection:", combinedDataResponse.data);

//         let mergedData = [];

//         if (Array.isArray(combinedDataResponse.data)) {
//           mergedData = combinedDataResponse.data;
//         } else if (combinedDataResponse.data) {
//           mergedData.push(combinedDataResponse.data);
//         }

//         try {
//           const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
//           console.log("Data from second collection:", existingDataResponse.data);

//           if (Array.isArray(existingDataResponse.data)) {
//             mergedData = [...mergedData, ...existingDataResponse.data];
//           } else if (existingDataResponse.data) {
//             mergedData.push(existingDataResponse.data);
//           }
//         } catch (error) {
//           console.error("Error fetching data from the second collection:", error);
//         }

//         const itemsArray = mergedData.items || [];
//         setTableData([{ ...mergedData, items: itemsArray }]);
//       } catch (error) {
//         console.error("Error fetching data from the first collection:", error);
//         setTableData([]);
//       }
//     };

//     fetchData();
//   }, [patientId]);
  

//   const handleDelete = (id) => {
//     // Send a DELETE request to the server to delete the record by ID
//     fetch(`http://localhost:5000/api/v1/combined-dataDelete/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.message === "Record deleted successfully") {
//           // Remove the deleted record from the tableData state
//           setTableData((prevTableData) =>
//             prevTableData.filter((item) => item._id !== id)
//           );
//         } else {
//           console.error("Failed to delete record");
//         }
//       })
//       .catch((error) => console.error("Error deleting record:", error));
//   };
  

//   return (
//     <>
//       <div>
//         <PatientNav />
//         <div className="data-table-container3">
//           <table className="data-table3">
//             <thead>
//               <tr>
//                 <th>Date </th>
//                 <th>Time</th>
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Gender</th>
//                 <th>Amount</th>
//                 <th>Mode</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.date}</td>
//                   <td>{item.hour}:{item.minute}&nbsp;{item.timeOfDay}</td>
//                   <td>{item.name}</td>
//                   <td>
//                       {item.items.map((subItem, idx) => (
//                         <div key={idx}>
//                           {subItem.type}
//                         </div>
//                       ))}
//                     </td>
//                   <td>{item.gender}</td>
//                   <td>
//                     {item.items.map((subItem, idx) => (
//                       <div key={idx}>
//                         {subItem.price || 'N/A'}
//                       </div>
//                     ))}
//                   </td>
//                   <td>{item.paymentMode}</td>
//                   <td>
//                     <span
//                       className="delete-btn"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       <MdDelete color="red" />
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaidTable;
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import "./PaidPatient.css";
import PatientNav from "./PatientNav";
import axios from "axios";

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const PaidTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        console.log("Data from first collection:", combinedDataResponse.data);

        let mergedData = [];

        if (Array.isArray(combinedDataResponse.data)) {
          mergedData = combinedDataResponse.data;
        } else if (combinedDataResponse.data) {
          mergedData.push(combinedDataResponse.data);
        }

        try {
          const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
          console.log("Data from second collection:", existingDataResponse.data);

          if (Array.isArray(existingDataResponse.data)) {
            mergedData = [...mergedData, ...existingDataResponse.data];
          } else if (existingDataResponse.data) {
            mergedData.push(existingDataResponse.data);
          }
        } catch (error) {
          console.error("Error fetching data from the second collection:", error);
        }

        setTableData(mergedData);
      } catch (error) {
        console.error("Error fetching data from the first collection:", error);
        setTableData([]);
      }
    };

    fetchData();
  }, [/*patientId*/]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/v1/combined-dataDelete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Record deleted successfully") {
          setTableData((prevTableData) =>
            prevTableData.filter((item) => item._id !== id)
          );
        } else {
          console.error("Failed to delete record");
        }
      })
      .catch((error) => console.error("Error deleting record:", error));
  };

  return (
    <>
      <div>
        <PatientNav />
        <div className="data-table-container3">
          <table className="data-table3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Type</th>
                <th>Gender</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.hour}:{item.minute}&nbsp;{item.timeOfDay}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.items.map((subItem, idx) => (
                      <div key={idx}>
                        {subItem.type}
                      </div>
                    ))}
                  </td>
                  <td>
                    {item.items.map((subItem, idx) => (
                      <div key={idx}>
                        {subItem.price || 'N/A'}
                      </div>
                    ))}
                  </td>
                  <td>{item.gender}</td>
                  <td>{item.paymentMode}</td>
                  <td>
                    <span
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDelete color="red" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaidTable;
