import React, { useEffect } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { BsPersonSquare } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import { FaHospitalUser } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { FcMoneyTransfer } from 'react-icons/fc';
import './Frontpage.css';
import Cards from './Cards';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';

const FrontPage = () => {
  useEffect(() => {
    const hasPageReloaded = localStorage.getItem('hasPageReloaded');
    if (!hasPageReloaded) {
      // Reload the page when the component mounts
      localStorage.setItem('hasPageReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div >
      <Navbar />
      <Sidebar />
      <div className="topbarcvvroyal">
        <h1 className='jc89-13'><span className='span-heading89'>V</span>N clinic</h1>
      </div>

      <div className="maindivcvvroyal">
        <div className="bgcard">
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;