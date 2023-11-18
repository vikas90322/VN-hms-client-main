import React from "react";
import PopupNavbar from "./PapupNavbar";
import "./CSS/Appnt.css";
import AppntSideBar from "./AppntSideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import EditAppointmentForm from "./EditAppointmentForm";
import { FaArrowCircleLeft } from "react-icons/fa";

const patientIdLower = localStorage.getItem("labpatientid");
const patientId = patientIdLower ? patientIdLower.toUpperCase() : "";

function AppntToday() {
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate(-1);
  }

  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch data from the first endpoint
        const combinedDataResponse = await axios.get(`http://localhost:5000/api/v1/combined-data/${patientId}`);
        console.log("Data from first collection:", combinedDataResponse.data);
  
        // Initialize an array to hold the merged data
        let mergedAppointments = [];
  
        // Check if data is present in the first response and add it to the merged array
        if (Array.isArray(combinedDataResponse.data)) {
          mergedAppointments = combinedDataResponse.data;
        } else if (combinedDataResponse.data) {
          mergedAppointments.push(combinedDataResponse.data);
        }
  
        // Fetch data from the second endpoint
        try {
          const existingDataResponse = await axios.get(`http://localhost:5000/api/v1/allexistingpatients-data/${patientId}`);
          console.log("Data from second collection:", existingDataResponse.data);
  
          // Check if data is present in the second response and append it to the merged array
          if (Array.isArray(existingDataResponse.data)) {
            mergedAppointments = [...mergedAppointments, ...existingDataResponse.data];
          } else if (existingDataResponse.data) {
            mergedAppointments.push(existingDataResponse.data);
          }
        } catch (error) {
          // Handle the 404 error for the second request by setting an empty array
          console.error("Error fetching data from the second collection:", error);
        }
  
        // Update the state with the merged data
        setAppointments(mergedAppointments);
      } catch (error) {
        console.error("Error fetching data from the first collection:", error);
        // Handle the error case (e.g., show an error message or set an empty array)
        setAppointments([]);
      }
    };
  
    fetchAppointments();
     /*patientId */
  }, []);

  // Filter appointments for today's date
  const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today
  );
  

  // const handleEditClick = (appointment) => {
  //   setEditingAppointment(appointment);
  // };

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
      <PopupNavbar />
      <AppntSideBar/>

      <div style={{ display: "flex" }}>
        <div className="container_6">
         
          <div className="btn_table_6">
            <table className="appointments-table_6">
      <button onClick={handleBackClick}><FaArrowCircleLeft /></button>

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
                    {/* <td>
                      <Link>
                        <span
                          className="edit-link_6"
                          onClick={() => handleEditClick(appointmentItem)}
                        >
                          Edit Appointment
                        </span>
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            {editingAppointment && (
              <EditAppointmentForm
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