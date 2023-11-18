import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/ActionModalContent.css'; // Import your custom CSS for styling

const ActionModalContent = ({ id, onClose }) => {
  const [data, setData] = useState({});
  const [editedData, setEditedData] = useState({});
  
  useEffect(() => {
    // Fetch the data for the given ID from your backend using _id
    axios.get(`http://localhost:5000/api/tests/${id}?field=_id`)
      .then(response => {
        // Access the _id field from the response data
        const itemId = response.data._id;
        setData(response.data);
        setEditedData(response.data); // Set initial edited data
      })
      .catch(error => {
        console.error(error);
        // Handle the error here, e.g., display an error message to the user
      });
  }, [id]);

  // Handle input field changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle update operation
  const handleUpdate = () => {
    // Send a PUT request to update the data with the editedData
    axios.put(`http://localhost:5000/api/tests/${id}`, editedData)
      .then(response => {
        // Handle success and update the UI if needed
        console.log("Data updated successfully", response);
        // Close the modal or update the data as required
        onClose();
      })
      .catch(error => {
        console.error("Error updating data", error);
      });
  };

  // Handle delete operation
  const handleDelete = () => {
    // Send a DELETE request to delete the data with the given ID
    axios.delete(`http://localhost:5000/api/tests/${id}`)
      .then(response => {
        // Handle success and update the UI if needed
        console.log("Data deleted successfully", response);
        // Close the modal or update the data as required
        onClose();
      })
      .catch(error => {
        console.error("Error deleting data", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process and submit the form data as needed
    // ...
    // onClose();
  };

  return (
    <div className="modal-overlay-sdc_iou-mkj-5">
      <div className="modal-content-poio_gftre-5">
        <h2 className="form-title_5">Lab Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group_5">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input_5"
              value={editedData.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group_5">
            <label htmlFor="bill">Bill:</label>
            <input
              type="text"
              id="bill"
              name="bill"
              className="form-input_5"
              value={editedData.bill || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group_5">
            <label htmlFor="drName">DR Name:</label>
            <input
              type="text"
              id="drName"
              name="drName"
              className="form-input_5"
              value={editedData.drName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group_5">
            <label htmlFor="labTechName">Lab Technician Name:</label>
            <input
              type="text"
              id="labTechName"
              name="labTechName"
              className="form-input_5"
              value={editedData.labTechName || ''}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="form-button_5">Save</button>
          <button onClick={handleDelete} className="delete-button_5">Delete</button>
        </form>
      </div>
    </div>
  );
};

export default ActionModalContent;
