import React, { useState } from "react";
import "./CSS/AppntSideBar.css";
import { Link } from "react-router-dom";

const AppntSideBar = () => {
  const [activeItem, setActiveItem] = useState("Today"); // Set the initial active item

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="sidebar_6">
        <div className="sidebar-item-full_6">
          <div>
          <Link
            to="/AppntToday"
            className={`sidebar-item_6 ${activeItem === "Today" ? "active" : ""}`}
            onClick={() => handleItemClick("Today")}
          >
            Today's Appointments
          </Link>
          </div>
          <hr />
          <div>
          <Link
            to="/Appnt"
            className={`sidebar-item_6 ${activeItem === "All" ? "active" : ""}`}
            onClick={() => handleItemClick("All")}
          >
            All Appointments
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppntSideBar;
