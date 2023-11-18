import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import "./CSS/PaidTable.css";
import PopupNavbar from "./PapupNavbar";

const PaidTable = () => {
  const [tableData, setTableData] = useState([]);
  const [ setCurrentData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/labpaid")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the server to delete the record by ID
    fetch(`http://localhost:5000/api/labpaid/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Record deleted successfully") {
          // Remove the deleted record from the tableData state
          setTableData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );

          // Optional: You can also remove the deleted record from currentData state
          setCurrentData((prevData) =>
            prevData.filter((item) => item._id !== id)
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
        <PopupNavbar />
        <div className="data-table-container3">
          <table className="data-table3">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Bill#</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.dateTime}</td>
                  <td>{item.billNumber}</td>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                  <td>{item.mode}</td>
                  <td>{item.category}</td>
                  <td>
                    <span
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)} // Use the actual ID from your MongoDB
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
