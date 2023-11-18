import React, { useState } from 'react'
import './tests.css'
import Navbar from '../navbar/navbar'
import Sidebar from '../prescription/sidebar'

const Tests = () => {
  const [dropdownStates, setDropdownStates] = useState(Array(10).fill(false)); // Assuming you have 10 dropdowns
  const dropdownLabels = [
    'HAEMATOLOGY', 'BIO CHEMISTRY', 'LIPID PROFILE', 'KIDNEY FUNCTION TEST',
    'LIVER FUNCTION TEST', 'UACR', 'URINE ROUTINE', 'THYROID FUNCTION TEST',
    'PCOS/ Hirsutism Profile/ Infertiity Profile', 'Others'
  ];
  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const [isToggled, setIsToggled] = useState(true);

  const toggleToggleSwitch = () => {
    setIsToggled(!isToggled);
  };
  const [, setShowContent] = useState(true);

  const handleClose = () => {
    setShowContent(false);
  };




  return (
    <>

      <Navbar />

      <Sidebar />
      <div className='two-containers-docks' >
        <div className='A7main'>
          <div class="A7flex-container">
            <div class="A7flex-item A7CommonTests">Common Tests</div>
            <div class="A7flex-item A7Ad">Additional Tests</div>
            <div class="A7flex-item A7Pt">Patient Name: chandrakant mishra</div>
            <div class="A7flex-item A7AdCal"><p>Auto Calculate
              <label className="A7toggle-switch">
                <input
                  type="checkbox"
                  checked={isToggled}
                  onChange={toggleToggleSwitch}
                  className="A7toggle-input"
                />
                <span className="A7slider"></span>
              </label>
            </p></div>
            <div class="A7flex-item A7save">
              save
            </div>
            <div class="A7flex-item A7close">
              <span onClick={handleClose}>x</span>
            </div>
          </div>
          <div className='A7flex-container'>
            <div>
              <input className='A7input-search' type='search' placeholder='Search test'></input>
            </div>
            <div>
              <input className='A7input-date' type='date'></input>
            </div>
            <div>
              <input className='A7input-date' type='date'></input>
            </div>
            <div>
              <button className='A7add-button'>+</button>
            </div>
            <div>
              <input className='A7input-add-date' value='Add Date'></input>
            </div>
          </div>
          <div className='droupdownmainven'>
            <div className="droupdownsven456">
              {dropdownLabels.map((label, index) => (
                <div key={index} className="droupdownstoggleven" onClick={() => toggleDropdown(index)}>
                  {label}
                  {/* <hr/>    */}
                  {dropdownStates[index] && (
                    <div className="dropdown-contentven">
                      <table className="A7table">
                        <tbody>
                          <tr>
                            <td className='A7td'>Fasting Blood Sugar</td>
                          </tr>
                          <tr>
                            <td>Post Prandial Blood Sugar</td>
                          </tr>
                          <tr>
                            <td>Random Blood Sugar</td>
                          </tr>
                          <tr>
                            <td className='A7td'>Fasting Blood Sugar</td>
                          </tr>
                          <tr>
                            <td>Post Prandial Blood Sugar</td>
                          </tr>
                          <tr>
                            <td>Random Blood Sugar</td>
                          </tr>
                          {/* ... Add more rows as needed ... */}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Tests;