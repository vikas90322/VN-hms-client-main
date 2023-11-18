/* eslint-disable no-whitespace-before-property */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import "./InvoiceStock.css";
import axios from "axios";
import Select from "react-select"; 
import PharmacyNav from "./PharmacyNav";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const InvoiceStock = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tableData, setTableData] = useState([]);
const [stockName, /* setStockName */] = useState("");
  const [date, setDate] = useState("");
  const [Medicine, setMedicine] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [Category, setCategory] = useState("");
  const [Batch, setBatch] = useState("");
  const [BatchExpiry, setBatchExpiry] = useState("");
  const [Unit, setUnit] = useState("");
  const [strips, setstrips] = useState("");
  const [Freestrips, setFreestrips] = useState("");
  const [ Gst , setGst] = useState("");
  const [ /*CGst */, setCGst] = useState("");
  const [/*SGst */, setSGst] = useState("");
  const [price, setPrice] = useState("");
  const [MRP, setMRP] = useState("");
  const [Discount, setDiscount] = useState("");
  const [Total, setTotal] = useState("");
  const [HSNcode, setHSNcode] = useState("");
  const [RackNo, setRackNo] = useState("");
  const [BookNo, setBookNo] = useState("");
  const [NetPrice, setNetPrice] = useState("");
  const [stockistOptions, setStockistOptions] = useState([]);
  const [isGSTSet, setIsGSTSet] = useState(false); // Track whether GST has been set for the current invoice
  const [totalGST, setTotalGST] = useState(0); // Store the total GST for the current invoice
  // const [GST, setGST] = useState(0);
  // const [CGST, setCGST] = useState(0);
  // const [SGST, setSGST] = useState(0);
  // const [GrossAmount, setGrossAmount] = useState(0);
  // const [RoundOff, setRoundOff] = useState(0);
  // const [StocksReturned, setStocksReturned] = useState(0);
  // const [PurchaseAmount, setPurchaseAmount] = useState(0);
  const [/*totalAmountBeforeTax */, setTotalAmountBeforeTax] = useState(0);
  const [/*totalDiscountAmount */, setTotalDiscountAmount] = useState(0);
  // const [/*totalDiscountPercentage */, setTotalDiscountPercentage] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [stockistValue, setStockistValue] = useState("");
// const  [ invoiceData , setInvoiceData ] = useState({
//     invoiceNumber: "",
//     stockName: "",
//     date: "",
//     medicines: [],
//     Manufacturer: "",
//     Category: "",
//     Total: "0",
//     Discount: "0",
//     GST: "0",
//     CGST: "0",
//     SGST: "0",
//     GrossAmount: "0",
//     RoundOff: "0",
//     StocksReturned: "0",
//     PurchaseAmount: "0",
//   });

  const handleGSTChange = (e) => {
    const newGST = parseFloat(e.target.value);

    // Calculate CGST and SGST based on GST value
    const newCGST = newGST / 2;
    const newSGST = newGST / 2;

    // Store the total GST value for this invoice
    setTotalGST(newGST);
    setIsGSTSet(true); // Flag that GST has been set for this invoice

    // Update state with new values
    setGst(newGST);
    setCGst(newCGST);
    setSGst(newSGST);
  };

  const calculateNetPrice = () => {
    // Calculate Net Price based on the formula
    const unitPerStrip = parseFloat(Unit);
    const noOfStrips = parseFloat(strips);
    const gstPercentage = parseFloat(Gst);
    const pricePerStrip = parseFloat(price);
    const discountPercentage = parseFloat(Discount) || 0; // Get the discount percentage

    if (
      !isNaN(unitPerStrip) &&
      !isNaN(noOfStrips) &&
      !isNaN(gstPercentage) &&
      !isNaN(pricePerStrip)
    ) {
      const totalPriceBeforeDiscount =
        unitPerStrip * noOfStrips +
        unitPerStrip * noOfStrips * (gstPercentage / 100) +
        unitPerStrip * Freestrips;

      // Calculate the discount amount
      const discountAmount =
        (totalPriceBeforeDiscount * discountPercentage) / 100;

      // Calculate Net Price by deducting the discount amount
      const netPrice = totalPriceBeforeDiscount - discountAmount;

      setNetPrice(netPrice.toFixed(2)); // Round to 2 decimal places and set in state

      // Calculate the quantity
      const quantity = unitPerStrip * noOfStrips + parseFloat(Freestrips);
      setQuantity(quantity);
    }
  };

  useEffect(() => {
    // Calculate Net Price whenever any of the dependent values change
    calculateNetPrice();
    calculateTotalPriceBeforeTax();
  }, [Unit, strips, Gst, price, Freestrips, Discount]);

  const calculateInTax = (rowData) => {
    // Get the necessary values from the rowData
    const netPrice = parseFloat(rowData.NetPrice);
    const gstPercentage = parseFloat(rowData.Gst);

    if (!isNaN(netPrice) && !isNaN(gstPercentage)) {
      // Calculate In Tax(Rs) based on the formula
      const inTaxRs = (netPrice * gstPercentage) / 100;
      return inTaxRs.toFixed(2); // Round to 2 decimal places
    }

    return "0.00"; // Default value if values are invalid
  };

  useEffect(() => {
    // Fetch stockist options from the backend
    const fetchStockistOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stockists");
        const stockistData = response.data;
        const options = stockistData.map((stockist) => ({
          value: stockist.name,
          label: stockist.name,
        }));
        setStockistOptions(options);
      } catch (error) {
        console.error("Error fetching stockist options:", error);
      }
    };

    fetchStockistOptions();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100px", // Adjust the width as needed
    }),
  };

  const handleActionButton = (action) => {
    if (action === "add") {
      // Create a new medicine object with the current state values
      const newMedicine = {
        MedId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        Medicine,
        Manufacturer,
        Category,
        Batch,
        BatchExpiry,
        Unit,
        strips,
        Freestrips,
        Gst,
        price,
        MRP,
        Discount,
        Total,
        HSNcode,
        RackNo,
        BookNo,
        NetPrice,
        Quantity,
      };

      // Add the new medicine object to the tableData state
      setTableData((prevTableData) => [...prevTableData, newMedicine]);

      // Clear the input fields by resetting the state
      clearInputFields();

      // Calculate the total discount amount for the entire table
      const totalDiscountAmount = tableData.reduce(
        (acc, medicine) => acc + (parseFloat(medicine.Discount) || 0),
        parseFloat(newMedicine.Discount) || 0
      );

      // Update the state with the new total discount amount
      setTotalDiscountAmount(totalDiscountAmount);

      // Calculate the total price before tax for the entire table
      // const totalAmountBeforeTax = tableData.reduce(
      //   (acc, medicine) => acc + (parseFloat(medicine.Total) || 0),
      //   0
      // );

      // Log the unique ID of the newly added medicine
      console.log(
        "Unique ID of the newly added medicine:",
        newMedicine.customId
      );
    } else if (action === "clear") {
      // Clear the input fields by resetting the state
      clearInputFields();
    }
  };

  const calculateTotalDiscount = () => {
    const totalDiscount = tableData.reduce(
      (acc, row) => acc + (parseFloat(row.Discount) || 0),
      0
    );
    return totalDiscount.toFixed(2);
  };

  const clearInputFields = () => {
    setMedicine("");
    setManufacturer("");
    setCategory("");
    setBatch("");
    setBatchExpiry("");
    setUnit("");
    setstrips("");
    setFreestrips("");
    setGst("");
    setCGst("");
    setSGst("");
    setPrice("");
    setMRP("");
    setDiscount("");
    setTotal("");
    setHSNcode("");
    setRackNo("");
    setBookNo("");
    setNetPrice("");
    setQuantity("");
  };

  const handleDelete = (customId) => {
    // Update the tableData state by removing the medicine with the specified customId
    setTableData((prevTableData) =>
      prevTableData.filter((medicine) => medicine.customId !== customId)
    );

    window.alert("Medicine deleted successfully");
  };

  // const fetchInvoices = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/getInvoices");
  //     console.log(response.data); // Add this line
  //     setTableData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching invoices:", error);
  //   }
  // };

  const handleSaveInvoice = async () => {
    try {
      // Create an array of medicines using the tableData state
      const medicines = tableData.map((row) => ({
        MedId: row.MedId,
        Medicine: row.Medicine,
        Manufacturer: row.Manufacturer,
        Category: row.Category,
        Batch: row.Batch,
        BatchExpiry: row.BatchExpiry,
        Unit: row.Unit,
        strips: row.strips,
        Freestrips: row.Freestrips,
        Gst: row.Gst,
        price: row.price,
        MRP: row.MRP,
        Discount: row.Discount,
        Total: row.Total,
        HSNcode: row.HSNcode,
        RackNo: row.RackNo,
        BookNo: row.BookNo,
        NetPrice: row.NetPrice,
        Quantity:
          parseFloat(row.Unit) * parseFloat(row.strips) +
          parseFloat(row.Freestrips),
      }));

      // Calculate the invoice details from the table data
      const calculatedAmounts = calculateAmounts();
      const newInvoice = {
        invoiceNumber,
        stockName,
        date,
        medicines, // Assign the array of medicines
        Manufacturer,
        Category,
        Total: calculatedAmounts.total,
        Discount,
        GST: calculatedAmounts.gst,
        CGST: calculatedAmounts.cgst,
        SGST: calculatedAmounts.sgst,
        GrossAmount: calculatedAmounts.grossAmount,
        RoundOff: calculatedAmounts.roundoff,
        StocksReturned: calculatedAmounts.stocksReturned,
        PurchaseAmount: calculatedAmounts.purchaseAmount,
      };

      // Send a POST request to save the invoice details to the server
      const response = await axios.post(
        "http://localhost:5000/api/addInvoice",
        newInvoice
      );

      console.log(response.data);
      window.alert("Invoice added successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPriceBeforeTax = () => {
    const totalPriceBeforeTax = tableData.reduce(
      (acc, row) => acc + (parseFloat(row.Total) || 0),
      0
    );
    return totalPriceBeforeTax.toFixed(2); // Round to 2 decimal places
  };

  // Update the Total Price before tax whenever the tableData changes
  useEffect(() => {
    calculateTotalPriceBeforeTax(); 
    const totalPriceBeforeTax = calculateTotalPriceBeforeTax();
    setTotalAmountBeforeTax(totalPriceBeforeTax); // Update the state
  }, [tableData] [calculateTotalPriceBeforeTax]);

  // Update the Total calculation to consider the discount
  const calculateAmounts = () => {
    // Calculate the total amount before tax and total discount amount
    let totalAmountBeforeTax = 0;
    let totalDiscountAmount = 0;

    tableData.forEach((row) => {
      const netPrice = parseFloat(row.NetPrice) || 0;
      const discountPercentage = parseFloat(row.Discount) || 0;
      const discountAmount = (netPrice * discountPercentage) / 100;

      totalAmountBeforeTax += netPrice;
      totalDiscountAmount += discountAmount;
    });

    const total = totalAmountBeforeTax - totalDiscountAmount; // Exclude discount
    const gst = isGSTSet
      ? totalGST
      : tableData.reduce((acc, row) => acc + (parseFloat(row.Gst) || 0), 0);
    const cgst = isGSTSet
      ? totalGST / 2
      : tableData.reduce((acc, row) => acc + (parseFloat(row.Gst) / 2 || 0), 0);
    const sgst = isGSTSet
      ? totalGST / 2
      : tableData.reduce((acc, row) => acc + (parseFloat(row.Gst) / 2 || 0), 0);

    const grossAmount = totalAmountBeforeTax + gst;

    const purchaseAmount = Math.floor(grossAmount * 100) / 100; // Round down to 2 decimal places
    const roundoff = (grossAmount - purchaseAmount).toFixed(2); // Round to 2 decimal places

    return {
      total: total.toFixed(2),
      discount: totalDiscountAmount.toFixed(2),
      totalAmountBeforeTax: totalAmountBeforeTax.toFixed(2),
      gst: gst.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      grossAmount: grossAmount.toFixed(2),
      purchaseAmount: purchaseAmount.toFixed(2),
      roundoff: parseFloat(roundoff).toFixed(2),
    };
  };

  const amounts = calculateAmounts();
  const totalDiscount = calculateTotalDiscount();

  return (
    <>
      <PharmacyNav />
      <div className="container-txj" style={{fontFamily:"Inria Serif"}}>
        <div className="main-container-tjx1">
        <h3> <Link to="/PharmacyHome" style={{color:"#3E6EAB"}}> 
            <FaArrowCircleLeft />
          </Link> &nbsp;Add invoice</h3>
          <hr/>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input 
                type="text"
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="stockName">Stockist Name</label>
              <Select
              options={stockistOptions}
              value={stockistOptions.find((option) => option.value === stockistValue)}
              onChange={(selectedOption) => setStockistValue(selectedOption.value)}
              styles={customStyles}
            />
            </div>
            <div className="input-container">
              <label htmlFor="date"> Invoice Date</label>
              <input
                type="date"
                id="date1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="second-container-txj"style={{fontFamily:"Inria Serif"}} >
        <div className="input-boxes">
        <div className="input-row-1">
          <div className="input-container-1">
            <label htmlFor="Medicine">Medicine</label>
            <input
              type="text"
              id="Medicine"
              value={Medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Manufacturer">Manufacturer</label>
            <input
              type="text"
              id="Manufacturer"
              value={Manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Category">Category</label>
            <input
              type="text"
              id="Category"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Batch">Batch </label>
            <input
              type="Batch"
              id="Batch"
              value={Batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="BatchExpiry">Batch Expiry</label>
            <input
              type="date"
              id="BatchExpiry"
              value={BatchExpiry}
              onChange={(e) => setBatchExpiry(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Unit">Units/Strip</label>
            <input
              type="number"
              id="Unit"
              value={Unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="strips">No of Strips</label>
            <input
              type="number"
              id="strips"
              value={strips}
              onChange={(e) => setstrips(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Freestrips">Free strips</label>
            <input
              type="number"
              id="Freestrips"
              value={Freestrips}
              onChange={(e) => setFreestrips(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="Gst">GST Total%</label>
            <input
              type="number"
              id="Gst"
              value={Gst}
              onChange={handleGSTChange}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="price">Price/Strip</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="input-container-1">
            <label htmlFor="MRP">MRP/Strip</label>
            <input
              type="number"
              id="MRP"
              value={MRP}
              onChange={(e) => setMRP(e.target.value)}
            />
          </div>
          &nbsp;
          <div className="input-container-1">
            <label htmlFor="DiscountInput">Discount</label>
            <input
              type="number"
              id="percentageInput"
              value={Discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row-3">
          <div className="input-container-2">
            <label htmlFor="HSNCode">HSN Code</label>
            <input className="hsn-input"
              type="text"
              id="HSNcode"
              value={HSNcode}
              onChange={(e) => setHSNcode(e.target.value)}
            />
          </div>
          &nbsp;&nbsp;
          <div className="input-container-2">
            <label htmlFor="RackNo">Rack No</label>
            <input className="rack-input"
              type="text"
              id="RackNo"
              value={RackNo}
              onChange={(e) => setRackNo(e.target.value)}
            />
          </div>
          &nbsp;&nbsp;
          <div className="input-container-2">
            <label htmlFor="BookNo">Book No</label>
            <input className="book-input"
              type="text"
              id="BookNo"
              value={BookNo}
              onChange={(e) => setBookNo(e.target.value)}
            />
          </div>
          &nbsp;&nbsp;
          <div className="input-container-2">
            <label htmlFor="NetPrice">Net Price</label>
            <input className="netp-input"
              type="text"
              id="NetPrice"
              value={NetPrice}
              onChange={(e) => setNetPrice(e.target.value)}
            />
          </div>
          &nbsp;&nbsp;
          <div className="input-container-2">
            {" "}
            <button
              className="button-nhy"
              onClick={() => handleActionButton("add")}
            >
              Add{" "}
            </button>{" "}
          </div>{" "}
          &nbsp; &nbsp; &nbsp;
          <div className="input-container-2">
            {" "}
            <button
              className="button-nhy1"
              onClick={() => handleActionButton("clear")}
            >
              clear
            </button>{" "}
          </div>
        </div>
        </div>
        <div className="container-table-tnx" >
          <table className="invoice-table">
            <thead >
              <tr>
                <th>Medicine</th>
                <th>Manufacturer</th>
                <th>Category</th>
                <th>Batch</th>
                <th>Expiry</th>
                <th>GST%</th>
                <th>SGST%</th>
                <th>CGST%</th>
                <th>Units/Strip</th>
                <th>No of Strips</th>
                <th>Price/Strip</th>
                <th>MRP/Strip</th>
                <th>Discount</th>
                <th>In Tax(Rs)</th>
                <th>Total price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row._id}>
                  <td>{row.Medicine}</td>
                  <td>{row.Manufacturer}</td>
                  <td>{row.Category}</td>
                  <td>{row.Batch}</td>
                  <td>{row.BatchExpiry}</td>
                  <td>{row.Gst}</td>
                  <td>{(row.Gst / 2).toFixed(2)}</td>
                  <td>{(row.Gst / 2).toFixed(2)}</td>
                  <td>{row.Unit}</td>
                  <td>{row.strips}</td>
                  <td>{row.price}</td>
                  <td>{row.MRP}</td>
                  <td>{row.Discount}</td>
                  <td>{calculateInTax(row)}</td>
                  <td>{row.NetPrice}</td>
                  <td>{row.Quantity}</td>
                  <td>
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleDelete(row.customId)} // Pass the customId to the handleDelete function
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="end-page-tnx">
          <div className="Remarks-page-tnx">
            {/* <h5 className="heading-remarks-tnx">Remarks</h5>
        <input type="text" className='box'/> */}
          </div>
        </div>
        <table className="Amount-table-table">
          <tbody>
            <tr>
              <td>Total</td>
              <td>{amounts.total}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{totalDiscount}%</td>
            </tr>

            <tr>
              <td>Total Disc Amount</td>
              <td>{amounts.discount}</td>
            </tr>
            <tr>
              <td>Total Tax(GST)</td>
              <td>{amounts.gst}</td>
            </tr>
            <tr>
              <td>CGST</td>
              <td>{amounts.cgst}</td>
            </tr>
            <tr>
              <td>SGST</td>
              <td>{amounts.sgst}</td>
            </tr>
            <tr>
              <td>Gross Amount</td>
              <td>{amounts.grossAmount}</td>
            </tr>
            <tr>
              <td>Round Off</td>
              <td>{amounts.roundoff}</td>
            </tr>
            {/* <tr>
      <td>Stocks Returned</td>
      <td>{amounts.stocksReturned}</td>
    </tr> */}
            <tr>
              <td>Purchase Amount</td>
              <td>{amounts.grossAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="save-tnx">
        <button className="save-tnx1" onClick={handleSaveInvoice} style={{backgroundColor:"#3E6EAB",fontFamily:"Inria Serif"}}>
          Save Invoice
        </button>
      </div>
    </>
  );
};

export default InvoiceStock;