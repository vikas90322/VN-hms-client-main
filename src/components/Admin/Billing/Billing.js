import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Billing.css";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import FrontDesk from "./FrontDesk";
import { Link } from "react-router-dom";

function Billing() {
  const [billingData, setBillingData] = useState([]);
  const [totalServiceNameCount, setTotalServiceNameCount] = useState(null);
  const [pharmacyTotalBills, setPharmacyTotalBills] = useState(0);
  const [pharmacyTotalAmount, setPharmacyTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch total service name count from the backend
    axios
      .get("http://localhost:5000/api/get-countservice")
      .then((response) => {
        setTotalServiceNameCount(response.data.totalServiceNameCount);
      })
      .catch((error) => {
        console.error("Error fetching total service name count:", error);
      });
  }, []);

  const [totalTotalBalanceAmount, setTotalTotalBalanceAmount] = useState(null);

  useEffect(() => {
    // Fetch total balance amount from the backend
    axios
      .get("http://localhost:5000/api/get-totalbalanceamount")
      .then((response) => {
        setTotalTotalBalanceAmount(response.data.totalTotalBalanceAmount);
      })
      .catch((error) => {
        console.error("Error fetching total balance amount:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch billing data from the backend
    axios
      .get("http://localhost:5000/api/v1/combined-data")
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the backend API for Pharmacy billing
    axios
      .get("http://localhost:5000/api/pharmacy-billing")
      .then((response) => {
        // Calculate the total number of bills and the total amount
        const totalBills = response.data.length;
        const totalAmount = response.data.reduce(
          (acc, item) => acc + item.paidAmount,
          0
        );

        setPharmacyTotalBills(totalBills);
        setPharmacyTotalAmount(totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching pharmacy data:", error);
      });
  }, []);

  // Get today's date in the format YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  // Calculate the totalAmount based on billingData
  const totalAmount = billingData.reduce((acc, item) => {
    return acc + item.totalAmount;
  }, 0);

  // Format the totalAmount to display only two digits after the decimal point
  const formattedTotalAmount = totalAmount.toFixed(2);

  // Filter billingData to include only records with today's date
  const filteredBillingData = billingData.filter(
    (item) => item.date === todayDate
  );

  // Calculate the totalAmount for today's records
  const totalAmountForToday = filteredBillingData.reduce((acc, item) => {
    return acc + item.totalAmount;
  }, 0);

  // Format the totalAmount to display only two digits after the decimal point
  const formattedTotalAmountForToday = totalAmountForToday.toFixed(2);

  // Count the number of records for today
  const numberOfRecordsForToday = filteredBillingData.length;

  return (
    <div>
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="billing-column899">
        <div className="main-div">
          <Link to="/FrontDesk" className="card-link-dec899">
            <div class="card-billing89">
              <h2 className="pb-3">Front Desk</h2>
              <p>Total No.of Appointments : {billingData.length}</p>
              <p>Amount :{formattedTotalAmount}</p>
              {/* <p>Amount :{formattedTotalAmountForToday}</p>    */}
            </div>
          </Link>

          <Link to="/Pharmacy" className="card-link-dec899">
            <div className="card-billing89">
              <h2 className="pb-3">Pharmacy</h2>
              <p>Total No.of Bills: {pharmacyTotalBills}</p>
              <p>Amount: Rs.{pharmacyTotalAmount}</p>
            </div>
          </Link>

          <Link to="/LabTest" className="card-link-dec899">
            <div className="card-billing89">
              <h2 className="pb-3 ">Laboratory</h2>

              {totalServiceNameCount !== null &&
              totalTotalBalanceAmount !== null ? ( // Conditional rendering check
                <>
                  <p>Total No. of Tests: {totalServiceNameCount}</p>
                  <p>Amount : Rs.{totalTotalBalanceAmount}</p>
                </>
              ) : (
                <p>Loading total service count...</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Billing;
