import axios from "axios"; 
import React, { useEffect, useState } from "react";
import { FaRegSave, FaUserCircle } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import {MdDelete}  from "react-icons/md";
 import {BiPlus}  from "react-icons/bi";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../../../services/Helpers";
import Navbar from "../navbar/navbar";
import "./prescription.css";
import Sidebar from "./sidebar";
const docId = localStorage.getItem("staffid");

const options = [
  { value: "FEVER", label: "FEVER" },
  { value: "COLD", label: "COLD" },
  { value: "COUGH", label: "COUGH" },
  { value: "HEADACHE", label: "HEADACHE" },
  { value: "NASIA", label: "NASIA" },
  { value: "WEAKNESS", label: "WEAKNESS" },
  { value: "WEIGHTLOSS", label: "WEIGHTLOSS" },
];
const data = [
  { value: "HYPERTENSION", label: "HYPERTENSION" },
  { value: "TB", label: "TB" },
  { value: "DIABETES", label: "DIABETES" },
  { value: "THYROID", label: "THYROID" },
  { value: "INSOMNIA", label: "INSOMNIA" },
  { value: "ASTHMA", label: "ASTHMA" },
];

const medicinesFieldsData = {
  doses: ["1-0-1", "0-1-0", "1-0-0","1-1-0","0-1-1","0-0-1","1-1-1"],
  when: ["After Food", "Before Food", "Before Breakfast","After Breakfast","Empty Stomatch"],
  frequencies: ["once daily", "twice daily", "thrice daily","weekly"],
  durations: ["4 days", "1 week", "1 month","15 days"],
};

const Prescription = () => {
  const location = useLocation();
  const selectedAppointment = location.state || {};

  const [labServices, setLabServices] = useState([]);

  const [medicines, setMedicines] = useState([]);
    const [rows, setRows] = useState([generateRow()]); 

    function generateRow() {
      return {
          id: new Date().getTime(), 
          medicineInput: '', 
          dose: '1-0-1', 
          when: 'After Food', 
          frequency: 'once daily',
          duration: '4 days',
          notes: '',
      };
  }

  const handleInputChange = (e, id, field) => {
    const updatedRows = [...rows];
    const rowIndex = updatedRows.findIndex(row => row.id === id);
    updatedRows[rowIndex][field] = e.target.value;
    setRows(updatedRows);
};

const addRow = () => {
    setRows([...rows, generateRow()]);
};

const deleteRow = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
};
const medicicneData = rows.map(row => ({
  medicine: row.medicineInput,
  dose: row.dose,
  when: row.when,
  frequency: row.frequency,
  duration: row.duration,
  notes: row.notes,
}));

useEffect(() => {
  axios.get('http://localhost:5000/api/allMedicines')
    .then((response) => {
      if (Array.isArray(response.data.medicines)) {
        const allMedicines = response.data.medicines.map((invoice) => {
          if (Array.isArray(invoice.medicines)) {
            return invoice.medicines.map((medicine) => medicine.Medicine);
          } else {
            return [];
          }
        });
        const flattenedMedicines = [].concat(...allMedicines);
        setMedicines(flattenedMedicines);
      } else {
        console.error('Medicines array not found in the response data.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  useEffect(() => {
    const fetchLabServices = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/lab-services`
        );
        const labServicesData = response.data;
        setLabServices(labServicesData);
      } catch (error) {
        console.error("Error fetching lab services:", error);
      }
    };

    fetchLabServices();
  }, [labServices]);

  const testOptions = labServices.map((service) => ({
    value: service.testName,
    label: service.testName,
  }));

 

  const [, setTableData] = useState([]);
  const [latestSno, ] = useState(1);
  const [, setNewEntry] = useState({
    sno: latestSno,
    medicine: "",
    dose: "",
    when: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const [selectedoptions, Setselectedoptions] = useState([]);
  const [selecteddata, Setselecteddata] = useState([]);
  const [selectedtest, Setselectedtest] = useState([]);
  const [testWhen, setTestWhen] = useState("none");
  const [nextVisit, setNextVisit] = useState("");
  const [nextVisitType, setNextVisitType] = useState("");
  const [nextVisitDate, setNextVisitDate] = useState("");
  const [ ,setPrinting] = useState(false);
  const [ ,setComplaints] = useState("");
  const [ ,setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [dietexercise, setDietexercise] = useState("");
  const [ ,setTestsRequested] = useState("");
  const [vitals, setVitals] = useState({
    bp: "",
    sugar: "",
    height: "",
    weight: "",
    temperature: "",
    spo2: "",
    pallor: "",
    edema: "",
    lcterus: "",
    lymphadenopathy: "",
    ciubbing: "",
    cyanosis: "",
    jvp: "",
  });


  const handleChange = (selectedoptions) => {
    Setselectedoptions(selectedoptions);
  };

  const handleChange1 = (selecteddata) => {
    Setselecteddata(selecteddata);
  };

  const handleChange2 = (selectedtest) => {
    Setselectedtest(selectedtest);
  };

  const handleSave = async () => {
    console.log("handleSave function called");
    const selectedComplaints = selectedoptions.map((option) => option.value);
    const selectedDiagnosis = selecteddata.map((option) => option.value);
    const selectedTests = selectedtest.map((option) => option.value);
    const testWhenToSend = testWhen === "none" ? "" : testWhen;

    console.log("docId:", docId);

    try {
      // Prepare the updated vitals data
      const updatedVitalsData = {
        bp: vitals.bp,
        sugar: vitals.sugar, 
        height: vitals.height, 
        weight: vitals.weight, 
        temperature: vitals.temperature, 
        spo2: vitals.spo2, 
        pallor: vitals.pallor, 
        edema: vitals.edema, 
        lcterus: vitals.lcterus, 
        lymphadenopathy: vitals.lymphadenopathy, 
        ciubbing: vitals.ciubbing, 
        cyanosis: vitals.cyanosis, 
        jvp: vitals.jvp, 
       
      };
      // console.log(updatedVitalsData)

      // Send the PUT request to update vitals data
      await axios.put(
        `${BASE_URL}/api/patient/Vitals/${selectedAppointment.patientId.toUpperCase()}`,
        updatedVitalsData
      );

      await axios.post(`${BASE_URL}/api/Complaints`, {
        docId: docId,
        patientId: selectedAppointment.patientId.toUpperCase(),
        complaints: selectedComplaints,
        diagnosis: selectedDiagnosis,
        medicine: medicicneData,
        advice,
        dietexercise,
        testsRequested: selectedTests,
        testWhen: testWhenToSend,
        nextVisit: nextVisit,
        nextVisitType: nextVisitType,
        nextVisitDate,
      });

      alert("Saved Successfully");
      setRows([generateRow()]);
    } catch (error) {
      console.error("Error while saving:", error);
      alert("Error while saving. Please check the console for more details.");
    }

    Setselectedoptions([]);
    Setselecteddata([]);
    Setselectedtest([]);
    setComplaints("");
    setDiagnosis("");
    setAdvice("");
    setDietexercise("");
    setTestsRequested("");
    setNextVisit("");
    setNextVisitType("");
    setNextVisitDate("");
    setTableData([]);
    setNewEntry({
      sno: latestSno,
      medicine: "",
      dose: "",
      when: "",
      frequency: "",
      duration: "",
      notes: "",
    });
  };

  useEffect(() => {
    // Fetch vitals data from the API
    const fetchVitals = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/patient/Vitals/${selectedAppointment.patientId.toUpperCase()}`
        );

        const responseData = response.data;
        setVitals(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVitals();
  }, [selectedAppointment.patientId]);

  const handlePrint = () => {
    setPrinting(true);

    const printWindow = window.open("", "_blank");
    const content = document.getElementById("print-content").innerHTML;
    printWindow.document.write(
      "<html><head><title>Prescription</title></head><body>"
    );
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    setPrinting(false);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "yellow" : "white", 
    }),
  };

  return (
    <div >
      <Navbar />

      <Sidebar />

      <div id="print-content" style={{fontFamily: "Inria Serif"}}>
        <div className="others12">
          <header className="patient-name12">
            <h6>
            <FaUserCircle/>
              {selectedAppointment.name} &nbsp;&nbsp;&nbsp;
              {selectedAppointment.patientId.toUpperCase()}&nbsp;&nbsp;
              {docId}
            </h6>
          </header>

          <div  style={{background: '#FFF'}}>
            <label className="vitals-heading12">Vitals</label>

            <div className="vitals-container12" key={vitals.id}>
              <div className="vitals12" >
                <label htmlFor="bp" className="vitals-label12">
                  BP(mmHg)
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  name="bp"
                  className="vitals-input12"
                  value={vitals.bp}
                  onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                />
                /
                <input
                  type="text"
                  name="bp"
                  className="vitals-input12"
                  value={120}
                />
                <label htmlFor="Sugar" className="vitals-label12">
                  Sugar(bpm)
                </label>
                <input
                  type="text"
                  name="Sugar"
                  value={vitals.sugar}
                  className="vitals-input12"
                  onChange={(e) => setVitals({ ...vitals, sugar: e.target.value })}
                />
                <label htmlFor="height" className="vitals-label12">
                  Height(cm)
                </label>
                <input
                  type="text"
                  name="height"
                  className="vitals-input12"
                  value={vitals.height}
                  onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                />
                <label htmlFor="weight" className="vitals-label12">
                  Weight(kg)
                </label>
                <input
                  type="text"
                  name="weight"
                  className="vitals-input12"
                  value={vitals.weight}
                  onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                />
                <label htmlFor="temparature" className="vitals-label12">
                  Tempatature(F)
                </label>
                <input
                  type="text"
                  name="temparature"
                  className="vitals-input12"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                />
              </div>

              <div className="vitals12">
                <label htmlFor="spo2" className="vitals-label12">
                  SPO2(%)
                </label>
                <input
                  type="text"
                  name="spo2"
                  className="vitals-input12"
                  value={vitals.spo2}
                  onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                />
                <label htmlFor="pallor" className="vitals-label12">
                  Pallor()
                </label>
                <input
                  type="text"
                  name="pallor"
                  className="vitals-input12"
                  value={vitals.pallor}
                  onChange={(e) => setVitals({ ...vitals, pallor: e.target.value })}
                />
                <label htmlFor="edema" className="vitals-label12">
                  Edema()
                </label>
                <input
                  type="text"
                  name="edema"
                  className="vitals-input12"
                  value={vitals.edema}
                  onChange={(e) => setVitals({ ...vitals, edema: e.target.value })}
                />
                <label htmlFor="lcterus" className="vitals-label12">
                  lcterus(cm)
                </label>
                <input
                  type="text"
                  name="lcterus"
                  className="vitals-input12"
                  value={vitals.lcterus}
                  onChange={(e) => setVitals({ ...vitals, lcterus: e.target.value })}
                />
                <label htmlFor="lymphademopathy" className="vitals-label12">
                  Lymphademopathy()
                </label>
                <input
                  type="text"
                  name="lymphademopathy"
                  className="vitals-input12"
                  value={vitals.lymphadenopathy}
                  onChange={(e) => setVitals({ ...vitals, lymphadenopathy: e.target.value })}
                />
              </div>
              <div className="vitals12">
                <label htmlFor="clubbing" className="vitals-label12">
                  Clubbing()
                </label>
                <input
                  type="text"
                  name="clubbing"
                  className="vitals-input12"
                  value={vitals.ciubbing}
                  onChange={(e) => setVitals({ ...vitals,ciubbing: e.target.value })}
                />
                <label htmlFor="cyanosis" className="vitals-label12">
                  Cyanosis()
                </label>
                <input
                  type="text"
                  name="cyanosis"
                  className="vitals-input12"
                  value={vitals.cyanosis}
                  onChange={(e) => setVitals({ ...vitals, cyanosis: e.target.value })}
                />
                <label htmlFor="jvp" className="vitals-label12">
                  JVP()
                </label>
                <input
                  type="text"
                  name="jvp"
                  className="vitals-input12"
                  value={vitals.jvp}
                  onChange={(e) => setVitals({ ...vitals, jvp: e.target.value })}
                />
              </div>
            </div>

            <div className="form" >
              <div className="complaints12">
                <div className="complaints-labels12">
                  <label className="label-heading12"  style={{fontFamily: "Inria Serif"}}>Complaints</label>
                  <br />
                </div>
                <div className="complaints-select12">
                  <Select
                    name="complaints"
                    options={options}
                    value={selectedoptions}
                    onChange={handleChange}
                    isMulti={true}
                  ></Select>
                </div>
              </div>

              <div className="complaints12" style={{fontFamily: "Inria Serif"}}>
                <div className="complaints-labels12">
                  <label className="label-heading12" style={{fontFamily: "Inria Serif"}}>Diagnosis</label>
                  <br />
                </div>
                <div className="complaints-select12">
                  <Select
                    name="diagnosis"
                    options={data}
                    value={selecteddata}
                    onChange={handleChange1}
                    isMulti={true}
                  ></Select>
                </div>
              </div>

              <div>
                <div className="medicine-container12"style={{fontFamily: "Inria Serif"}}>
                  <div>
                    <table style={tableStyle}>
                      <thead style={{border:' 0.5px solid rgba(0, 0, 0, 0.30)',

                        background: '#ECECEC'}}>
                        <tr className="table-r12">
                          <th style={thStyle} className="td-sno12">
                            SNo
                          </th>
                          <th style={thStyle}>MEDICINE</th>
                          <th style={thStyle}>Dose</th>
                          <th style={thStyle}>When</th>
                          <th style={thStyle}>Frequency</th>
                          <th style={thStyle}>Duration</th>
                          <th style={thStyle}> Notes/Instructions</th>
                          <th style={thStyle}>Add|DeleteEntry</th>
                        </tr>
                      </thead>
                      <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    list={`medicineList${row.id}`}
                                    value={row.medicineInput}
                                    onChange={(e) => handleInputChange(e, row.id, 'medicineInput')}
                                />
                                <datalist id={`medicineList${row.id}`}>
                                    {medicines && medicines.length > 0 && (
                                        medicines.map((medicine, i) => (
                                            <option key={i} value={medicine} />
                                        ))
                                    )}
                                </datalist>
                            </td>
                            <td>
                                <select
                                    value={row.dose}
                                    onChange={(e) => handleInputChange(e, row.id, 'dose')}
                                >
                                    {medicinesFieldsData.doses.map((dose, i) => (
                                        <option key={i} value={dose}>
                                            {dose}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={row.when}
                                    onChange={(e) => handleInputChange(e, row.id, 'when')}
                                >
                                    {medicinesFieldsData.when.map((time, i) => (
                                        <option key={i} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={row.frequency}
                                    onChange={(e) => handleInputChange(e, row.id, 'frequency')}
                                >
                                    {medicinesFieldsData.frequencies.map((frequency, i) => (
                                        <option key={i} value={frequency}>
                                            {frequency}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={row.duration}
                                    onChange={(e) => handleInputChange(e, row.id, 'duration')}
                                >
                                    {medicinesFieldsData.durations.map((duration, i) => (
                                        <option key={i} value={duration}>
                                            {duration}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.notes}
                                    onChange={(e) => handleInputChange(e, row.id, 'notes')}
                                />
                            </td>
                            <td>
                           
                              <BiPlus  style={{color:'green',fontSize:'30px'}}  onClick={addRow}/>
                              &nbsp;&nbsp;&nbsp;
                                 <MdDelete style={{color:'red',fontSize:'30px'}} onClick={() => deleteRow(row.id)}/>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            
                    </table>
                    
                  </div>
                </div>
              </div>

              <div className="complaints123">
                <div className="complaints-labels12-advice">
                  <label className="label-heading12-advice">Advice</label>
                  <br />
                </div>
                <div className="complaints-select12">
                  <textarea
                    name="advice"
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    className="advice12-advice"
                  ></textarea>
                </div>
              </div>

              <div className="complaints123">
                <div className="complaints-labels12">
                  <label className="label-heading12">Diet & Exercise</label>
                  <br />
                </div>
                <div className="complaints-select12">
                  <textarea
                    name="diet and exercise"
                    className="advice12"
                    value={dietexercise}
                    onChange={(e) => setDietexercise(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="complaints123">
                <div className="label-div12">
                  <label className="label-heading12">Tests Requested</label>
                  <br />
                </div>
                <div className="select-div123">
                  <Select
                    name="tests requested"
                    options={testOptions}
                    value={selectedtest}
                    onChange={handleChange2}
                    isMulti={true}
                    styles={customStyles}
                  />
                </div>
                <div className="complaints123">
                  <div className="input-container12">
                    <label>Test (When)</label>
                    <br />
                  </div>
                  <div className="select-container123">
                    <input
                      name="testwhen"
                      type="text"
                      value={testWhen}
                      onChange={(e) => setTestWhen(e.target.value)}
                      className="custom-input12"
                    />
                    <select
                      name="testwhen"
                      value={testWhen}
                      onChange={(e) => setTestWhen(e.target.value)}
                      className="custom-input12"
                    >
                      <option value="">none</option>
                      <option value="fasting">fasting</option>
                      <option value="after-brkfst">after-brkfst</option>
                      <option value="anytime">anytime</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer-container12">
            <div className="button-group12">
              <button className="spesbutton12" name="save" onClick={handleSave}>
                <FaRegSave />
                &nbsp;Save
              </button>

              <button
                className="spesbutton12"
                name="print"
                onClick={handlePrint}
              >
                <FiPrinter />
                &nbsp;Print
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "15%",
};
const tableStyle = {
  width: "97%",
  borderCollapse: "collapse",
  marginLeft: "1%",
  
 

};


const thStyle = {
  border: '0.5px solid rgba(0, 0, 0, 0.30)',

  background: '#ECECEC',
  fontFamily: "Inter",
  fontWeight: "bold",
  padding: "1%",
  textAlign: "center",
  
  color: "black",
};

// const tdStyle = {
//   padding: "1%",
//   textAlign: "center",
//   border: "1px solid #ccc",
//   backgroundColor: '#FFF',
// };



export default Prescription;