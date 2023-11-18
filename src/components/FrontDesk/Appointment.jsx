
import React, { useEffect, useState } from "react";
import "./Appointment.css";
import AppointmentSidebar from "./AppointmentSidebar";
import axios from "axios";
import EditAppointment from "./EditAppointment";
import PatientNav from "./PatientNav";

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const hasPageReloaded = localStorage.getItem("hasPageReloaded");

    if (!hasPageReloaded) {
      localStorage.setItem("hasPageReloaded", "true");
      window.location.reload();
    }
    const fetchAppointments = async () => {
      try {
        const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        console.log("Data from first collection:", combinedDataResponse.data);
  
        let mergedAppointments = [];
  
        if (Array.isArray(combinedDataResponse.data)) {
          mergedAppointments = combinedDataResponse.data;
        } else if (combinedDataResponse.data) {
          mergedAppointments.push(combinedDataResponse.data);
        }
  
        try {
          const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
          console.log("Data from second collection:", existingDataResponse.data);
  
          if (Array.isArray(existingDataResponse.data)) {
            mergedAppointments = [...mergedAppointments, ...existingDataResponse.data];
          } else if (existingDataResponse.data) {
            mergedAppointments.push(existingDataResponse.data);
          }
        } catch (error) {
          console.error("Error fetching data from the second collection:", error);
        }
  
        setAppointments(mergedAppointments);
      } catch (error) {
        console.error("Error fetching data from the first collection:", error);
        setAppointments([]);
      }
    };
  
    fetchAppointments();
  }, []);



  const handleSave = async (editedAppointment) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/combined-dataUpdate/${editedAppointment.id}`, editedAppointment);

      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === editedAppointment.id) {
          return editedAppointment;
        }
        return appointment;
      });

      setAppointments(updatedAppointments);
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  return (
    <>
      <PatientNav />
      <AppointmentSidebar />
      <div style={{ display: "flex" }}>
        <div className="container_6">
          <div className="btn_table_6">
            <br/>
            <table className="appointments-table_6">
              <thead className="appointmenthead20">
              <tr >
                  <th>Date</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                  <th>Doctor</th>
                  <th>Service</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointmentItem, index) => (
                  <tr key={index}>
                    <td>{appointmentItem.date}</td>
                    <td>
                      {appointmentItem.hour}&nbsp;:&nbsp;{appointmentItem.minute}&nbsp;
                      {appointmentItem.timeOfDay}
                    </td>
                    <td>{appointmentItem.AmountStatus}</td>
                    <td>Dr.{appointmentItem.doctor}</td>
                    <td>
                      {appointmentItem.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.type}</div>
                      ))}
                    </td>
                    {/* <td>
                      <Link>
                        <span className="edit-link_6" onClick={() => handleEditClick(appointmentItem)}>
                          Edit Appointment
                        </span>
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            {editingAppointment && (
              <EditAppointment appointment={editingAppointment} onSave={handleSave} onCancel={handleCancelEdit} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
