// import React, { useState, useEffect } from "react";
// import "./vitals.css";
// import Navbar from "./Navbar23";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { FaArrowCircleLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";

// // const patientId = localStorage.getItem('pid')

// const Vitals = () => {
//   const { id } = useParams(); 
//   const [patientData, setPatientData] = useState(null); 
//   const [patientId, setPatientId] = useState(localStorage.getItem('pid'));

//   const [/*popupVisible*/, setPopupVisible] = useState(false);

//   const [vitals, setVitals] = useState({
//     patientId:id,
//     bp: '',
//     sugar: '',
//     weight: '',
//     height: '',
//     temperature: '',
//     spo2: '',
//     pallor: '',
//     edema: '',
//     lcterus: '',
//     lymphadenopathy: '',
//     ciubbing: '',
//     cyanosis: '',
//     jvp: '',
//   });
  
//   useEffect(() => {
//     // Fetch the patient data based on the ID when the component mounts
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${id}`);
//         setPatientData(response.data);
//         setPatientId(response.data.patientId)
//         console.log("pid"+patientId)
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };

//     fetchPatientData();
//   }, [id, patientId]);
//   // console.log("ID", id )
//   // const handleOpenPopup = () => {
//   //   setPopupVisible(true);
//   // };

//   const handleClosePopup = () => {
//     setPopupVisible(false);
//   };

//   const handleSave = async () => {
//     try {

//       const response = await axios.post(`http://localhost:5000/api/patient/Vitals/${id}`, vitals);


//       console.log('Response:', response.data);
//       handleClosePopup();
//       window.alert('Data saved successfully!'); // Display an alert
  
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error saving vitals:', error);
//       window.alert('Failed to save data.'); // Display an alert on error
//     }
//   };
  
  

//   const handleVitalsChange = (e) => {
//     const { name, value } = e.target;
//     setVitals((prevVitals) => ({
//       ...prevVitals,
//       [name]: value,
//     }));
//   };
  
//   return (
//     <>
//     <Navbar />
//     <div className="popup-overlay">
    
//           <div className="popup1235">
//           <Link to="/Patient">
//           <FaArrowCircleLeft  style={{fontSize:'40px'}}/>
//         </Link>
//             {patientData ? (
//         <>
//         <div className="popup-header">
      
//           <h2>  {patientData.name}'s Vitals</h2>
//           <h2>{id}</h2>
          
             
//             </div>
//             <hr />
//             <div className="popup-content">
//               <div className="input-grid">
//               <label className="input-container">
//                 BP(mmHg):<br />
//                 <input type="text" name="bp" value={vitals.bp} onChange={handleVitalsChange} />
//                 {/* <span>/</span>
//                 <input type="text" name="hg" value={vitals.hg} onChange={handleVitalsChange} /> */}
//               </label>


//                 <label>
//                   Pulse(bpm):
//                   <input type="text" name="sugar" value={vitals.sugar} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Height(cm):
//                   <input type="text" name="height" value={vitals.height} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Weight(kg):
//                   <input type="text" name="weight" value={vitals.weight} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Temperature(F):
//                   <input type="text" name="temperature" value={vitals.temperature} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   SPO2(%):
//                   <input type="text" name="spo2" value={vitals.spo2} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Pallor():
//                   <input type="text" name="pallor" value={vitals.pallor} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Edema():
//                   <input type="text" name="edema" value={vitals.edema} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Lcterus():
//                   <input type="text" name="lcterus" value={vitals.lcterus} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Lymphadenopathy():
//                   <input type="text" name="lymphadenopathy" value={vitals.lymphadenopathy} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Ciubbing():
//                   <input type="text" name="ciubbing" value={vitals.ciubbing} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   Cyanosis():
//                   <input type="text" name="cyanosis" value={vitals.cyanosis} onChange={handleVitalsChange} />
//                 </label>
//                 <label>
//                   JVP():
//                   <input type="text" name="jvp" value={vitals.jvp} onChange={handleVitalsChange} />
//                 </label>
//               </div>
//               <button onClick={handleSave}>Save</button>
//             </div>
          
//         </>
//         ) : (
//           <p>Loading patient data...</p>
//         )}
//         </div>
//         </div>
//     </>
//   );
// };

// export default Vitals;

import React, { useState, useEffect } from "react";
import "./vitals.css";
import Navbar from "./Navbar23";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// const patientId = localStorage.getItem('pid')

const Vitals = () => {
  const { id } = useParams(); 
  const [patientData, setPatientData] = useState(null); 
  const [patientId, setPatientId] = useState(localStorage.getItem('pid'));

  const [, setPopupVisible] = useState(false);

  const [vitals, setVitals] = useState({
    patientId:id,
    bp: '',
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
  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/combined-data/${id}`);
        setPatientData(response.data);
        setPatientId(response.data.patientId)
        console.log("pid"+patientId)
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id, patientId]);
  // const handleOpenPopup = () => {
  //   setPopupVisible(true);
  // };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSave = async () => {
    try {

      const response = await axios.post(`http://localhost:5000/api/patient/Vitals/${id}`, vitals);


      console.log('Response:', response.data);
      handleClosePopup();
      window.alert('Data saved successfully!'); 
  
      handleClosePopup();
    } catch (error) {
      console.error('Error saving vitals:', error);
      window.alert('Failed to save data.'); 
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
    <>
    <Navbar />
    <div className="popup-overlay">
    
          <div className="popup1235">
          <Link to="/Patient">
          <FaArrowCircleLeft  style={{fontSize:'40px'}}/>
        </Link>
            {patientData ? (
        <>
        <div className="popup-header">
      
          <h2>  {patientData.name}'s Vitals</h2>
          <h2>{id}</h2>
          
             
            </div>
            <hr />
            <div className="popup-content">
              <div className="input-grid">
              <label >
                BP(mmHg):<br />
                <input type="text" name="bp" value={vitals.bp} onChange={handleVitalsChange} />
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
          
        </>
        ) : (
          <p>Loading patient data...</p>
        )}
        </div>
        </div>
    </>
  );
};

export default Vitals;