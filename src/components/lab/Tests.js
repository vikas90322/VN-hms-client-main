import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import "./CSS/Tests.css";

function Tests() {
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const CustomDate = ({ value, onClick }) => (
    <div className="date-input">
      <input
        type="text"
        className="input_1"
        value={value}
        onClick={onClick}
        readOnly
      />
      <AiFillCalendar onClick={onClick} className="calendar_icon_1" size={30} />
    </div>
  );

  return (
    <>
      <div className="head_right_1">
        <div className="calFull_1">
          <DatePicker
            selected={date}
            onChange={handleChange}
            customInput={<CustomDate />}
          />
        </div>
        <div className="btns_1">
          <button className="go_1"> Go</button>
          <button className="go_1"> Today</button>
        </div>
      </div>
      
    </>
  );
}

export default Tests;
