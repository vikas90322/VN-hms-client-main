import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './dentalform1.css'
import axios from 'axios';
import Navbar from '../../navbar/navbar';
import Sidebar from '../../prescription/sidebar';

const DentalForm1 = () => {


    const [checkboxes, setCheckboxes] = useState({
        diabetesYes: false,
        diabetesNo: false,
        hypertensionYes: false,
        hypertensionNo: false,
        historyOfAsthmaYes: false,
        historyOfAsthmaNo: false,
        recentHospitalizationYes: false,
        recentHospitalizationNo: false,
        bleedingDisordersYes: false,
        bleedingDisordersNo: false,
        acidityYes: false,
        acidityNo: false,
        historyOfMyocardialInfarctionYes: false,
        historyOfMyocardialInfarctionNo: false,
        prostheticReplacementsYes: false,
        prostheticReplacementsNo: false,
        liverDiseasesYes: false,
        liverDiseasesNo: false,
        renalDiseasesYes: false,
        renalDiseasesNo: false,
        thyroidDiseasesYes: false,
        thyroidDiseasesNo: false,
        underTreatmentYes: false,
        underTreatmentNo: false,
      });
    
      const [formData, setFormData] = useState({
        chiefComplaint: '',
        kindlyMentionDetails: '',
        drugsAllergy: '',
        latexAllergy: '',
        otherMaterialAllergy: '',
        pregnant: '',
        breastFeeding: '',
        hormonalTherapy: '',
        birthControlPills: '',
        tobaccoUse: '',
        tobaccoForm: '',
        tobaccoDuration: '',
        tobaccoFrequency: '',
        alcoholUse: '',
        alcoholDuration: '',
        alcoholFrequency: '',
        otherAddiction: '',
        thumbSucking: '',
        nailBiting: '',
        otherHabit: '',
        extraOralExamination: '',
        lymphNodes: '',
        tmj: '',
       
        intraOralExamination: '',
        teethPresent1: '',
        teethPresent2: '',
        teethPresent3: '',
        teethPresent4: '',
        occlusion: '',
        mobility: '',
        dentalCaries: '',
        pulpInfection: '',
        periodontalPockets: '',
        washingDisease: '',
        calculus: '',
        stains: '',
        introoralSoftTissues: '',
        buccalMucosa: '',
        floorOfMouth: '',
        tongue: '',
        gingiva: '',
        hardPlate: '',
        alveolarMucosa: '',
        vestibute: '',
        provisionalDiagnosis: '',
        finalDiagnosis: '',
        treatmentPlan: '',
        investigations: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
    
        // Determine the opposite option (Yes or No)
        const oppositeOption = name.endsWith('Yes') ? name.replace('Yes', 'No') : name.replace('No', 'Yes');
    
        // Uncheck the opposite option
        setCheckboxes({ ...checkboxes, [oppositeOption]: false, [name]: checked });
      };


      const handleSave = async (e) => {
        e.preventDefault();
    
        try {
          console.log('form dara ',formData);
          await axios.post('http://localhost:5000/api/DentistForm', {formData,checkboxes});
          alert('Saved Successfully');
        
        } catch (error) {
          alert('Error while logging in', error);
        }
    
       
      };

  return (
    <div>
        <div>
        <Navbar />
        <Sidebar/>
        </div>
        
<div className='whole-container456'>
    <div className='dental33'>
<div className='container331'>
    <h5>Chief Complaint</h5>
    <textarea className='textarea33-large'
    name="chiefComplaint"
    value={formData.chiefComplaint}
onChange={handleInputChange}
    ></textarea>

    <h5 className='dental-heading'>History of Present Illness</h5>
    <h5>Do you suffer from any of the following</h5>

    <table className='dental-table33'>
        <thead>
            <tr className='dental-33tr'>
                <td className='dental-td33'>Tick in appropriate place</td>
                <td className='dental-td33'>Yes</td>
                <td className='dental-td33'>No</td>
                <td className='dental-td33'></td>
                <td className='dental-td33'>Yes</td>
                <td className='dental-td33'>No</td>
            </tr>
        </thead>
<tbody>
    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 1.Diabetes Mellitus</td>
<td className='dental-td33'>
<input
              type='checkbox'
              name='diabetesYes'
              checked={checkboxes.diabetesYes}
              onChange={handleCheckboxChange}
              
            />
          </td>
          <td className='dental-td33'>
          <input
              type='checkbox'
              name='diabetesNo'
              checked={checkboxes.diabetesNo}
              onChange={handleCheckboxChange}
            
            />
          </td>
        

        <td className='dental-td33'> 7.History of Myocardial Infarction</td>
        <td className='dental-td33'>
        <input
              type='checkbox'
              name='historyOfMyocardialInfarctionYes'
              checked={checkboxes.historyOfMyocardialInfarctionYes}
              onChange={handleCheckboxChange}
              className='dental-td33'
            />
             </td>
        <td className='dental-td33'>  <input
              type='checkbox'
              name='historyOfMyocardialInfarctionNo'
              checked={checkboxes.historyOfMyocardialInfarctionNo}
              onChange={handleCheckboxChange}
            /></td>
    </tr>

    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 2.Hypertension</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name='hypertensionYes'
              checked={checkboxes.hypertensionYes}
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name='hypertensionNo'
              checked={checkboxes.hypertensionNo}
              onChange={handleCheckboxChange}
            />
        </td>
        <td className='dental-td33'> 8.Prosthetic Replacements of Heart  tissues</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name='prostheticReplacementsYes'
              checked={checkboxes.prostheticReplacementsYes}
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name='prostheticReplacementsNo'
              checked={checkboxes.prostheticReplacementsNo}
              onChange={handleCheckboxChange}
            />
        </td>
        
    </tr>
    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 3.History of Asthma</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name= 'historyOfAsthmaYes'
              checked={checkboxes.historyOfAsthmaYes}
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'historyOfAsthmaNo'
              checked={checkboxes.historyOfAsthmaNo}
              onChange={handleCheckboxChange}
            />
        </td>
        <td className='dental-td33'> 9.Liver Diseases</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name= 'liverDiseasesYes'
              checked={checkboxes.liverDiseasesYes}
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'liverDiseasesNo'
              checked={checkboxes.liverDiseasesNo}
              onChange={handleCheckboxChange}
            />
        </td>
    </tr>
    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 4.Recent hospitalization</td>

        <td className='dental-td33'> <input
              type='checkbox'
              name=  'recentHospitalizationYes'
              checked={checkboxes.recentHospitalizationYes}
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name=  'recentHospitalizationNo'
              checked={checkboxes.recentHospitalizationNo}
              onChange={handleCheckboxChange}
            />
        </td>
         <td className='dental-td33'> 10.Renal Diseases</td>
         <td className='dental-td33'> <input
              type='checkbox'
              name= 'renalDiseasesYes'
              checked={checkboxes.renalDiseasesYes  }
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'renalDiseasesNo'
              checked={checkboxes.renalDiseasesNo}
              onChange={handleCheckboxChange}
            />
        </td>
    </tr>
    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 5.Bleeding disorders</td>

        <td className='dental-td33'> <input
              type='checkbox'
              name= 'bleedingDisordersYes'
              checked={checkboxes.bleedingDisordersYes  }
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'bleedingDisordersNo' 
              checked={checkboxes.bleedingDisordersNo}
              onChange={handleCheckboxChange}
            />
        </td>
        <td className='dental-td33'> 11.Throid Diseases</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name= 'thyroidDiseasesYes'
              checked={checkboxes.thyroidDiseasesYes  }
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'thyroidDiseasesNo'
              checked={checkboxes.thyroidDiseasesNo}
              onChange={handleCheckboxChange}
            />
        </td>
    </tr>
    <tr className='dental-33tr'>
        
        <td className='dental-td33'> 6.Acidity</td>

        <td className='dental-td33'> <input
              type='checkbox'
              name='acidityYes'
              checked={checkboxes.acidityYes  }
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'acidityNo' 
              checked={checkboxes.acidityNo}
              onChange={handleCheckboxChange}
            />
        </td>
        
        <td className='dental-td33'> 12.Are You under treatments</td>
        <td className='dental-td33'> <input
              type='checkbox'
              name='underTreatmentYes'
              checked={checkboxes.underTreatmentYes  }
              onChange={handleCheckboxChange}
            />
            </td>
        <td className='dental-td33'> 
        <input
              type='checkbox'
              name= 'underTreatmentNo'
              checked={checkboxes.underTreatmentNo}
              onChange={handleCheckboxChange}
            />
        </td>
       
    </tr>

</tbody>

    </table>
<label>Kindly Mention detailes</label>
<textarea 
className='textarea33-large'
name="kindlyMentionDetails"
value={formData.kindlyMentionDetails}
onChange={handleInputChange}
></textarea>
</div>
<div className='container233'>
    
<div className='allergy-alert33' >
   <h5 className='heading33'>Allergy Alert</h5> 
   <tr className='input331'>
    <td className='dental-td33'>Drugs</td>
    <td className='dental-td33'><input type='text'
     className='input331'
     name="drugsAllergy"
     value={formData.drugsAllergy}
onChange={handleInputChange}
     >
        </input></td>
    </tr>
    <tr className='input331'>
    <td className='dental-td33'>Latex</td>
    <td className='dental-td33'><input type='text' 
    className='input331'
    name="latexAllergy"
     value={formData.latexAllergy}
onChange={handleInputChange}
    ></input></td>
    </tr>
    <tr>
    <td className='dental-td33'>Any Other Material</td>
    <td className='dental-td33'><input type='text'
     name="otherMaterialAllergy"
     value={formData.otherMaterialAllergy}
onChange={handleInputChange}
    ></input></td>
    </tr>

</div>

<div className='for-women33'>
   <h5 className='heading33'>For Women</h5> 
   <tr>
    <td className='dental-td33'>Are you pregnant</td>
    <td className='dental-td33'><input type='text'
     className='input331'
     name="pregnant"
     value={formData.pregnant}
onChange={handleInputChange}
    ></input></td>
    </tr>
    <tr>
    <td className='dental-td33'>Are you  breast feeding your child</td>
    <td className='dental-td33'><input type='text'
    className='input331'
    name="breastFeeding"
    value={formData.breastFeeding}
onChange={handleInputChange}
    ></input></td>
    </tr>

    <tr>
    <td className='dental-td33'>Are you one any hormonal therapy</td>
    <td className='dental-td33'><input type='text'
    className='input331'
    name="hormonalTherapy"
    value={formData.hormonalTherapy}
onChange={handleInputChange}
    ></input></td>
    </tr>
    <tr>
    <td className='dental-td33'>Are you using birth control fills</td>
    <td className='dental-td33'><input type='text'
    name="birthControlPills"
    value={formData.birthControlPills}
onChange={handleInputChange}
    ></input></td>
    </tr>
</div>

<div className='habit-history33'>
   <h5 className='heading33'>Habit History</h5> 
   <tr>
    <td className='dental-td33'>Do you use Tobaco</td>
    <td className='dental-td33' ><input type='text'
    
    name="tobaccoUse"
    value={formData.tobaccoUse}
onChange={handleInputChange}

    ></input></td></tr>
   <tr> 
    <td className='dental-td33'>Form of tobaco ?</td>
    <td className='dental-td33'><input type='text'
     name="tobaccoForm"
     value={formData.tobaccoForm}
 onChange={handleInputChange}
    ></input></td>
   </tr>

   <tr>
    <td className='dental-td33'>Duration</td>
    <td className='dental-td33'><input type='text'
    name="tobaccoDuration"
    value={formData.tobaccoDuration}
onChange={handleInputChange}
    ></input></td>
    <td className='dental-td33'>Frequency</td>
    <td className='dental-td33'><input type='text'
     name="tobaccoFrequency"
     value={formData.tobaccoFrequency}
 onChange={handleInputChange}
    ></input></td>
   </tr>

   <tr>
    <td className='dental-td33'>Do you Consume alcohol</td>
    <td className='dental-td33'><input type='text'
     name="alcoholConsume"
     value={formData.alcoholConsume}
 onChange={handleInputChange}
    ></input></td>
   </tr>

   <tr>
    <td className='dental-td33'>Duration</td>
    <td className='dental-td33'><input type='text'
     
     name="alcoholDuration"
     value={formData.alcoholDuration}
 onChange={handleInputChange}
     ></input></td>
    <td className='dental-td33'>Frequency</td>
    <td className='dental-td33'><input type='text'
     name="alcoholFrequency"
     value={formData.alcoholFrequency}
 onChange={handleInputChange}
    ></input></td>
     </tr>
     <tr>
    <td className='dental-td33'>Any other addiction</td>
    <td className='dental-td33'><input type='text'
     name="otherAddiction"
     value={formData.otherAddiction}
 onChange={handleInputChange}
    ></input></td>
   </tr>


</div>

<div className='for-childern33'>
   <h5 className='heading33'>For Children</h5> 
   <tr>
    <td className='dental-td33'>Thumb Sucking</td>
    <td className='dental-td33'><input type='text' 
    
    name="thumbSucking"
    value={formData.thumbSucking}
onChange={handleInputChange}
    ></input></td>
    <td className='dental-td33'>Nail Biting</td>
    <td className='dental-td33'><input type='text'
     name="nailBiting"
     value={formData.nailBiting}
 onChange={handleInputChange}
    ></input></td>
   </tr>

   <tr>
    <td className='dental-td33'>Any Other</td>
    <td className='dental-td33'><input type='text'
     name="otherHabit"
     value={formData.otherHabit}
 onChange={handleInputChange}
    ></input></td>
    
   </tr>

   


</div>

</div>

</div>

<div className='vitals-container33 '>

<div>
   <tr>
    <td className='dental-td33'>Extra Oral Examination :</td>
    <td className='dental-td33'> <input type='text' 
    className='input331'
    name="extraOralExamination"
    value={formData.extraOralExamination}
onChange={handleInputChange}
    ></input></td>
    </tr> 
    <tr>
    <td className='dental-td33'>Lymph Nodes :</td>
    <td className='dental-td33'> <textarea 
    className='textarea33'
    name="lymphNodes"
    value={formData.lymphNodes}
onChange={handleInputChange}
    ></textarea></td>
    </tr> 

    <tr>
    <td className='dental-td33'>TMJ :</td>
    <td className='dental-td33'> <input type='text' 
    className='input331'
    name="tmj"
    value={formData.tmj}
onChange={handleInputChange}
    ></input></td>
    </tr> 
</div>


<div className='vitals-13'>
    <h6>VITAL SIGNS</h6>
   <tr >
    <td className='dental-td33'>Pallor :</td>
    <td className='dental-td33' > <input type='text' className='vinput33'></input></td>
    <td className='dental-td33'>Cyanosis : </td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    </tr> 
    <tr>
    <td className='dental-td33'>Edema :</td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    <td className='dental-td33'>Temperature :</td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    </tr> 

    <tr>
    <td className='dental-td33'>Icterus :</td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    <td className='dental-td33'>BP :</td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    </tr> 


    <tr>
    <td className='dental-td33'>Blood Glucose Level :</td>
    <td className='dental-td33'> <input type='text' className='vinput33'></input></td>
    </tr>
</div>

<div >
<tr>
    <td className='dental-td33'>Intra-Oral Examination</td>
    <td className='dental-td33'> <input type='text'
    className='input331'
    name="intraOralExamination"
    value={formData.intraOralExamination}
onChange={handleInputChange}
    ></input></td>
    </tr>

    <tr>
    <td className='dental-td33'>Teeth Present</td>
    <td className='dental-td33'> <input type='text'
     name="teethPresent1"
     value={formData.teethPresent1}
 onChange={handleInputChange}
    ></input></td>
    <td className='dental-td33'> <input type='text'
     name="teethPresent2"
     value={formData.teethPresent2}
 onChange={handleInputChange}
    ></input></td>
    </tr>

    <tr>
    <td className='dental-td33'></td>
    <td className='dental-td33'> <input type='text'
     name="teethPresent3"
     value={formData.teethPresent3}
 onChange={handleInputChange}
     ></input></td>
    <td className='dental-td33'> <input type='text' 
    className='input331'
    name="teethPresent4"
    value={formData.teethPresent4}
onChange={handleInputChange}
    ></input></td>
    </tr>

    <tr>
    <td className='dental-td33'>Occlusion</td>
    <td className='dental-td33'> <input type='text'
    name="occlusion"
    value={formData.occlusion}
onChange={handleInputChange}
    
    
    ></input></td>
    <td className='dental-td33'>Mobility</td>
    <td className='dental-td33'> <input type='text'
    name="mobility"
    value={formData.mobility}
onChange={handleInputChange}
    ></input></td>
    </tr>



</div>


</div>



<div className='container334'>
    <div>
        <div className='div33'>
       <label>Dental Caries</label><textarea className='textarea33'></textarea>
       </div>
            <tr>
            <td className='dental-td33'>Pulp and Periapical Infection :</td>
            <td className='dental-td33'><input type='text' 
            className='input331'
            name="pulpInfection"
    value={formData.pulpInfection}
onChange={handleInputChange}
            ></input></td>
            </tr>
            <tr>
            <td className='dental-td33'>Periodontal Pockets :</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="periodontalPockets"
    value={formData.periodontalPockets}
onChange={handleInputChange}
            ></input></td>
            </tr>
            <tr>
            <td className='dental-td33'>Washing Disease :</td>
            <td className='dental-td33'><textarea className='textarea33'
            name="washingDisease"
            value={formData.washingDisease}
        onChange={handleInputChange}
            ></textarea></td>
            </tr>
            <tr>
            <td className='dental-td33'>Calculus :</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="calculus"
    value={formData.calculus}
onChange={handleInputChange}
            ></input></td>
           

            </tr>
            <tr>
            <td className='dental-td33'>Stains :</td>
            <td className='dental-td33'><input type='text'
             className='input331'
             name="stains"
    value={formData.stains}
onChange={handleInputChange}
             ></input></td>
            </tr>

    </div>
    <div>
    <div className='div33'>
            <label>Introoral Soft tissues :</label>
            <textarea className='textarea33'
            name="introoralSoftTissues"
            value={formData.introoralSoftTissues}
        onChange={handleInputChange}
            ></textarea>
            </div>
            
<tr>
            <td className='dental-td33'>Buccal Mucosa :</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="buccalMucosa"
    value={formData.buccalMucosa}
onChange={handleInputChange}
            ></input></td>
            <td className='dental-td33'>Floor of the mouth</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="floorOfMouth"
    value={formData.floorOfMouth}
onChange={handleInputChange}
            ></input></td>
</tr>
<tr>
            <td className='dental-td33'>Tongue :</td>
            <td className='dental-td33'><input type='text'
             className='input331'
             name="tongue"
    value={formData.tongue}
onChange={handleInputChange}
             ></input></td>
            <td className='dental-td33'>Gingiva</td>
            <td className='dental-td33'><input type='text' 
            className='input331'
            name="gingiva"
    value={formData.gingiva}
onChange={handleInputChange}
            ></input></td>
</tr>
<tr>
            <td className='dental-td33'>Hard Plate :</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="hardPlate"
    value={formData.hardPlate}
onChange={handleInputChange}
            ></input></td>
            <td className='dental-td33'>Alveolar Mucosa</td>
            <td className='dental-td33'><input type='text'
            name="alveolarMucosa"
            value={formData.alveolarMucosa}
        onChange={handleInputChange}
            ></input></td>
</tr>
<tr>
            <td className='dental-td33'>Vestibute :</td>
            <td className='dental-td33'><input type='text'
            className='input331'
            name="vestibute"
    value={formData.vestibute}
onChange={handleInputChange}
            ></input></td>
            
</tr>

</div>

</div>


<div className='container335'>
<div>
<tr>
            <td className='dental-td33'>Provisional Diagnosis :</td>
            <td className='dental-td33'><textarea className='textarea33'
            name="provisionalDiagnosis"
            value={formData.provisionalDiagnosis}
        onChange={handleInputChange}
            ></textarea></td>
           
</tr>

<tr>
            <td className='dental-td33'>Final Diagnosis :</td>
            <td className='dental-td33'><textarea className='textarea33'
            name="finalDiagnosis"
            value={formData.finalDiagnosis}
        onChange={handleInputChange}

            ></textarea></td>
            
</tr>


<tr>
            <td className='dental-td33'>Treatment Plan :</td>
            <td className='dental-td33'><textarea className='textarea33'
            name="treatmentPlan"
            value={formData.treatmentPlan}
        onChange={handleInputChange}
            ></textarea></td>
           
</tr>
</div>

<div>

<tr>
    <td className='dental-td33'>Investigations</td>
    <td className='dental-td33'><textarea className='textarea33'
    name="investigations"
    value={formData.investigations}
onChange={handleInputChange}
    ></textarea></td>
</tr>
</div>



</div>
<div className='btndiv33'>
<button onClick={handleSave} className='savebtn33'>Save</button>
  <Link to='/dentalform2'><button  className='nxtbtn33'>Next</button></Link>
</div>
    </div>
    </div>
    
  )
}

export default DentalForm1