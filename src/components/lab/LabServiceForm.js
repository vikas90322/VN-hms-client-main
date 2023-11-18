import React, { useState, useEffect } from 'react';
import './CSS/LabServiceForm.css';

const LabServiceForm = ({ selectedService, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        serviceId:'',
        testName: '',
        testPrice: '',
        serviceTax: '',
        testCode: '',
        selectedVendor: '',
    });

    useEffect(() => {
        if (selectedService) {
            setFormData(selectedService);
        } else {
            setFormData({
                serviceId:'',
                testName: '',
                testPrice: '',
                serviceTax: '',
                testCode: '',
                selectedVendor: '',
            });
        }
    }, [selectedService]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="popup-overlay_5">
            <div className="popup-content_5">
                <h2>{selectedService ? 'Edit Lab Service' : 'Add Lab Service'}</h2>
                <form onSubmit={handleSubmit} className="popup-form_5">
                <div className='serviceformfields'>
                <div className="popup-input_5">
                        <label>Service ID:</label>
                        <input
                            type="number"
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleChange}
                        />
                    </div>&nbsp;
                    <div className="popup-input_5">
                        <label>Test Name:</label>
                        <input
                            type="text"
                            name="testName"
                            value={formData.testName}
                            onChange={handleChange}
                        />
                    </div>
                    </div><br/>
                <div className='serviceformfields'>
                    <div className="popup-input_5">
                        <label>Test Price:</label>
                        <input
                            type="number"
                            name="testPrice"
                            value={formData.testPrice}
                            onChange={handleChange}
                        />
                    </div>&nbsp;
                    
                    <div className="popup-input_5">
                        <label>Service Tax:</label>
                        <input
                            type="number"
                            name="serviceTax"
                            value={formData.serviceTax}
                            onChange={handleChange}
                        />
                    </div>
                    </div><br/>
                    <div className='serviceformfields'>
                    <div className="popup-input_5">
                        <label>Test Code:</label>
                        <input
                            type="text"
                            name="testCode"
                            value={formData.testCode}
                            onChange={handleChange}
                        />
                    </div>&nbsp;
                    <div className="popup-input_5">
                        <label>Selected Vendor:</label>
                        <input
                            type="text"
                            name="selectedVendor"
                            value={formData.selectedVendor}
                            onChange={handleChange}
                        />
                    </div>
                    </div>
                    <div className="button-group_5">
                        <button className="popup-button_5" type="submit">{selectedService ? 'Update' : 'Add'}</button>
                        <button className="popup-button_5" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LabServiceForm;