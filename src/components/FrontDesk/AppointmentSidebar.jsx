import React, { useState } from "react";
import "./AppointmentSidebar.css";
import { Link } from "react-router-dom";
import check from "../FrontDesk/check.png"
import appointments from "../FrontDesk/appointments.png";


const AppntSideBar = () => {
  const [activeItem, setActiveItem] = useState("Today"); // Set the initial active item

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
     
             
            
      <div className="sidebar_6"style={{backgroundColor:"#3E6EAB",fontFamily:"Inria Serif",padding:"10px",fontSize:"17px"}}>
        
        <div className="sidebar-item-full_6"style={{backgroundColor:"#C5D3E5",height:"70px"}} >
          <div >
          <Link
            to="/AppointmentToday"
            className={`sidebar-item_6 ${activeItem === "Today" ? "active" : ""}`}
            onClick={() => handleItemClick("Today")}
          >
           <span style={{color:"black"}}> <img src={check} alt="check" /> &nbsp;Today's Appointments </span>
          </Link>
          </div>
          <hr />
          <div style={{backgroundColor:"#C5D3E5",height:"70px"}} >
          <Link
            to="/Appointment"
            className={`sidebar-item_6 ${activeItem === "All" ? "active" : ""}`}
            onClick={() => handleItemClick("All")}
          >
           <span style={{color:"black"}}> <img src={appointments} alt="appoitments" style={{height:"30px"}}/> All Appointments</span>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppntSideBar;
