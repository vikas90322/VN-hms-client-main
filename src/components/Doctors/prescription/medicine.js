
import React, { useState, useRef } from 'react';
import './prescription.css'

import { MdDelete } from 'react-icons/md'
import axios from 'axios';




const Medicine = () => {

    const [tableData, setTableData] = useState([]);
    const [latestSno, setLatestSno] = useState(1);
  const [newEntry, setNewEntry] = useState({
    sno: latestSno,
    medicine: '',
    dose: '',
    when: '',
    frequency: '',
    duration: '',
    notes: '',
    
  });
  const snoInputRef = useRef(null);
  const medicineInputRef = useRef(null);
  const doseInputRef = useRef(null);
  const whenInputRef = useRef(null);
  const frequencyInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const notesInputRef = useRef(null);

  const handleKeyDown = (event, fieldName) => {
    if (event.key === 'ArrowRight' || event.key === 'Enter') {

      if (fieldName === 'sno' && medicineInputRef.current) {
        medicineInputRef.current.focus();
      } 
      else if (fieldName === 'medicine' && doseInputRef.current) {
        doseInputRef.current.focus();
      } 
      else if (fieldName === 'dose' && whenInputRef.current) {
        whenInputRef.current.focus();
      } 
      else if (fieldName === 'when'&& frequencyInputRef.current) {
        frequencyInputRef.current.focus();
      }
      else if (fieldName === 'frequency'&& durationInputRef.current) {
        durationInputRef.current.focus();
      }
      else if (fieldName === 'duration'&& notesInputRef.current) {
        notesInputRef.current.focus();
      }

      else if(fieldName==='notes'){
        addNewEntry();
      }
      
    }
  };

  const addNewEntry = () => {
    if ( newEntry.medicine.trim() !== '' && newEntry.dose.trim() !== '' && newEntry.when.trim() !== '' && newEntry.frequency.trim() !== ''&& newEntry.duration.trim() !== ''&& newEntry.notes.trim() !== '') {
      setTableData([...tableData, newEntry]);
      setLatestSno(latestSno + 1);
      setNewEntry({
        sno:latestSno + 1 ,
        medicine: '',
        dose: '',
        when: '',
        frequency: '',
        duration: '',
        notes:''
      });
      if (snoInputRef.current) {
        snoInputRef.current.focus();
      }
    }
  };

  const deleteEntry = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };


  // const [savedData, setSavedData] = useState([]);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5005/Prescription', tableData);
      alert('Saved Successfully');
    } catch (error) {
      console.error('Error while saving:', error);
      alert('Error while saving. Please check the console for more details.');
    }
  
    setTableData([]); // Clear the tableData array
    setNewEntry({
      sno: '',
      medicine: '',
      dose: '',
      when: '',
      frequency: '',
      duration: '',
      notes: '',
    });
  };
  

  // Function to save data to the backend
  
   return (
    <div className='medicine-container12'>
   <div >
    
    <table style={tableStyle} className='tablepmed234'>
        <thead  >
          <tr className='table-r12'>
            <th  style={thStyle} className='td-sno12'>SNo</th>
            <th style={thStyle} className='td-sno12'>MEDICINE</th>
            <th style={thStyle} className='td-sno12'>Dose</th>
            <th style={thStyle} className='td-sno12'>When</th>
            <th style={thStyle} className='td-sno12'>Frequency</th>
            <th style={thStyle} className='td-sno12'>Duration</th>
            <th style={thStyle} className='td-sno12'> Notes/Instructions</th>
             {/* Column for delete button */}
          </tr>
        </thead>
        <tbody >
          {tableData.map((entry, index) => (
            <tr key={index} className='table-r12'>
              <td style={tdStyle} className='medicine-color23'>{entry.sno}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.medicine}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.dose}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.when}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.frequency}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.duration}</td>
              <td style={tdStyle} className='medicine-color23'>{entry.notes}</td>
              
                <i onClick={() => deleteEntry(index)}> <MdDelete/></i>
              
            </tr>
          
          ))}
          <tr className='table-r12'>
            <td className='table-c12'>
              <input
                type="text"
                className='prescription-input12'
                value={newEntry.sno}
                onChange={(e) => setNewEntry({ ...newEntry, sno: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'sno')}
                ref={snoInputRef}
              />
            </td>
            <td className='table-c12'>
              <select
                
                className='prescription-input12'
                value={newEntry.medicine}
                onChange={(e) => setNewEntry({ ...newEntry, medicine: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'medicine')}
                ref={medicineInputRef}>
                    <option value=''></option>
                    <option value='CITEREZ 10 MG TABLET'>CITEREZ 10 MG TABLET</option>
                    <option value='ALDOCTONE 25MG TABLET'>ALDOCTONE 25MG TABLET</option>
                    <option value='PARACETOMAL 125MG SYRUP'>PARACETOMAL 125MG SYRUP</option>
                    <option value='TADORA 20MG TABLET'>TADORA 20MG TABLET</option>
                    <option value='UPWARDZ 20MG TABLET'>UPWARDZ 20MG TABLET</option>
                    
                </select>
              
            </td>
            <td className='table-c12'>
              <select
            
            className='prescription-input12'
                value={newEntry.dose}
                onChange={(e) => setNewEntry({ ...newEntry, dose: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'dose')}
                ref={doseInputRef}
              >
             <option></option>
             <option value='1-0-1'>1-0-1</option>
             <option value='0-1-0'>0-1-0</option>
             <option value='1-0-0'>1-0-0</option>
             <option value='1-0-1'>1-0-1</option>
             <option value='0-0-1'>0-0-1</option>
             <option value='1-1-1'>1-1-1</option>
              </select>
            </td>

            <td className='table-c12'>
              <select
                
                
                className='prescription-input12'
                
                value={newEntry.when}
                onChange={(e) => setNewEntry({ ...newEntry, when: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'when')}
                ref={whenInputRef}
              ><option></option>
                <option value='After Food'>After Food</option>
                <option value='Before Food'>Before Food</option>
                <option value='Before Breakfast'>Before Breakfast</option>
                <option value='After Breakfast'>After Breakfast</option>
                <option value='Empty Stomatch'>Empty Stomatch</option>
              </select>
            </td>
            <td className='table-c12'>
              <select
                
                className='prescription-input12'
                value={newEntry.frequency}
                onChange={(e) => setNewEntry({ ...newEntry, frequency: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'frequency')}
                ref={frequencyInputRef}
              >
                <option></option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
              </select>
            </td>
            <td className='table-c12'>
              <select
                type='text'
                className='prescription-input12'
                value={newEntry.duration}
                onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'duration')}
                ref={durationInputRef}
              >
                <option></option>
                <option value='4days'>4days</option>
                <option value='1 week'>1 week</option>
                <option value='1 month'>1month</option>
                <option value='15 days'>15 days</option>
              </select>
            </td>
            <td className='table-c12'>
              <input
                type="text"
                className='prescription-input12'
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'notes')}
                ref={notesInputRef}
              />
            </td>
            
          </tr>
        </tbody>
      </table>

</div>
<button onClick={handleSave}>Save</button>

</div>

 )
}


const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  //   backgroundColor: '#B0C4DE',
};
// const h11 = {
//   marginTop: '10px',
//   textAlign: 'left'
// }

const thStyle = {
  backgroundColor: '#ccc',

  fontWeight: 'bold',
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ccc',
  color: 'black',
};

const tdStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ccc',
  backgroundColor:'white'
  

};

// const evenRowStyle = {
//   backgroundColor: 'dark'
// };

export default Medicine
