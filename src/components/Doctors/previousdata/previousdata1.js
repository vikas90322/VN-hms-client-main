import React ,{useEffect,useState} from 'react'

import {CgEnter } from 'react-icons/cg'
import './previousdata.css'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Previousdata1 = () => {
  const location = useLocation();
  const selected = location.state || {}; 
  
  const navigate = useNavigate();


  const[diagnosis,setDiagnosis]=useState('');
  

  useEffect(() => {
    // Fetch specialization options from the API
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Generalcase');
        const responseData = response.data;
        console.log(responseData);
        setDiagnosis(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecializations();
  }, []);

  const [, setCombinedData] = useState([]);
  const [, setOriginalAppointments] = useState([]);
  const [, setAppointments] = useState([]);
  const [, setExsistingData] = useState([]);



  useEffect(() => {
    // Fetch initial data when the component mounts
    axios.get('http://localhost:5000/api/v1/combined-data')
      .then((response) => {
        const appointmentsData = response.data.map((data) => ({
          ...data,
          patientId: data.patientId.toLowerCase(),
        }));
        // Fetch exsistingData from the other collection or API
        axios.get('http://localhost:5000/api/v1/existingpatients-data')
          .then((response) => {
            const exsistingData = response.data;
            setExsistingData(exsistingData);

            // Merge appointmentsData and exsistingData into one array
            const mergedData = [...appointmentsData, ...exsistingData];
            setCombinedData(mergedData);

            // Set both appointments and originalAppointments initially
            setAppointments(mergedData);
            setOriginalAppointments(mergedData);
          })
          .catch((error) => {
            console.error('Error fetching exsistingData:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching appointmentsData:', error);
      });
  }, []);



  return (
    <>
    <Navbar/>
    
    <Sidebar/>
    <div className='two-containers-docks' >
  <div className='prev-data-col'>
    <header className='patient-name21'>
      <h6>{selected.name} &nbsp;&nbsp;&nbsp;{selected.id} &nbsp;&nbsp;</h6>
    </header>

    <div className='case-container'>
{/* <label> <FiPrinter/>&nbsp;Print</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><FaDownload/>&nbsp;Download</label><br/><br/>

        <label>General &nbsp;&nbsp;<CgEnter/></label><br/> */}
   <div className='prev-page1234'>
        <table className='case-table'>
          <div className='case-div143'>
        {/* <label> <FiPrinter/>&nbsp;Print</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><FaDownload/>&nbsp;Download</label><br/><br/> */}

<label>General &nbsp;&nbsp;<CgEnter/></label>
</div>


        {Array.isArray(diagnosis) ? (
  diagnosis.map((item, index) => (
    <tbody key={index} >
      <tr className='prev-data789'>
        <td className="table-cell143">Other Comorbidities</td>
      </tr>
      <tr className='odd143'>
        <td className="table-cell143">Diabetic : {item.diabetes.state}</td>
        
      </tr>
      <tr className='even143'>
        <td className="table-cell143">Hypertension : {item.hypertension.state}</td>
      </tr>
      <tr className='odd143'>
        <td className="table-cell143">Typhoid : {item.typhoid.state} </td>
      </tr>
      <tr className='even143'>
        <td className="table-cell143">CMR : {item.cmr.state}</td>
      </tr>
    </tbody>
  ))
) : (
  // Handle the case where diagnosis is not an array, e.g., show an error message
  <p>Diagnosis data is not available or in an unexpected format.</p>
)}

       
</table>
</div>
<center>
<div className='consultation-detailes'>
    
<button className='newvisit-button' onClick={() => navigate('/prescription', { state:  selected  })}>CREATE NEW VISIT</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>OR</b>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/previousdata'><button className='old-visit'>Move and Continue 19 Aug 2023 Visit</button></Link>
<br/><br/>
<p className='oldvisit-date'>{selected.name} has come 3 days early  (Actual New Visit Date 1-Sep-2023 )</p>
<h6>25 VISITS</h6>
<p>Since 09 Dec 2021</p>
    </div>
    </center>
    </div>
    </div>
    </div>
    </>
  )
}

export default Previousdata1