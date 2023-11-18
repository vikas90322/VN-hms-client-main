import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./Auth/PrivateRoute";

import LandingPage from "./components/Admin/AddDoctor/LandingPage";
import Billing from "./components/Admin/Billing/Billing";
import FrontDesk from "./components/Admin/Billing/FrontDesk";
import LabTest from "./components/Admin/Billing/LabTest";
import Pharmacy from "./components/Admin/Billing/Pharmacy";
import FrontPage from "./components/Admin/Dashboard/FrontPage";
import Login from "./components/Admin/Login";
import PatientDetails from "./components/Admin/patientsdetails/PatientDetails";
import AddStaff from "./components/Admin/staff/AddStaff";
import StaffDetails from "./components/Admin/staff/StaffDetails";

import DoctorListPage from "./components/Admin/AddDoctor/DoctorListPage";
import DoctorRegistrationPage from "./components/Admin/AddDoctor/DoctorRegistrationPage";
import LabReports from "./components/Admin/Report/report";


// Front Desk

import Addpatient from "./components/FrontDesk/Addpatient";
import Appointment from "./components/FrontDesk/Appointment";
import AppointmentSidebar from "./components/FrontDesk/AppointmentSidebar";
import AppointmentToday from "./components/FrontDesk/AppointmentToday";
import Attachment from "./components/FrontDesk/Attachment";
import BillForm from "./components/FrontDesk/BillForm";
import Bills from "./components/FrontDesk/Bills";
import ExistingPatient from "./components/FrontDesk/Existingpatient";
import Homepage from "./components/FrontDesk/Homepage";
import NavBarFront from "./components/FrontDesk/Navbar23";
import PaidPatient from "./components/FrontDesk/PaidPatient";
import Patient from "./components/FrontDesk/Patient";
import PatientEdit from "./components/FrontDesk/PatientEdit";
import PatientNav from "./components/FrontDesk/PatientNav";
import PatientVisit from "./components/FrontDesk/PatientVisit";
import TestResults from "./components/FrontDesk/TestResults";
import Vitals from "./components/FrontDesk/Vitals";
import { default as Prescription, default as PrescriptionDesk } from "./components/FrontDesk/prescription";
import StockistInvoice from "./components/Pharmacy/StockistInvoice";
// Lab
import AddBillLab from "./components/lab/AddBillLab";
import Appnt from "./components/lab/Appnt";
import AppntToday from "./components/lab/AppntToday";
import BillingForm from "./components/lab/BillingForm";
import FindReports from "./components/lab/FindReports";
import LabEdit from "./components/lab/LabEdit";
import LabNavbar from "./components/lab/LabNavbar";
import LabServiceTable from "./components/lab/LabServiceTable";
import LabTable from "./components/lab/LabTable";
import PaidTable from "./components/lab/PaidTable";
import PopupNavbar from "./components/lab/PapupNavbar";
import TestsTable from "./components/lab/TestsTable";
import VisitsTable from "./components/lab/VisitTable";
// Pharmacy
import BillingDashboard from "./components/Pharmacy/BillingDashboard";
import Billingreports from "./components/Pharmacy/Billingreports";
import CreateOrder from "./components/Pharmacy/CreateOrder";
import Inventory from "./components/Pharmacy/Inventory";
import InvoiceStock from "./components/Pharmacy/InvoiceStock";
import ListMedicines from "./components/Pharmacy/MedicineList";
import OrderList from "./components/Pharmacy/OrderList";
import PatientBill from "./components/Pharmacy/PatientBill";
import PharmacyHome from "./components/Pharmacy/PharmacyHome";
import PharmacyNav from "./components/Pharmacy/PharmacyNav";
import Pharmacystock from "./components/Pharmacy/Pharmacystock";
import Stockadjustment from "./components/Pharmacy/Stockadjustment";
import Stockists from "./components/Pharmacy/Stockists";

import Dbdetails from "./components/Pharmacy/Dbdetails";


// Doctor
import TestDetailReports from "./components/Admin/Report/TestDetailReports";
import AllAppointments from "./components/Doctors/appointments/AllAppointments";
import Appointments from "./components/Doctors/appointments/Appointments";
import CreateAppointment from "./components/Doctors/appointments/addappointments";
import DentalForm from "./components/Doctors/cases/dental/dentalform";
import DentalForm1 from "./components/Doctors/cases/dental/dentalform1";
import DentalForm2 from "./components/Doctors/cases/dental/dentalform2";
import Diabetic from "./components/Doctors/cases/diabetic";
import General from "./components/Doctors/cases/general";
import Gynic from "./components/Doctors/cases/gynic";
import TrimesterNames from "./components/Doctors/cases/gynic1";
import Consultations from "./components/Doctors/consultation/consultation";
import DropdownComponent from "./components/Doctors/forms/forms";
import Mc from "./components/Doctors/forms/mc";
import Navbar from "./components/Doctors/navbar/navbar";
import Medicine from "./components/Doctors/prescription/medicine";
import PrescriptionDoctor from "./components/Doctors/prescription/prescription";
import PreviousData from "./components/Doctors/previousdata/previousdata";
import Previousdata1 from "./components/Doctors/previousdata/previousdata1";
import TestDetailsDoc from "./components/Doctors/tests/DoctorTest";
import Tests from "./components/Doctors/tests/tests";
import FileUpload from "./components/Doctors/uploadfiles/uploadfiles";
import TestDetails from "./components/lab/TestDetails";
//import Attach from "./components/Doctors/prescription/Attach";

// 404 Not Found Page
import PageNotFound from "./components/NotFound/PageNotFound.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />


          {/* Front De */}
          <Route element={<PrivateRoute />}>
          <Route path='/Frontpage' element={<FrontPage />} />
          <Route path='/Pharmacy' element={<Pharmacy />} />
          <Route path='/FrontDesk' element={<FrontDesk />} />
          <Route path='/staff' element={<AddStaff />} />
          <Route path='/reports' element={<LabReports />} />
          <Route path='/TestDetailReports' element={<TestDetailReports/>}/>
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Bills" element={<Bills />} />
          <Route path="/BillForm" element={<BillForm />} />
          <Route path="/PatientEdit" element={<PatientEdit />} />
          <Route path="/AppointmentSidebar" element={<AppointmentSidebar />} />
          <Route path="/AppointmentToday" element={<AppointmentToday />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/PaidPatient" element={<PaidPatient />} />
          <Route path="/PatientVisit" element={<PatientVisit />} />
          <Route path="/Patient/:id/PatientNav" element={<PatientNav />} />
          <Route path="/Addpatient" element={<Addpatient />} />
          <Route path="/Patient/:id/Vitals" element={<Vitals />} />
          <Route path="/Patient/:id/TestResults" element={<TestResults />} />
          <Route path="/Patient/:id/Attachment" element={<Attachment />} />
          <Route path="/StockistInvoice" element={<StockistInvoice />} />
          <Route path="/Patient/:id/PrescriptionData" element={<Prescription />} />
          {/* Lab */}
          <Route path="/labservicetable" element={<LabServiceTable />} />
          <Route path="/TestsTable" element={<TestsTable />} />
          <Route path="/TestDetails" element={<TestDetails/>} />
          <Route path="/LabTable" element={<LabTable />} />
          <Route path="/VisitsTable" element={<VisitsTable />} />
          <Route path="/Billingforms" element={<BillingForm />} />
          <Route path="/PopupNavbar" element={<PopupNavbar />} />
          <Route path="/Appnt" element={<Appnt />} />
          <Route path="/PaidTable" element={<PaidTable />} />
          <Route path="/LabEdit" element={<LabEdit />} />
          <Route path="/AddBillLab" element={<AddBillLab />} />
          <Route path="/FindReports" element={<FindReports />} />
          <Route path="/AppntToday" element={<AppntToday />} />
          <Route path="/" element={<LabNavbar />} />
          {/* Pharmacy */}
          <Route path="/PharmacyHome" element={<PharmacyHome />} />
          <Route path="/PharmacyNav" element={<PharmacyNav />} />
          <Route path="/InvoiceStock" element={<InvoiceStock />} />
          <Route path="/MedicineList" element={<ListMedicines />} />
          <Route path="/BillingDashboard" element={<BillingDashboard />} />
          <Route path="/Stockadjustment" element={<Stockadjustment />} />
          <Route path="/Stockists" element={<Stockists />} />
          <Route path="/Billingreports" element={<Billingreports />} />
          <Route path="/Pharmacystock" element={<Pharmacystock />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/PatientBill" element={<PatientBill />} />
          <Route path="/Dbdetails" element={<Dbdetails />} />
          {/* Doctor */}
          <Route exact path="/vitals" element={<Vitals />} />
          <Route exact path="/forms" element={<DropdownComponent />} />
          <Route exact path="/attach" element={<FileUpload />} />
          <Route exact path="/case" element={<General />} />
          <Route exact path="/mc" element={<Mc />} />
          <Route exact path="/diabetic" element={<Diabetic />} />
          <Route exact path="/medicine" element={<Medicine />} />
          <Route exact path="/appointments" element={<Appointments />} />
          <Route exact path="/allappointments" element={<AllAppointments />} />
          <Route exact path="/addAppointments" element={<CreateAppointment />} />
          <Route exact path="/previousdata" element={<PreviousData />} />
          <Route exact path="/prescription" element={<PrescriptionDoctor />} />
          <Route exact path="/previousdata1" element={<Previousdata1 />} />
          <Route exact path="/docnav" element={<Navbar />} />
          <Route exact path="/tests" element={<Tests />} />
          <Route exact path="/doctests" element={<TestDetailsDoc/>} />
          <Route exact path="/consultations" element={<Consultations />} />
          <Route exact path="/dental" element={<DentalForm />} />
          <Route exact path="/dentalform1" element={<DentalForm1 />} />
          <Route exact path="/dentalform2" element={<DentalForm2 />} />
          <Route exact path="/gynic" element={<Gynic />} />
          <Route exact path="/gynic1" element={<TrimesterNames />} />
          {/* <Route exact path="/Attach" element={<Attach />} /> */}
          {/* FrountDesk */}
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Bills" element={<Bills />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/PatientNav" element={<PatientNav />} />
          {/* <Route path="/PatientDashboard" element={<PatientDashboard />} /> */}
          <Route path="/Addpatient" element={<Addpatient />} />
          <Route path="/Existingpatient" element={<ExistingPatient />} />
          <Route path="/Vitals" element={<Vitals />} />
          <Route path="/TestResults" element={<TestResults />} />
          <Route path="/Attachment" element={<Attachment />} />
          <Route path="/NavBarFront" element={<NavBarFront />} />
          <Route path="/PrescriptionDesk" element={<PrescriptionDesk />} />
          {/* Protected Routes with Auth */}

          
            <Route path="/Frontpage" element={<FrontPage />} />
            <Route path="/Billing" element={<Billing />} />
            <Route path="/Doctor" element={<LandingPage />} />
            <Route path="/LabTest" element={<LabTest />} />
            <Route path="/PatientDetails" element={<PatientDetails />} />
            <Route path="/doctor-list" element={<DoctorListPage />} />
            <Route
              path="/doctor-registration"
              element={<DoctorRegistrationPage />}
            />
            <Route path="/Addstaff" element={<StaffDetails />} />

            {/* Front De */}
            <Route path="/Frontpage" element={<FrontPage />} />
            <Route path="/Pharmacy" element={<Pharmacy />} />
            <Route path="/FrontDesk" element={<FrontDesk />} />
            <Route path="/staff" element={<AddStaff />} />
            <Route path="/reports" element={<LabReports />} />
            <Route path="/TestDetailReports" element={<TestDetailReports />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Bills" element={<Bills />} />
            <Route path="/BillForm" element={<BillForm />} />
            <Route path="/PatientEdit" element={<PatientEdit />} />
            <Route
              path="/AppointmentSidebar"
              element={<AppointmentSidebar />}
            />
            <Route path="/AppointmentToday" element={<AppointmentToday />} />
            <Route path="/Patient" element={<Patient />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/PaidPatient" element={<PaidPatient />} />
            <Route path="/PatientVisit" element={<PatientVisit />} />
            <Route path="/Patient/:id/PatientNav" element={<PatientNav />} />
            <Route path="/Addpatient" element={<Addpatient />} />
            <Route path="/Patient/:id/Vitals" element={<Vitals />} />
            <Route path="/Patient/:id/TestResults" element={<TestResults />} />
            <Route path="/Patient/:id/Attachment" element={<Attachment />} />
            <Route path="/StockistInvoice" element={<StockistInvoice />} />
            <Route
              path="/Patient/:id/PrescriptionData"
              element={<Prescription />}
            />
            {/* Lab  */}
            <Route path="/labservicetable" element={<LabServiceTable />} />
            <Route path="/TestsTable" element={<TestsTable />} />
            <Route path="/TestDetails" element={<TestDetails />} />
            <Route path="/LabTable" element={<LabTable />} />
            <Route path="/VisitsTable" element={<VisitsTable />} />
            <Route path="/Billingforms" element={<BillingForm />} />
            <Route path="/PopupNavbar" element={<PopupNavbar />} />
            <Route path="/Appnt" element={<Appnt />} />
            <Route path="/PaidTable" element={<PaidTable />} />
            <Route path="/LabEdit" element={<LabEdit />} />
            <Route path="/AddBillLab" element={<AddBillLab />} />
            <Route path="/FindReports" element={<FindReports />} />
            <Route path="/AppntToday" element={<AppntToday />} />
            <Route path="/" element={<LabNavbar />} />
            {/* Pharmacy */}
            <Route path="/PharmacyHome" element={<PharmacyHome />} />
            <Route path="/PharmacyNav" element={<PharmacyNav />} />
            <Route path="/InvoiceStock" element={<InvoiceStock />} />
            <Route path="/MedicineList" element={<ListMedicines />} />
            <Route path="/BillingDashboard" element={<BillingDashboard />} />
            <Route path="/Stockadjustment" element={<Stockadjustment />} />
            <Route path="/Stockists" element={<Stockists />} />
            <Route path="/Billingreports" element={<Billingreports />} />
            <Route path="/Pharmacystock" element={<Pharmacystock />} />
            <Route path="/CreateOrder" element={<CreateOrder />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/OrderList" element={<OrderList />} />
            <Route path="/PatientBill" element={<PatientBill />} />
            {/* Doctor */}
            <Route exact path="/vitals" element={<Vitals />} />
            <Route exact path="/forms" element={<DropdownComponent />} />
            <Route exact path="/attach" element={<FileUpload />} />
            <Route exact path="/case" element={<General />} />
            <Route exact path="/mc" element={<Mc />} />
            <Route exact path="/diabetic" element={<Diabetic />} />
            <Route exact path="/medicine" element={<Medicine />} />
            <Route exact path="/appointments" element={<Appointments />} />
            <Route
              exact
              path="/allappointments"
              element={<AllAppointments />}
            />
            <Route
              exact
              path="/addAppointments"
              element={<CreateAppointment />}
            />
            <Route exact path="/previousdata" element={<PreviousData />} />
            <Route
              exact
              path="/prescription"
              element={<PrescriptionDoctor />}
            />
            <Route exact path="/previousdata1" element={<Previousdata1 />} />
            <Route exact path="/docnav" element={<Navbar />} />
            <Route exact path="/tests" element={<Tests />} />
            <Route exact path="/doctests" element={<TestDetailsDoc />} />
            <Route exact path="/consultations" element={<Consultations />} />
            <Route exact path="/dental" element={<DentalForm />} />
            <Route exact path="/dentalform1" element={<DentalForm1 />} />
            <Route exact path="/dentalform2" element={<DentalForm2 />} />
            <Route exact path="/gynic" element={<Gynic />} />
            <Route exact path="/gynic1" element={<TrimesterNames />} />
            {/* <Route exact path="/Attach" element={<Attach />} /> */}
            {/* FrountDesk */}
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Bills" element={<Bills />} />
            <Route path="/Patient" element={<Patient />} />
            <Route path="/PatientNav" element={<PatientNav />} />
            {/* <Route path="/PatientDashboard" element={<PatientDashboard />} /> */}
            <Route path="/Addpatient" element={<Addpatient />} />
            <Route path="/Existingpatient" element={<ExistingPatient />} />
            <Route path="/Vitals" element={<Vitals />} />
            <Route path="/TestResults" element={<TestResults />} />
            <Route path="/Attachment" element={<Attachment />} />
            <Route path="/NavBarFront" element={<NavBarFront />} />
            <Route path="/PrescriptionDesk" element={<PrescriptionDesk />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
