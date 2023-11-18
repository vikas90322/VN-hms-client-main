
import React, { useState } from 'react';
import './gynic1.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import axios from 'axios';

function TrimesterNames() {
   const [trimesters, ] = useState([
    {
      trimester: 1,
      names: [
        { id: 1, value: '', name: 'HB%,PCV' },
        { id: 2, value: '', name: 'Peripheralsmear' },
        { id: 3, value: '', name: 'Blood Group&Rh' },
        { id: 4, value: '', name: 'TSH,FT4' },
        { id: 5, value: '', name: 'V .D .R .L' },
        { id: 6, value: '', name: 'HBs Ag' },
        { id: 7, value: '', name: 'HCV' },
        { id: 8, value: '', name: 'HIV I &II' },
        { id: 9, value: '', name: 'URINE' },
      ],
    },
    {
      trimester: 2,
      names: [
        { id: 1, value: '', name: 'Hb PCV' },
    { id: 2, value: '', name: 'Platlets' },
    { id: 3, value: '', name: 'ICT' },
    { id: 4, value: '', name: 'TSH' },
    { id: 5, value: '', name: 'Urine R/E' },
    { id: 6, value: '', name: 'Urine C/S' },
    { id: 7, value: '', name: 'S Ferritin' },
    { id: 8, value: '', name: 'S Vit B12' },
    { id: 9, value: '', name: '' },
      ],
    },
    {
      trimester: 3,
      names: [
        { id: 1, value: '', name: 'Hb PCV' },
    { id: 2, value: '', name: 'Platelets' },
    { id: 3, value: '', name: 'PT/PTT' },
    { id: 4, value: '', name: 'INR' },
    { id: 5, value: '', name: '' },
    { id: 6, value: '', name: '' },
    { id: 7, value: '', name: '' },
    { id: 8, value: '', name: '' },
    { id: 9, value: '', name: '' },
      ],
    },
    {
      trimester: 4,
      names: [
        { id: 1, value: '', name: 'Double Marker' },
        { id: 2, value: '', name: 'Quadruple Marker' },
        { id: 3, value: '', name: 'G C T 75 (I) / R B S' },
        { id: 4, value: '', name: 'GCT 75 (II)' },
        { id: 5, value: '', name: 'GCT 75 (III' },
        { id: 6, value: '', name: 'HbA1C' },
        { id: 7, value: '', name: 'Anti TPO Antibodles' },
        { id: 8, value: '', name: 'Anti D' },
        { id: 9, value: '', name: 'NST' },
       
      ],
    },
  ]);

  const handleNameChange = (trimester, id, newName) => {
    // Your handleNameChange function here...
  };

  // Function to send data to the server
  const sendDataToServer = () => {
    axios.post('your-api-endpoint-url', { trimesters })
      .then(response => {
        console.log('Data sent successfully', response);
      })
      .catch(error => {
        console.error('Failed to send data to the server', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className='two-containers-docks'>
        <Sidebar />
        <div className='abc'>
          <h1 className='headsk14'>INVESTIGATIONS:</h1>
          <div className="trimester-container">
            {trimesters.map((trimesterItem) => (
              <div key={trimesterItem.trimester} className="trimester">
                <h1>{`${trimesterItem.trimester} Trimester`}</h1>
                <table className="trimester-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Input Field</th>
                                </tr>
                              </thead>
                              <tbody>
                                {trimesterItem.names.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                      <input
                                        type="text"
                                        value={item.value}
                                        onChange={(e) =>
                                          handleNameChange(
                                            trimesterItem.trimester,
                                            item.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
              </div>
            ))}
          </div>
          <br/><br/>
      <h3>Consent By Patient.....................</h3>
      <div>
  <h1 className='headsk14'>Scanning :</h1>
  <table className="scanning-table">
    <thead>
      <tr>
        <th className="scanning-table-th">Dating Scan</th>
        <th className="scanning-table-th"  >NT & NB Scan</th>
        <th className="scanning-table-th">Anomaly Scan</th>
        <th className="scanning-table-th">Interval Growth Scan</th>
        <th className="scanning-table-th">BPP Scan</th>
      </tr>
    </thead>
    <tbody >
      <tr >
      <td className="table-cell">
    G.Age: <input className='sss' type="text"/>
  </td>
  <td className="table-cell">
    G.Age: <input className='sss' type="text"/>
  </td>
  <td className="table-cell">
    G.Age: <input className='sss' type="text"/>
  </td>
  <td className="table-cell">
    G.Age: <input className='sss' type="text"/>
  </td>
  <td className="table-cell">
    EFW : <input className='sss' type="text"/>
  </td>
      </tr>
      <tr>
        <td className="table-cell">EDD : <input className='sss' type="text"/></td>
        <td className="table-cell">EDD : <input className='sss' type="text"/></td>
        <td className="table-cell">EDD : <input className='sss' type="text"/></td>
        <td className="table-cell">EFW : <input className='sss' type="text"/></td>
        <td className="table-cell">AFI : <input className='sss' type="text"/></td>
      </tr>
      <tr>
        <td className="table-cell"></td>
        <td className="table-cell">NT : <input className='sss' type="text"/> | NB: <input className='sss' type="text"/></td>
        <td className="table-cell">EFW : <input className='sss' type="text"/></td>
        <td className="table-cell">EDD : <input className='sss' type="text"/></td>
        <td className="table-cell">BPP : <input className='sss' type="text"/></td>
      </tr>
      
      <tr>
        <td className="table-cell"></td>
        <td className="table-cell">Ut A PI : <input className='sss' type="text"/></td>
        <td className="table-cell">Cervical Length : <input className='sss' type="text"/></td>
        <td className="table-cell">AFI : <input className='sss' type="text"/></td>
        <td className="table-cell">BPP : <input className='sss' type="text"/></td>
      </tr>
      <tr>
        <td className="table-cell"></td>
        <td className="table-cell">Placenta: <input className='sss' type="text"/></td>
        <td className="table-cell">F ECHO : <input className='sss' type="text"/></td>
        <td className="table-cell">Placenta : <input className='sss' type="text"/></td>
        <td className="table-cell"> </td>
      </tr>
      <tr>
        <td className="table-cell"></td>
        <td className="table-cell">Cervical Length : <input className='sss' type="text"/></td>
        <td className="table-cell"></td>
        <td className="table-cell"></td>
        <td className="table-cell"></td>
      </tr>
    </tbody>
    <button style={{justifyContent:'left'}}>save</button>
  </table>
 
</div>

<div className='sss1'>
<div className='warning-ipog'>
        <p className="warning-title"><strong>WARNING SIGNS</strong></p>
        <p>Please report if you have any of the symtoms:</p>
        <p>1. Vaginal Bleeding</p>
        <p>2. Watery Discharge/Leaking</p>
        <p>3. Swelling of the legs/severe Headache/Blurring of vision</p>
        <p>4. Reduced/No Movement of the baby</p>
        <p>5. Abdominal Pain</p>
      </div>

      <div className='Remarks-page-tnx-ipog'>
      <p className="heading-remarks-tnx-ipog">Comments:</p>
        <textarea className='rectangle-box-ipog' type='text' col='12' rows='5'/>
      </div>
      </div>
          <button onClick={sendDataToServer}>Save Data</button> {/* Button to trigger the POST request */}
        </div>
      </div>
    </>
  );
}

export default TrimesterNames;



