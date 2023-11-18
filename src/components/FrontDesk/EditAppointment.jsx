import React, { useState } from "react";
import "./EditAppointment.css";

function EditAppointmentForm({ appointment, onSave, onCancel }) {
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment({
      ...editedAppointment,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedAppointment);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
     <div className="overlay-06"> {/* Apply overlay style */}
      <div className="popup-appointment-06">
    <form className="form-appointment06" onSubmit={handleSubmit}>
       <div className="form-div06"> 
      <div >
        <label className="label-form06">Date:</label>
        <input
          type="date"
          className="input-appointment-06"
          name="date"
          value={editedAppointment.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label-form06">Time:</label>
        <input
        className="input-appointment-06"
          type="time"
          name="time"
          value={editedAppointment.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label-form06">Status:</label>
        <select
          name="status"
          className="input-appointment-06"
          value={editedAppointment.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="label-form06">Doctor:</label>
        <input
          type="text"
          name="doctor"
          value={editedAppointment.doctor}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label-form06">Appointment Type:</label>
        <select
        className="input-appointment-06"
          name="appointmentType"
          value={editedAppointment.appointmentType}
          onChange={handleChange}
        >
          <option value="Follow-up consultation">Follow-up consultation</option>
          <option value="Consultation">Consultation</option>
         
        </select>
      </div>
     
      <div className="buttons-edit-06">
        <button className="button-save-06  " type="submit">Save</button>
        <button className="button-cancel-06" type="button" onClick={handleCancel}>Cancel</button>
      </div>
      </div>
    </form>
    </div>
    </div>
    </>
  );
}

export default EditAppointmentForm;