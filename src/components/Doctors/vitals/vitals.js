import React, { useState } from 'react';
import axios from 'axios';
// import './Vitals.css';

const Vitals = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [vitals, setVitals] = useState({
    bpn: '',
    bpd:'',
    sugar: '',
    weight: '',
    height: '',
    temperature: '',
    spo2: '',
    pallor: '',
    edema: '',
    lcterus: '',
    lymphadenopathy: '',
    ciubbing: '',
    cyanosis: '',
    jvp: '',
  });

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5005/insertVitals', vitals);
      console.log('Response:', response.data);
      handleClosePopup();
    } catch (error) {
      console.error('Error saving vitals:', error);
    }
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitals((prevVitals) => ({
      ...prevVitals,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Front Desk</h1>
      <button onClick={handleOpenPopup}>VITALS</button>

      {popupVisible && (
        <div className="popup-overlay "style={{background: rgba(197, 211, 229, 0.50)
          }}>
          <div className="popup">
            <div className="popup-header">
              <h2>Add Vitals For Jagadeesh</h2>
              <button className="popup-close-button" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <hr />
            <div className="popup-content">
              <div className="input-grid">
              <label className="input-container">
                  BP(mmHg):<br/>
                  <input type="text" name="bpn" value={vitals.bpn} onChange={handleVitalsChange} />
                  <span>/</span>
                  <input type="text" name="bpd" value={vitals.bpd} onChange={handleVitalsChange} />
                   </label>
                <label>
                  Pulse(bpm):
                  <input type="text" name="sugar" value={vitals.sugar} onChange={handleVitalsChange} />
                </label>
                <label>
                  Height(cm):
                  <input type="text" name="height" value={vitals.height} onChange={handleVitalsChange} />
                </label>
                <label>
                  Weight(kg):
                  <input type="text" name="weight" value={vitals.weight} onChange={handleVitalsChange} />
                </label>
                <label>
                  Temperature(F):
                  <input type="text" name="temperature" value={vitals.temperature} onChange={handleVitalsChange} />
                </label>
                <label>
                  SPO2(%):
                  <input type="text" name="spo2" value={vitals.spo2} onChange={handleVitalsChange} />
                </label>
                <label>
                  Pallor():
                  <input type="text" name="pallor" value={vitals.pallor} onChange={handleVitalsChange} />
                </label>
                <label>
                  Edema():
                  <input type="text" name="edema" value={vitals.edema} onChange={handleVitalsChange} />
                </label>
                <label>
                  Lcterus():
                  <input type="text" name="lcterus" value={vitals.lcterus} onChange={handleVitalsChange} />
                </label>
                <label>
                  Lymphadenopathy():
                  <input type="text" name="lymphadenopathy" value={vitals.lymphadenopathy} onChange={handleVitalsChange} />
                </label>
                <label>
                  Ciubbing():
                  <input type="text" name="ciubbing" value={vitals.ciubbing} onChange={handleVitalsChange} />
                </label>
                <label>
                  Cyanosis():
                  <input type="text" name="cyanosis" value={vitals.cyanosis} onChange={handleVitalsChange} />
                </label>
                <label>
                  JVP():
                  <input type="text" name="jvp" value={vitals.jvp} onChange={handleVitalsChange} />
                </label>
              </div>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vitals;