import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './consultation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/navbar';


function Consultations() {
  const [data, setData] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const openPopup = (item) => {
    setPopupData(item);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const filterData = () => {
    if (!fromDate || !toDate) {
      // Check if both dates are selected
      alert('Please select both "From" and "To" dates.');
      return;
    }

    const filteredData = data.filter((item) => {
      const visitDate = new Date(item.lastvisit);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      return visitDate >= from && visitDate <= to;
    });

    setData(filteredData);
  };

  const refreshData = () => {
    // Reload and show all data
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <Navbar/>
    
    
    <div className='two-containers-docks' >
    <div className="tablesk14">
      <div className="container-sk14">
        From :{' '}
        <input
        className='date-boxsk14'
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        ></input>
        &nbsp;&nbsp;&nbsp;&nbsp;
        To :{' '}
        <input
          type="date"
          className='date-boxsk14'
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        ></input>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="gosk14" onClick={filterData}>
          Go
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="refresh-button" onClick={refreshData}>
          <FontAwesomeIcon icon={faSync} />
        </button>
      </div>
      <h1>Data Table</h1>
      <table className='consutant'>
        <thead className='cnsak14'>
          <tr className=' trsk14'>
            <th className='thsk14'>S.No</th>
            <th className='thsk14'>ID</th>
            <th className='thsk14'>Name</th>
            <th className='thsk14'>Mobile Number</th>
            <th className='thsk14'>Last Visit</th>
            <th className='thsk14'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.mobilenumber}</td>
              <td>{item.lastvisit}</td>
              <td>
                <button className="pbsk14" onClick={() => openPopup(item)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupData && (
        <div className="popupsk14">
          <div className="popup-contentsk14">
            <h2>Details</h2>
            <p>ID: {popupData.id}</p>
            <p>Name: {popupData.name}</p>
            <p>Mobile Number: {popupData.mobilenumber}</p>
            <p>Last Visit: {popupData.lastvisit}</p>

            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default Consultations;