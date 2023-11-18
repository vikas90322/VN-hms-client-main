import React, { useState } from 'react';
import './dentalform2.css'; // Make sure to import your CSS file
import Navbar from '../../navbar/navbar';
import Sidebar from '../../prescription/sidebar';

function DentalForm2() {
  const [prescriptionInfo, setPrescriptionInfo] = useState({
    date: '',
    treatment: '',
    patientSignature: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionInfo({ ...prescriptionInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from actually submitting

    try {
      const response = await fetch('http://localhost:5000/api/dentalTreatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionInfo),
      });

      if (response.status === 201) {
        // Handle successful submission, e.g., show a success message or redirect
        alert('saved successfully');
      } else {
        console.error('Error while saving');
      }
    } catch (error) {
      console.error('Error while submitting:', error);
    }

    // Clear the form data after submission if needed
    setPrescriptionInfo({
      date: '',
      treatment: '',
      patientSignature: '',
    });
  };

  return (
<>
    <Navbar />
      <div className='two-containers-docks'>
        <Sidebar />
    <div className="prescription-container147">
      <form onSubmit={handleSubmit}>
        <table className="prescription-table147">
          <thead>
            <tr>
              <th className='date-cell147'>
                Date
              </th>
              <th className='treatment-cell147'>
                Treatment Done and Next Appointment
              </th>
              <th className='signature-cell147'>
                Patient and Dentist Signature Amount Paid
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bordered-cell147">
                <textarea
                  className='input-field147'
                  name="date"
                  value={prescriptionInfo.date}
                  onChange={handleChange}
                  rows="4"
                  wrap="soft"
                />
              </td>
              <td className="bordered-cell147">
                <textarea
                  className='input-field147'
                  name="treatment"
                  value={prescriptionInfo.treatment}
                  onChange={handleChange}
                  rows="4"
                  wrap="soft"
                />
              </td>
              <td className="bordered-cell147">
                <textarea
                  className='input-field147'
                  name="patientSignature"
                  value={prescriptionInfo.patientSignature}
                  onChange={handleChange}
                  rows="4"
                  wrap="soft"
                />
              </td>
            </tr>
          </tbody>
        </table>
          <div className='button-submit456'>
        <button type="submit" className='submit-button147'>Submit</button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default DentalForm2;