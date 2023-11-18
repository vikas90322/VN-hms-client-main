import React from "react";
// import PopupNavbar from "./PapupNavbar";
import "./Appointment.css";
import AppointmentSidebar from "./AppointmentSidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import EditAppointment from "./EditAppointment";
import PatientNav from "./PatientNav";

const patientIdLower = localStorage.getItem("selectedrecPatientId");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

function AppntToday() {
  
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        
        // Check response data type
        if(Array.isArray(response.data)) {
          setAppointments(response.data); 
        } else {
          // Handle single object case  
          setAppointments([response.data]);
        }
        
      } catch (error) {
        console.error(error);
        setAppointments([]); // fallback to empty array
      }
    }
    
    fetchAppointments();
  }, [])

  // Filter appointments for today's date
  const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today
  );
  

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSave = async (editedAppointment) => {
    try {
      // Send a PUT request with the edited appointment data
      await axios.put(`http://localhost:5000/api/v1/combined-dataUpdate/${editedAppointment.id}`, editedAppointment);
  
      // Update the appointments list with the edited data
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
      <PatientNav/>
      <AppointmentSidebar/>
      <div style={{ display: "flex" }}>
        <div className="container_6">
         
          <div className="btn_table_6">
            <table className="appointments-table_6">
               <thead>
        
        </thead> 
              <tbody>
              {todayAppointments.map((appointmentItem, index) => (
                  <tr key={index}>
                    <td>{appointmentItem.date}</td>
                    <td>
                      {appointmentItem.hour}H:{appointmentItem.minute}M&nbsp;
                      {appointmentItem.timeOfDay}
                    </td>
                    <td>{appointmentItem.AmountStatus}</td>
                    <td>Dr.{appointmentItem.doctor}</td>
                    <td>
                      {appointmentItem.items.map((subItem, idx) => (
                        <div key={idx}>{subItem.type}</div>
                      ))}
                    </td>
                    <td>
                      <Link>
                        <span
                          className="edit-link_6"
                          onClick={() => handleEditClick(appointmentItem)}
                        >
                          Edit Appointment
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingAppointment && (
              <EditAppointment
                appointment={editingAppointment}
                onSave={handleSave}
                onCancel={handleCancelEdit}
              />
            )}
          
   
          </div>
        </div>
      </div>
    </>
  );
}

export default AppntToday;