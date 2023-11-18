import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './PatientBill.css';

const PatientBill = () => {
  const [items, setItems] = useState([
    { id: 1, product: '', quantity: '', amount: '', manufactureDate: '', batch: '', expiryDate: '', gst: '', totalWithGST: 0, totalWithoutGST: 0, },
  ]);
  

  const [patientName, setPatientName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [pharmaSign, setPharmaSign] = useState('');

  const [subtotalWithGST, setSubtotalWithGST] = useState('');
  const [subtotalWithoutGST, setSubtotalWithoutGST] = useState('');

  useEffect(() => {
    updateSubtotals();
  }, [items]);

  const handleInputChange = (event, itemId, field) => {
    const { value } = event.target;
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, [field]: field === 'manufactureDate' || field === 'expiryDate' ? value : value || '' };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const updateSubtotals = () => {
    let totalWithGST = 0;
    let totalWithoutGST = 0;

    items.forEach((item) => {
      if (item.quantity !== '' && item.amount !== '' && item.gst !== '') {
        const amount = parseFloat(item.quantity) * parseFloat(item.amount);
        const amountWithGST = amount * (1 + parseFloat(item.gst) / 100);
        totalWithGST += amountWithGST;
        totalWithoutGST += amount;
      }
    });

    setSubtotalWithGST(totalWithGST.toFixed(2));
    setSubtotalWithoutGST(totalWithoutGST.toFixed(2));
  };

  const handleInpChange = (event, itemId, field) => {
    const { value } = event.target;
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value || '' };
        if (field === 'quantity' || field === 'amount') {
          const calculatedAmount = parseFloat(updatedItem.quantity || 0) * parseFloat(updatedItem.amount || 0);
          updatedItem.totalWithGST = calculatedAmount * (1 + parseFloat(updatedItem.gst) / 100);
          updatedItem.totalWithoutGST = calculatedAmount;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      product: '',
      quantity: '',
      amount: '',
      manufactureDate: '',
      batch: '',
      expiryDate: '',
      gst: '',
      totalWithGST: 0,
      totalWithoutGST: 0,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteRow = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleDynamicInputChange = (event, stateSetter) => {
    const { value } = event.target;
    stateSetter(value);
  };

  // ---------------------
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000', {
        patientName,
        invoiceNo,
        doctorName,
        date,
        pharmaSign,
        items,
      });

      // Handle the response as needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='patientbill-page'>
      <div className='gst-ph-head-2'>
        <span className='gst-text'>DL:20 KA-B41-180306</span>
        <span className='gst-text'>DL:20 KA-B41-180307</span>
      </div>
      <div className='gst-ph-head'>
        <span className='gst-text'>GSTIN:29BFNPM5181H1ZX</span>
        <span className='gst-text'>PHONE:+91 9916331311</span>
      </div>
      <h3 className='tax-title'>TAX INVOICE</h3>

      <div className='title-row'>
        <FaPlusCircle className='plus-icon' />
        <span className='pharma-title'>Matrical Pharma</span>
        <FaPlusCircle className='plus-icon' />
      </div>
      <div className='tax-title-header'>
        <p className='paharma-head-para'>
          #16, Ground Floor, 1st Main Road, Vijayanagar 2nd stage, Vijayanagara club road Hampinagara, Bengaluru-560104.
        </p>
      </div>

      <div className='pharma-bill-details'>
        <div>
          <label className='pharma-labels'>Patient Name : </label>
          <input
            type='text'
            value={patientName}
            onChange={(event) => handleDynamicInputChange(event, setPatientName)}
            className='pharma-head-inputs'
          />
        </div>
        <div>
          <label className='pharma-labels'>Invoice No : </label>
          <input
            type='number'
            value={invoiceNo}
            onChange={(event) => handleDynamicInputChange(event, setInvoiceNo)}
            className='pharma-head-inputs'
          />
        </div>
      </div>
      <div className='pharma-bill-details-2'>
        <div>
          <label className='pharma-labels'>Doctor Name : </label>
          <input
            type='text'
            value={doctorName}
            onChange={(event) => handleDynamicInputChange(event, setDoctorName)}
            className='pharma-head-inputs'
          />
        </div>
        <div>
          <label className='pharma-labels'>Date : </label>
          <input
            type='date'
            value={date}
            onChange={(event) => handleDynamicInputChange(event, setDate)}
            className='pharma-bill-input-date-2'
          />
        </div>
      </div>
      <table className='pharma-bill-table'>
        <thead className='pharma-bill-tablehead'>
          <tr>
            <th>S No.</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Product Price</th>
            <th>Mfg</th>
            <th>Batch No</th>
            <th>Exp</th>
            <th>GST (%)</th>
            <th>with GST</th>
            <th>without GST</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='pharma-bill-table-body'>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type='text'
                  value={item.product}
                  onChange={(event) => handleInputChange(event, item.id, 'product')}
                  className='pharma-bill-input'
                />
              </td>
              <td>
                <input
                  type='number'
                  value={item.quantity}
                  onChange={(event) => handleInpChange(event, item.id, 'quantity')}
                  className='pharma-bill-input'
                />
              </td>
              <td>
                <input
                  type='number'
                  value={item.amount}
                  onChange={(event) => handleInpChange(event, item.id, 'amount')}
                  className='pharma-bill-input'
                />
              </td>
              <td>
                <input
                  type='date'
                  value={item.manufactureDate}
                  onChange={(event) => handleInpChange(event, item.id, 'manufactureDate')}
                  className='pharma-bill-input-date'
                />
              </td>
              <td>
                <input
                  type='number'
                  value={item.batch}
                  onChange={(event) => handleInpChange(event, item.id, 'batch')}
                  className='pharma-bill-input'
                />
              </td>
              <td>
                <input
                  type='date'
                  value={item.expiryDate}
                  onChange={(event) => handleInpChange(event, item.id, 'expiryDate')}
                  className='pharma-bill-input-date'
                />
              </td>
              <td>
                <input
                  type='number'
                  value={item.gst}
                  onChange={(event) => handleInpChange(event, item.id, 'gst')}
                  className='pharma-bill-input'
                />
              </td>
              <td>{item.totalWithGST.toFixed(2)}</td>
              <td>{item.totalWithoutGST.toFixed(2)}</td>
              <td className='add-del'>
                <button onClick={() => handleDeleteRow(item.id)} className='del-btn'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className='Add-btn'>
        Add
      </button>
      <div className='pharma-subtotal'>
        <p>Subtotal with GST: {subtotalWithGST}</p>
        <p>Subtotal without GST: {subtotalWithoutGST}</p>
      </div>
      <div className='pharma-sign'>
        <label>Sign : </label>
        <input
          type='textarea'
          value={pharmaSign}
          onChange={(event) => handleDynamicInputChange(event, setPharmaSign)}
          className='sign-area'
        />
      </div>

      <button onClick={handleSubmit} className='submit-btn'>
        Submit
      </button>
    </div>
  );
};

export default PatientBill;
