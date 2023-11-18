import React, { useState } from "react";
import "./CSS/EditAppointmentForm.css";

function EditAppointmentForm({ appointment, onSave, onCancel }) {
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment({
      ...editedAppointment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that `id` is included in the edited appointment data
    if (!editedAppointment.id) {
      console.error("Invalid appointment ID:", editedAppointment.id);
      return;
    }

    // Call the onSave function with the edited appointment data
    onSave(editedAppointment);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="overlay-06">
        {" "}
        {/* Apply overlay style */}
        <div className="popup-appointment-06">
          <form className="form-appointment06" onSubmit={handleSubmit}>
            <div className="form-div06">
              <div>
                {/* // Add this field to your form in EditAppointmentForm.js */}
                <div>
                  <label className="label-form06">ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={editedAppointment._id} // Ensure that this field name matches the data structure
                    onChange={handleChange}
                  />
                </div>
                <label className="label-form06">Date:</label>
                <input
                  type="date"
                  className="input-appointment-06"
                  name="date"
                  value={editedAppointment.date}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <label className="label-form06">Time:</label>
                <input
                  className="input-appointment-06"
                  type="time"
                  name="time"
                  value={editedAppointment.time}
                  onChange={handleChange}
                />
              </div> */}
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
                  <option value="Follow-up consultation">
                    Follow-up consultation
                  </option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>

              <div className="buttons-edit-06">
                <button className="button-save-06  " type="submit">
                  Save
                </button>
                <button
                  className="button-cancel-06"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditAppointmentForm;
