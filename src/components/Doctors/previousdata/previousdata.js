import React, { useState ,useEffect} from 'react';
import './previousdata.css';
import Sidebar from '../prescription/sidebar';
import Navbar from '../navbar/navbar';

import axios from 'axios';

const PreviousData = () => {
  
  
const[prescription,setPrescription]=useState([]);
const[vitals,setVitals]=useState([])
  
  
  useEffect(() => {
    // Fetch vitals data from the API
    const fetchPrescription = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Complaints');
        const responseData = response.data;
        console.log(responseData);
        
        

        setPrescription(responseData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPrescription();
  }, []);

 
  useEffect(() => {
    // Fetch vitals data from the API
    const fetchVitals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Vitals');
        const responseData = response.data;
        console.log(responseData);
        setVitals(responseData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchVitals();
  }, []);
  const lastVital = vitals.length > 0 ? vitals[vitals.length - 1] : {};

  return (
    <div>
      <Navbar />
      
        <Sidebar />
        <div className='two-containers-docks'>
        <div className='main-container'>
        {prescription.map((prescriptionItem, index) => (
          
          <form  key={index} className='previous-prescription'>
            <div className="previous-datapdcvvroyal">
              <p>Date: , By Doctor: </p>
              <div className="action-buttonspdcvvroyal">
                <button className="action-buttonsbpdcvvroyal" >Print</button>
                <button className="action-buttonsbpdcvvroyal" >Email</button>
                <button className="action-buttonsbpdcvvroyal">SMS</button>
              </div>
            </div>
            
            <div className="vitalspdcvvroyal"key={index} >
              <h5 className="h5pdcvvroyal">Vitals Data &nbsp;:</h5>
              <p className="ppdcvvroyal">BP(mmHg):{lastVital.bpn} /{lastVital.bpd}</p>&nbsp;
              <p className="ppdcvvroyal">Pulse(bpm): {lastVital.sugar}</p>
              <p className="ppdcvvroyal">Height(cm): {lastVital.height}</p>
              <p className="ppdcvvroyal">Weight(kg): {lastVital.weight}</p>
              <p className="ppdcvvroyal">Temperature(F):{lastVital.temperature} </p>
              <p className="ppdcvvroyal">BMI: </p>
            </div>
            
            {/* Diagnosis Section */}
            <div className="diagnosis-sectionpdcvvroyal">
              <h5 className="h5pdcvvroyal">Complaints &nbsp;:</h5>

              {prescriptionItem.complaints.map((complaint, complaintIndex) => (
                  <span key={complaintIndex}>
                  {complaint}
                  {complaintIndex < prescriptionItem.complaints.length - 1 ? ', ' : '.'}
                </span>
                ))}
              
            </div>
            <div className="diagnosis-sectionpdcvvroyal">
              <h5 className="h5pdcvvroyal">Diagnosis&nbsp;:</h5>
              {prescriptionItem.diagnosis.map((diagnosis, diagnosisIndex) => (
                 <span key={diagnosisIndex}>
                 {diagnosis}
                 {diagnosisIndex < prescriptionItem.diagnosis.length - 1 ? ', ' : '.'}
               </span>
                  
                ))}
              
            </div><br />

             {/* Medicine Section */}
<h4 className="h2pdcvvroyaltop">Rx</h4><br />
<table className='complaints-tablepdcvvroyal'>
  <thead className="theadpdcvvroyal">
    <tr className="trowpdcvvroyal">
      <th className="theadpdcvvroyal">SNo</th>
      <th className="theadpdcvvroyal">Medicine</th>
      <th className="theadpdcvvroyal">Dose</th>
      <th className="theadpdcvvroyal">When</th>
      <th className="theadpdcvvroyal">Frequency</th>
      <th className="theadpdcvvroyal">Duration</th>
      <th className="theadpdcvvroyal">Notes</th>
    </tr>
  </thead>
  <tbody className="tbodypdcvvroyal">
  {prescriptionItem.medicine.map((medicineItem, medicineIndex) => (
  <tr className="trowpdcvvroyal" key={medicineIndex}>
    <td className="tbodypdcvvroyal">{medicineItem.sno}</td>
    <td className="tbodypdcvvroyal">{medicineItem.medicine}</td>
    <td className="tbodypdcvvroyal">{medicineItem.dose}</td>
    <td className="tbodypdcvvroyal">{medicineItem.when}</td>
    <td className="tbodypdcvvroyal">{medicineItem.frequency}</td>
    <td className="tbodypdcvvroyal">{medicineItem.duration}</td>
    <td className="tbodypdcvvroyal">{medicineItem.notes}</td>
  </tr>
))}

    
  </tbody>
</table><br/>



            {/* Additional Information */}
            <div className="additional-infopdcvvroyal">
              <p className="ppdcvvroyal"><span>Advice&nbsp;:</span> {prescriptionItem.advice}</p><br />
              <p className="ppdcvvroyal"><span> Diet & Exercise &nbsp;:</span> {prescriptionItem.dietexercise}</p><br />
              
              <div className="diagnosis-sectionpdcvvroyal">
              <h5 className="h5pdcvvroyal">Tests Requested&nbsp;:</h5>
              {prescriptionItem.testsRequested.map((testsRequested, testsRequestedIndex) => (
                  <span key={testsRequestedIndex}>
                  {testsRequested}
                  {testsRequestedIndex < prescriptionItem.testsRequested.length - 1 ? ', ' : '.'}
                </span>
                ))}
              
            </div><br />

              
              <p className="ppdcvvroyal"><span>Next Visit &nbsp;: </span>
              {prescriptionItem.nextVisit}&nbsp; {prescriptionItem.nextVisitType} &nbsp;OR&nbsp;{prescriptionItem.nextVisitDate}</p><br />
            </div>
          </form>
        ))}
        </div>
      </div>
    </div>
  );
}

export default PreviousData;
