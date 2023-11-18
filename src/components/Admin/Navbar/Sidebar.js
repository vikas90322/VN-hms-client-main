import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BsPersonFillAdd, BsFillFilePptFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { RiBillLine} from 'react-icons/ri'
import { MdSpaceDashboard} from 'react-icons/md'


const Sidebar = () => {


  return (
    <div className="sidebar-docktorsk14s123-n">
      <div className="sidebar-items-45">
      <Link to="/frontpage" className="doc-link-nav">
        {" "}
        <div className="sidebar-item">
          <span className="sidebar-icon">
          <MdSpaceDashboard/>
          </span>
          Dashboard
        </div>
      </Link>
   
      <Link to="/staff" className="doc-link-nav">
        {" "}
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <BsPersonFillAdd />
          </span>
          Add Staff
        </div>
      </Link>
      <Link to="/Billing" className="doc-link-nav">
        {" "}
      <div className="sidebar-item">
        <span className="sidebar-icon">
          <RiBillLine />
        </span>
        Billing
      </div>
      </Link>
      <Link to="/reports" className="doc-link-nav">
        {" "}
      <div className="sidebar-item">
        <span className="sidebar-icon">
          <TbReport />
        </span>
        Reports
      </div>
      </Link>
      <Link to="/PatientDetails" className="doc-link-nav">
        {" "}
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <BsFillFilePptFill />
          </span>
          View Patients
        </div>
      </Link>
      </div>
    </div>
  );
};

export default Sidebar;