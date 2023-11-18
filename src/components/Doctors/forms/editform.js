import React, { useState } from 'react';
import "./editform.css"

const EditForm = ({ data, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState({ ...data });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <>
      <div className="overlay14">
        <div className="popup14sk14s">
          <div className="edit-form14">
            
            <h2>Edit Form</h2>
            <div className="form-group14">
              <label>Patient Name:</label>
              <input
                type="text"
                name="patientName14"
                value={editedData.patientName14}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group14">
              <label>Treatment From:</label>
              <input
                type="date"
                name="treatmentFrom14"
                value={editedData.treatmentFrom14}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group14">
              <label>Treatment To:</label>
              <input
                type="date"
                name="treatmentTo14"
                value={editedData.treatmentTo14}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group14">
              <label>Treatment For:</label>
              <input
                type="text"
                name="treatmentFor14"
                value={editedData.treatmentFor14}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group14">
              <label>Resume Duty From:</label>
              <input
                type="date"
                name="resumeDutyFrom14"
                value={editedData.resumeDutyFrom14}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-group14">
              <button onClick={handleSave}>Save</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;