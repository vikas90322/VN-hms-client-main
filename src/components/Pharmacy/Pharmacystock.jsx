import React, { useState, useEffect } from "react";
import "./Pharmacystock.css";
import axios from "axios";
import PharmacyNav from "./PharmacyNav";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import ReactJsPagination from "react-js-pagination";

function Pharmacystock() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getInvoices");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const calculateUnitsPerPrice = (unit, price) => {
    if (unit && price) {
      const result = (unit / price).toFixed(2);
      return result;
    }
    return "";
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredMedicines = medicines
    .filter((invoice) =>
      invoice.medicines.some((medicine) => {
        const searchValue = searchQuery.toLowerCase();
        return (
          medicine.Medicine.toLowerCase().includes(searchValue) ||
          String(medicine.Quantity).includes(searchValue) ||
          String(medicine.invoiceNumber).includes(searchValue) ||
          String(medicine.price).includes(searchValue) ||
          String(medicine.MRP).includes(searchValue) ||
          String(medicine.Unit).includes(searchValue) ||
          String(medicine.Batch).includes(searchValue) ||
          String(medicine.BatchExpiry).includes(searchValue)
        );
      })
    );

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredMedicines.length);

  const pageRange = [];
  for (let i = 1; i <= totalPages; i++) {
    pageRange.push(i);
  }

  return (
    <>
      <PharmacyNav />
      <div className="page-container-177">
        <div className="content-container-177">
          <div className="left-side-177">
            <h1>
              <Link to="/PharmacyHome" style={{ color: "#3E6EAB" }}>
                <FaArrowCircleLeft />
              </Link>{" "}
              &nbsp;Pharmacy Stocks
            </h1>
          </div>
        </div>
        <div className="red-container-177">
          <div className="search-bar-container-177">
            <input
              type="text"
              className="search-bar-177"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table-container-177">
            <thead>
              <tr className="table-row-177">
                <th className="table-cell-177 table-header-177" rowSpan="2">
                  Med Name
                </th>
                <th className="table-cell-177 table-header-177" rowSpan="2">
                  invoiceNumber
                </th>
                <th className="table-cell-177 table-header-177" rowSpan="2">
                  Batch
                </th>
                <th className="table-cell-177 table-header-177" colSpan="2">
                  Pack
                </th>
                <th className="table-cell-177 table-header-177" colSpan="2">
                  Units
                </th>
                <th className="table-cell-177 table-header-177" rowSpan="2">
                  Units in Stock
                </th>
                <th className="table-cell-177 table-header-177" rowSpan="2">
                  Expiry
                </th>
                <th className="table-cell-177 table-header-177" colSpan="2">
                  Percent
                </th>
              </tr>

              <tr className="table-row-177">
                <th className="table-cell-177 table-header-177">Price</th>
                <th className="table-cell-177 table-header-177">MRP</th>
                <th className="table-cell-177 table-header-177">Per Pack</th>
                <th className="table-cell-177 table-header-177">Price</th>
                <th className="table-cell-177 table-header-177">Discount</th>
                <th className="table-cell-177 table-header-177">GST</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.slice(startIndex, endIndex).map((invoice, index) => (
                <React.Fragment key={index}>
                  {invoice.medicines.map((medicine, medIndex) => (
                    <tr key={medIndex} className="table-row-177">
                      <td className="table-cell-177">{medicine.Medicine}</td>
                      <td className="table-cell-177">{invoice.invoiceNumber}</td>
                      <td className="table-cell-177">{medicine.Batch}</td>
                      <td className="table-cell-177">{medicine.price}</td>
                      <td className="table-cell-177">{medicine.MRP}</td>
                      <td className="table-cell-177">{medicine.Unit}</td>
                      <td className="table-cell-177">
                        {calculateUnitsPerPrice(medicine.Unit, medicine.price)}
                      </td>
                      <td className="table-cell-177">{medicine.Quantity}</td>
                      <td className="table-cell-177">{medicine.BatchExpiry}</td>
                      <td className="table-cell-177">{medicine.Discount}</td>
                      <td className="table-cell-177">{medicine.Gst}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <ReactJsPagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredMedicines.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default Pharmacystock;
