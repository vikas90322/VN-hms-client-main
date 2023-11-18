import React, { useState, useEffect } from 'react';
import './prescription.css'; // Make sure to import your CSS file
import axios from 'axios';
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PrescriptionData = () => {
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prescription');
        const responseData = response.data;
        console.log(responseData);

        setPrescription(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrescription();
  }, []);

  return (
    <div>
      <div className="prescription-container">
        {prescription.map((prescriptionItem, index) => (
          <form key={index} className="prescription-form">
            <div className="prescription-header">
            <Link to="/Patient">
            <FaArrowCircleLeft />
          </Link>
              <p>Date: {prescriptionItem.date}, By Doctor: {prescriptionItem.doctor}</p>
             
            </div>

            <div className="vitals-data" key={index}>
             
              <h5 className="vitals-heading">Vitals Data :</h5>
              <p className="vitals-info">BP(mmHg): {prescriptionItem.bpn} / {prescriptionItem.bpd}</p>&nbsp;
              <p className="vitals-info">Pulse(bpm): {prescriptionItem.pulse}</p>
              <p className="vitals-info">Height(cm): {prescriptionItem.height}</p>
              <p className="vitals-info">Weight(kg): {prescriptionItem.weight}</p>
              <p className="vitals-info">Temperature(F): {prescriptionItem.temperature}</p>
              <p className="vitals-info">BMI: {prescriptionItem.bmi}</p>
            </div>

            <div className="complaints-section">
     
              <h5 className="complaints-heading">Complaints :</h5>
              {prescriptionItem.complaints.map((complaint, complaintIndex) => (
                <span key={complaintIndex}>
                  {complaint}
                  {complaintIndex < prescriptionItem.complaints.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </div>

            <div className="diagnosis-section">
             
              <h5 className="diagnosis-heading">Diagnosis :</h5>
              {prescriptionItem.diagnosis.map((diagnosis, diagnosisIndex) => (
                <span key={diagnosisIndex}>
                  {diagnosis}
                  {diagnosisIndex < prescriptionItem.diagnosis.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </div>
            <br />

            
            <h4 className="medicine-heading"> </h4>
            <br />
            <table className="medicine-table">
              <thead className="table-header" >
                <tr className="table-row">
                  <th className="table-header">SNo</th>
                  <th className="table-header">Medicine</th>
                  <th className="table-header">Dose</th>
                  <th className="table-header">When</th>
                  <th className="table-header">Frequency</th>
                  <th className="table-header">Duration</th>
                  <th className="table-header">Notes</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {prescriptionItem.medicine.map((medicineItem, medicineIndex) => (
                  <tr className="table-row" key={medicineIndex}>
                    <td className="table-data">{medicineItem.sno}</td>
                    <td className="table-data">{medicineItem.name}</td>
                    <td className="table-data">{medicineItem.dose}</td>
                    <td className="table-data">{medicineItem.when}</td>
                    <td className="table-data">{medicineItem.frequency}</td>
                    <td className="table-data">{medicineItem.duration}</td>
                    <td className="table-data">{medicineItem.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />

            {/* Additional Information */}
            <div className="additional-info">
              {/* Access advice, dietexercise, testsRequested, nextVisit, nextVisitType, and nextVisitDate */}
              <p className="advice-info"><span>Advice :</span> {prescriptionItem.advice}</p>
              <br />
              <p className="diet-exercise-info"><span>Diet and Exercise :</span> {prescriptionItem.dietexercise}</p>
              <br />
              <div className="tests-requested-section">
                <h5 className="tests-requested-heading">Tests Requested :</h5>
                {prescriptionItem.testsRequested.map((testsRequested, testsRequestedIndex) => (
                  <span key={testsRequestedIndex}>
                    {testsRequested}
                    {testsRequestedIndex < prescriptionItem.testsRequested.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </div>
              <br />
              <p className="next-visit-info"><span>Next Visit :</span> {prescriptionItem.nextVisit}<br/>
              <span>VisitType:</span> {prescriptionItem.nextVisitType}<br/>
              <span>Visit Date:</span> {prescriptionItem.nextVisitDate}</p>
              <br />
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionData;