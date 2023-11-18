
import React, { useState } from 'react';
import './gynic.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Gynic = () => {
 
  const [tableData, setTableData] = useState([
    { pregnancy: '', delivery: '', baby: '', birthWeight: '', puerperium: '' },
  ]);
  const [tableData1, setTableData1] = useState([
    {
      date: '',
      complaints: '',
      weight: '',
      bloodPressure: '',
      edema: '',
      cvsr: '',
      pog: '',
    },
  ]);
  const [fromData, setFromData] = useState({
    DRUGALLERGY: '',
    EDDbyscan: '',
    Height: '',
    Breasts: '',
    BMI: '',
    TdVac: '',
    Name1: '',
    BloodGroupRh: '',
    CVS: '',
    Rs: '',
    Weight: '',
    TetVac: '',
    Boosterix: '',
    Wo: '',
    HusbandsBloodGroupRh: '',
    InfluenzaVaccine: '',
    ML: '',
    MH: '',
    MEDICALHISTORY: '',
    Age1: '',
    RUBELLASTATUS: '',
    DOB: '',
    HT: '',
    DM: '',
    Tel: '',
    CongAnomalies: '',
    LMP: '',
    ThyroidDisorder: '',
    EDD: '',
    Twins: '',
    PA: '',
  });

  const [activeButton, setActiveButton] = useState('Gynic');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

 

  // Function to handle changes in table input fields
  const handleTableInputChange = (e, rowIndex, columnName) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = e.target.value;
    setTableData(updatedData);
    
  };
  const handleTableInputChange3 = (e) => {
    const { name, value } = e.target;
    setFromData({
      fromData,
      [name]: value,
    });
  };

  // Function to add a new row to the table
  const addTableRow = () => {
    setTableData([...tableData, { pregnancy: '', delivery: '', baby: '', birthWeight: '', puerperium: '' }]);
  };

  // Function to remove a row from the table
  const removeTableRow = (rowIndex) => {
    const updatedData = [...tableData];
    updatedData.splice(rowIndex, 1);
    setTableData(updatedData);
  };

  const handleTableInputChange1 = (e, rowIndex, columnName) => {
    const updatedData = [...tableData1];
    updatedData[rowIndex][columnName] = e.target.value;
    setTableData1(updatedData);
  };



  // const saveData = (e) => {
  //   e.preventDefault();

  //   const combinedData = [...tableData, ...tableData1, fromData];

  //   fetch('http://localhost:5000/api/saveData', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(combinedData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         alert('Data saved successfully!');
  //         console.log(combinedData)
  //       } else {
  //         alert('Error');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error saving data:', error);
  //       alert('Error saving data. Please try again.');
  //     });
  // };

  const saveData = async (e) => {
    e.preventDefault();

    try {
      console.log(tableData,tableData1,fromData);
      await axios.post('http://localhost:5000/api/saveData', {tableData,tableData1,fromData});
      alert('Saved Successfully');
    
    } catch (error) {
      alert('Error while logging in', error);
    }

   
  };


  return (
    <>
      <Navbar />
      <Sidebar />
      <form onSubmit={saveData}>
      <div className='two-containers-docks23'>
      
        <div className='button-containercvvroyaldiabetis'>
          <button
            className={`button-generalcvvroyal ${activeButton === 'General' ? 'active' : ''}`}
            onClick={() => handleButtonClick('General')}
          >
            General
          </button>
          <Link to='/diabetic'>
            <button
              className={`button-diabetescvvroyal ${activeButton === 'Diabetes' ? 'active' : ''}`}
              onClick={() => handleButtonClick('Diabetes')}
            >
              Diabetes
            </button>
          </Link>
          <Link to='/dental'>
            <button
              className={`button-diabetescvvroyal ${activeButton === 'Dental' ? 'active' : ''}`}
              onClick={() => handleButtonClick('Dental')}
            >
              Dental
            </button>
          </Link>
          <Link to='/gynic'>
            <button
              className={`button-diabetescvvroyal ${activeButton === 'Gynic' ? 'active' : ''}`}
              onClick={() => handleButtonClick('Gynic')}
            >
              Gynic
            </button>
          </Link>
        </div>
        <div className='A7total'>
          <div className='A7header'>
            <div className='header-content'></div>
            <h1 className='A7h1common'>Janani</h1>
            <p className='A7h1common'>
              <b className='A7h1common'>JANANI SPECIALITY OBSTETRICS & GYNECOLOGY CLINIC</b>
              <br />
              629, 8th B Main Road, 3rd Stage, 2nd Block,<br />
              Basaveshwaranagar, Bangalore -560079<br />
              Clinic : 2322 5550, 90368177,<br />
              E-mail : jananiclinics@gmail.com
            </p>
          </div>
          <b className='A7h1common'>
            <p>(In case of emergency contact Citi Hospital, Chard Road Hospital, Kade Hospital, Sidwin Hospital, Kangaroo Care)</p>
          </b>
          <hr />
          <div className='containerA7'>
        <div className='A7leftdiv'>
        
       <b  className='A7h1common' ><p  className='A7h1common'>Name : <input type="text"
  name="Name1" value={fromData.Name1} onChange={handleTableInputChange3}></input> </p> 

             
        <p className='A7h1common'  >W/o : <input  className='A7h1common'   type="text"
            id="Wo"
            name="Wo" value={fromData.Wo}
              onChange={handleTableInputChange3}></input></p><br/><br/>
        <p className='A7h1common' >ML :<input  value={fromData.ML}
              onChange={handleTableInputChange3}></input></p>
        <p className='A7h1common' >MH :<input  value={fromData.MH}
              onChange={handleTableInputChange3}></input></p><br/>
        <p className='A7h1common' >Obsteric History : G__ P__ L__ A__</p></b>
        </div>
        <div className='A7rightdiv'>
         <b className='A7h1common' ><p  className='A7h1common'>
        Age : <input  className='A7h1common'   value={fromData.Age1}
              onChange={handleTableInputChange3}></input><br/>
        D.O.B : <input   className='A7h1common'   value={fromData.DOB}
              onChange={handleTableInputChange3}></input><br/>
        Tel. No :<input className='A7h1common' type='number'  value={fromData.Tel}
              onChange={handleTableInputChange3}></input><br/>
        
        </p>
        <div className='containerA7'><div className='A7subdivs outer-container'>L.M.P<input   value={fromData.LMP}
              onChange={handleTableInputChange3}></input></div>&nbsp;
        <div className='A7subdivs outer-container'>E.D.D<input   value={fromData.EDD}
              onChange={handleTableInputChange3}/></div>&nbsp;
        <div className='A7subdivs outer-container'>E.D.D by scan<input   value={fromData.EDDbyscan}
              onChange={handleTableInputChange3}/></div></div>&nbsp;
        <br/>
        <p  className='A7h1common'>Blood Group & Rh : <input  className='A7h1common'  value={fromData.BloodGroupRh}
              onChange={handleTableInputChange3}></input></p>
        
        <p className='A7h1common'>Husband's Blood Group & Rh :<input   value={fromData.HusbandsBloodGroupRh}
              onChange={handleTableInputChange3} className='A7h1common'></input></p>
        </b>
        
        </div>

   </div>
   <div className='A7tabdiv'>
   <table className='A7tab'>
    <thead  className='A7h1common'>
    <tr  className='A7h1common'>
    <th  className='A7h1common'>NO.</th>
    <th  className='A7h1common'>PREGNANCY</th>
    <th  className='A7h1common'>DELIVERY</th>
    <th  className='A7h1common'>BABY</th>
    <th  className='A7h1common'>BIRTH WEIGHT</th>
    <th  className='A7h1common'>PUERPERIUM</th>
    </tr>
    </thead>
    <tbody  className='A7h1common'>
          {tableData.map((rowData, rowIndex) => (
            <tr   className='A7h1common'  key={rowIndex}>
              <td  className='A7h1common'>{rowIndex + 1}</td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.pregnancy}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'pregnancy')}
                />
              </td>
              <td  className='A7h1common' >
                <input  className='A7h1common'
                  type="text"
                  value={rowData.delivery}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'delivery')}
                />
              </td>
              <td  className='A7h1common' >
                <input  className='A7h1common'
                  type="text"
                  value={rowData.baby}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'baby')}
                />
              </td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.birthWeight}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'birthWeight')}
                />
              </td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.puerperium}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'puerperium')}
                />
              </td>
             <td>
                <button onClick={() => removeTableRow(rowIndex)}><MdDelete/></button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      <button  className='A7h1common' onClick={addTableRow}>Add Row</button>
   </div>
   <div  className='A7h1common'>
   <div className='containerA7'>
        <div className='A7leftdiv1'>
            <b  className='A7h1common'>
        <p  className='A7h1common'>DRUG ALLERGY : <input   value={fromData.DRUGALLERGY}
              onChange={handleTableInputChange3}></input></p> <br/>
        <p  className='A7h1common'>MEDICAL HISTORY:<input   value={fromData.MEDICALHISTORY}
              onChange={handleTableInputChange3}></input></p><br/><br/>
        <br/>
        <p className='A7h1common'>RUBELLA STATUS :<input   value={fromData.RUBELLASTATUS}
              onChange={handleTableInputChange3}></input> </p></b>
        </div>
        <div className='A7rightdiv1'>
         <b className='A7h1common'><p className='A7h1common'>
        FAMILY HISTORY  
        </p></b><br/>
        <div className='containerA7'>
        <div className='A7h1common'>HT:<input    value={fromData.HT}
              onChange={handleTableInputChange3} className='A7h1common'></input></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div  className='A7h1common'>DM:<input   value={fromData.DM}
              onChange={handleTableInputChange3} className='A7h1common'></input></div>
        </div><br/>
        <p  className='A7h1common'>Cong. Anomalies :<input    value={fromData.CongAnomalies}
              onChange={handleTableInputChange3} className='A7h1common'></input></p>
        <p  className='A7h1common'>Thyroid Disorder :<input    value={fromData.ThyroidDisorder}
              onChange={handleTableInputChange3} className='A7h1common'></input></p>
        <p className='A7h1common'>Twins :<input  className='A7h1common'   value={fromData.Twins}
              onChange={handleTableInputChange3}></input></p>
        </div>
       
   </div>
   <hr/>
   <div>
   <div className='containerA7'>
        <div className='A7rightdiv1'>
            <p>Height :<input   value={fromData.Height}
              onChange={handleTableInputChange3}></input> </p> 
        <p>Breasts :<input  value={fromData.Breasts}
              onChange={handleTableInputChange3}></input></p>
        <p>C.V.S :<input   value={fromData.CVS}
              onChange={handleTableInputChange3}></input> </p>
        <p>R.S<input   value={fromData.Rs}
              onChange={handleTableInputChange3}></input></p>
        </div>
        <div className='A7rightdiv1'>
            <p>Weight :<input   value={fromData.Weight}
              onChange={handleTableInputChange3}></input> </p> 
        <p>B.M.I :<input  value={fromData.BMI}
              onChange={handleTableInputChange3}></input></p>
        <p>P.A :<input   value={fromData.PA}
              onChange={handleTableInputChange3}></input> </p>
        </div>
        <div className='A7rightdiv1'>
            <p>Tet Vac :<input   value={fromData.TetVac}
              onChange={handleTableInputChange3}></input> </p> 
        <p>Td Vac :<input   value={fromData.TdVac}
              onChange={handleTableInputChange3}></input></p>
        <p>Boosterix :<input   value={fromData.Boosterix}
              onChange={handleTableInputChange3}></input> </p>
        <p>Influenza Vaccine :<input   value={fromData.InfluenzaVaccine}
              onChange={handleTableInputChange3}></input></p>
        </div>
       </div>
   </div>
   
   <div className='A7lastdiv'>
   <b>Please bring the card during each visit and on admission</b>
   
   </div>
   </div>
   <br/>
   <br/>
   <br/>
   <div className='A7tabdiv'>
      <table className="A7tab">
        <thead>
          <tr>
            <th>Date</th>
            <th>Complaints</th>
            <th>Wt(in Kgs)</th>
            <th>B.P. (mm of Hg)</th>
            <th>Edema</th>
            <th>C.V.S.R.S</th>
            <th>POG</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  value={rowData.date}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'date')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.complaints}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'complaints')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.weight}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'weight')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.bloodPressure}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'bloodPressure')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.edema}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'edema')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.cvsr}
                  onChange={(e) => handleTableInputChange1(e, rowIndex, 'cvsr')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.pog}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'pog')}
                />
              </td>
              <td>
                <button onClick={() => removeTableRow(rowIndex)}><MdDelete/></button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addTableRow}>Add Row</button>
    </div>
    <div className='empid144submitb'>
          <button className='empid144subbuton' type="saveData" onClick={saveData}>Save</button>
   <Link to='/gynic1'> <button className='empid144nxtbuton' type="button">Next</button></Link>
        </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default Gynic;