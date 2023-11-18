import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import LabServiceForm from "./LabServiceForm";
import "./CSS/LabServiceTable.css";
import LabNavbar from "./LabNavbar";
import { AiOutlineSearch } from "react-icons/ai";
import ReactJsPagination from "react-js-pagination";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { BASE_URL } from "../../services/Helpers";

const LabServiceTable = () => {

  console.log("hi" + BASE_URL)
  const [labServices, setLabServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetchLabServices();
  }, []);

  const fetchLabServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/lab-services"
      );
      setLabServices(response.data);
    } catch (error) {
      console.error("Error fetching lab services:", error);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
  };

  const handleAdd = () => {
    setSelectedService(null);
    setAddPopupOpen(true);
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (selectedService) {
        await axios.put(
          `http://localhost:5000/api/lab-services/${selectedService._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/lab-services", formData);
      }
      fetchLabServices();
      setSelectedService(null);
      setAddPopupOpen(false);
    } catch (error) {
      console.error("Error adding/updating lab service:", error);
    }
  };

  const handleSearchTextChange = (newValue) => {
    setSearchText(newValue);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = labServices.filter((item) => {
    return (
      (item.serviceId && item.serviceId.toString().includes(searchText)) ||
      (item.testName &&
        item.testName.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.testPrice && item.testPrice.toString().includes(searchText)) ||
      (item.serviceTax && item.serviceTax.toString().includes(searchText)) ||
      (item.testCode && item.testCode.toString().includes(searchText)) ||
      (item.selectedVendor &&
        item.selectedVendor.toLowerCase().includes(searchText.toLowerCase()))
    );
  });
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  const handleCancel = () => {
    setSelectedService(null);
    setAddPopupOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDelete = async (id) => {
    if (!confirmed) {
      // If not confirmed, set confirmed to true and return, showing the confirmation dialog.
      setConfirmed(true);
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/lab-services/${id}`);
      fetchLabServices();
      setConfirmed(false); // Reset the confirmation state
    } catch (error) {
      console.error("Error deleting lab service:", error);
    }
  };

  return (
    <>
      <LabNavbar />
      <div className="lab-service-table-container_5">
        <h2 className="lab-ser-headding-arun5">Services</h2>
        <h4 className="lab-ser-subheadding-arun5">Lab Service Management</h4>
        <div className="search-add_5">
          <div className="search-bar_5">
            <div className="search-input_5">
              <AiOutlineSearch className="search-icon_5" />
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => handleSearchTextChange(e.target.value)}
                className="input-field_1"
              />
            </div>
          </div>

          <button className="add-button_5" onClick={handleAdd}>
            Add Lab Service
          </button>
        </div>
        <table className="lab-service-table_5">
          <thead style={{backgroundColor:'#3d50ae'}}>
            <tr>
              <th>Service ID</th>
              <th>Test Name</th>
              <th>Test Price</th>
              <th>Service Tax</th>
              <th>Test Code</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceId}</td>
                <td>{service.testName}</td>
                <td>{service.testPrice}</td>
                <td>{service.serviceTax}</td>
                <td>{service.testCode}</td>
                <td>{service.selectedVendor}</td>

                <td>
                  <div className="asd_dsfet005">
                    <button
                      className="edit-button_5"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </button>
                    <div>
                      <button
                        className="delete-button_5"
                        onClick={() => handleDelete(service._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {confirmed && (
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to delete this item?</p>
                        <button className="cancel" onClick={() => setConfirmed(false)}>Cancel</button>
                        <button className="confirm" onClick={() => handleDelete(service._id)}>Confirm</button>
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <ReactJsPagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={labServices.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText={<span className="custom-pagination-arrow"><KeyboardArrowLeftIcon /></span>}
          nextPageText={<span className="custom-pagination-arrow"><KeyboardArrowRightIcon /></span>} // Use custom content for the next arrow
          firstPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowLeftIcon /></span>} // Use custom content for the next arrow
          lastPageText={<span className="custom-pagination-arrow"><KeyboardDoubleArrowRightIcon /></span>} // 
        />
        <Popup
          open={selectedService !== null || isAddPopupOpen}
          onClose={handleCancel}
          closeOnDocumentClick
        >
          <LabServiceForm
            selectedService={selectedService}
            onSubmit={handleAddOrUpdate}
            onCancel={handleCancel}
          />
        </Popup>
      </div>
    </>
  );
};

export default LabServiceTable;
