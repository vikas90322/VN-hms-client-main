import React, { useState,useEffect } from 'react';
import Navbar from './Navbar23';
// import janani from "./Jananiclinic.jpg"
// import res from "./res2.jpg"
import receptionimg from "./receptionimg.jpg"
// import matrical from "../../assests/marical1.png"
export default function Homepage() {
  const [showModal, setShowModal] = useState(false);
  const [, setSelectedModal] = useState(null);

  const openModal = (type) => {
    setSelectedModal(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedModal(null);
    setShowModal(false);
  };

  useEffect(() => {
    const hasPageReloaded = localStorage.getItem('hasPageReloaded');
    if (!hasPageReloaded) {
      // Reload the page when the component mounts
      localStorage.setItem('hasPageReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div>
            <Navbar showModal={showModal} openModal={openModal} closeModal={closeModal} />
            
    <img src={receptionimg} alt='' style={{ width: '100%', height: '730px'}} /></div>
  )
}