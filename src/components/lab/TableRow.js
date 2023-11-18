import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tablerow1 = ({ onSubmit, initialData, onClose }) => {
  const [formData, setFormData] = useState({
    RBC: "",
    Hb: "",
    Hct: "",
    MCV: "",
    MCH: "",
    MCHC: "",
    RDW: "",
    PLT: "",
    MPV: "",
    Neutrophil: "",
    Lymphocyte: "",
    Monocyte: "",
    Eosinophil: "",
    Basophil: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const parameterData = {
    RBC: {
      units: "cells/L",
      referenceInterval: "4.5 - 5.5 x 10^12",
    },
    Hb: {
      units: "g/dL",
      referenceInterval: "13.8 - 17.2",
    },
    Hct: {
      units: "%",
      referenceInterval: "38.8% - 50.0%",
    },
    MCV: { units: "fL", referenceInterval: "80 - 100" },
    MCH: { units: "pg", referenceInterval: "27 - 33" },
    MCHC: { units: "g/dL", referenceInterval: "32 - 36" },
    RDW: { units: "%", referenceInterval: "11.5% - 14.5%" },
    PLT: { units: "cells/L", referenceInterval: "150 - 450 x 10^9" },
    MPV: { units: "fL", referenceInterval: "7.4 - 10.4" },
    Neutrophil: { units: "cells/L", referenceInterval: "2.0 - 7.5 x 10^9" },
    Lymphocyte: { units: "cells/L", referenceInterval: "1.0 - 3.5 x 10^9" },
    Monocyte: { units: "cells/L", referenceInterval: "0.2 - 1.0 x 10^9" },
    Eosinophil: { units: "cells/L", referenceInterval: "0.02 - 0.5 x 10^9" },
    Basophil: { units: "cells/L", referenceInterval: "0.02 - 0.1 x 10^9" },
  };

  const getValidationClass = (parameter) => {
    const enteredValue = parseFloat(formData[parameter]);
    if (isNaN(enteredValue)) {
      return "";
    }

    const [min, max] = parameterData[parameter].referenceInterval
      .split("-")
      .map((value) => parseFloat(value.trim()));

    if (enteredValue < min || enteredValue > max) {
      return "invalid-value";
    }

    return "";
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reportdata",
        formData
      );
      console.log("Data saved:", response.data);
      toast.success("Data saved successfully");
      onSubmit(formData, parameterData);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="table-section_4">
      <form>
        <table>
          <thead>
            <tr>
              <th>TEST PARAMETER</th>
              <th>RESULT</th>
              <th>UNITS</th>
              <th>BIOLOGICAL REF,INTERVAL</th>
              <th colSpan="3">ACT</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData).map((parameter) => (
              <tr key={parameter}>
                <td className="left-align_4">{parameter}</td>
                <td colSpan="1">
                  <input
                    type="text"
                    name={parameter}
                    value={formData[parameter]}
                    onChange={handleInputChange}
                    className={getValidationClass(parameter)}
                    placeholder=""
                  />
                </td>
                <td>{parameterData[parameter].units}</td>
                <td>{parameterData[parameter].referenceInterval}</td>
                <td colSpan="3">
                  <a href="#a">Range</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="submit-button-advanced-div_4">
        <button
          className="submit-button-advanced_4"
          type="button"
          onClick={submitForm}
        >
          View Report
        </button>
        </div>
      </form>
    </div>
  );
};

export default Tablerow1;
