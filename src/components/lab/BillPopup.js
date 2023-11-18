import React, { useRef } from "react";
import "./CSS/BillPopup.css";
import { AiFillPrinter } from 'react-icons/ai';

import ReactToPrint from "react-to-print";

const BillPopup = ({ item, patientNames, onClose }) => {
  const componentRef = useRef();
  console.log("hi"+componentRef.current)

  

  const handlePrint = (item) => {
    // Create a print window with the specific row data
    const printWindow = window.open('100%', '100%','100%','100%' );
    
    // Construct the HTML content to print
    const contentToPrint = `
      <html>
        <head>
          <title>Print Bill</title>
        </head>
        <body>
          <div ref="billContent" style="font-size: 12px;">
            <h2>Bill Details</h2>
            <p>Bill No: ${item.billNo}</p>
            <p>Patient ID: ${item.patientId}</p>
            <p>Patient Name: ${patientNames[item.patientId] || "Loading..."} </p>
            <h3>Services:</h3>
            <ul>
              ${item.services.map((service, index) => `
                <li key=${index}>
                  <strong>Name:</strong> ${service.name}<br />
                  <strong>Price:</strong> ${service.price}<br />
                  <strong>Discount:</strong> ${service.discount}<br />
                  <strong>Discounted Price:</strong> ${service.discountedPrice}
                </li>`
              ).join('')}
            </ul>
            <p>Total Balance: ${item.totalBalance}</p>
          </div>
          <script type="text/javascript">
          // Set the filename for the printed document
          window.addEventListener('afterprint', function () {
            setTimeout(() => {
              document.execCommand('SaveAs', true, 'BillLab.pdf');
            }, 0);
          });
        </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };


  return (
    <>
      <div className="bill-print-preview">
        <div className="bill-print-content">
          <div>
            <ReactToPrint
              trigger={() => <button>Print</button>}
              content={() => componentRef.current}
            />
            {/* Add the content you want to display in the popup */}
            <div ref={componentRef}>
              <h2>Bill Details</h2>
              <p>Bill No: {item.billNo}</p>
              <p>Total Balance: {item.patientId}</p>
              <p>
                Total Balance: {patientNames[item.patientId] || "Loading..."}{" "}
              </p>
              {/* Add more details as needed */}

              <h3>Services:</h3>
              <ul>
                {item.services.map((service, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {service.name}
                    <br />
                    <strong>Price:</strong> {service.price}
                    <br />
                    <strong>Discount:</strong> {service.discount}
                    <br />
                    <strong>Discounted Price:</strong> {service.discountedPrice}
                  </li>
                ))}
              </ul>
              <p>Total Balance: {item.totalBalance}</p>
            </div>
          </div>
          <button onClick={onClose}>Close</button>
          <td onClick={() => handlePrint(item)}><AiFillPrinter  /></td>
        </div>
      </div>
    </>
  );
};

export default BillPopup;
