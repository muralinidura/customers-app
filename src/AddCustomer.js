import React, { useEffect, useState } from "react";
import "./AddCustomer.css"; // Import the CSS file for styling
import ConfirmationPopup from "./ConfirmationPopup";
import InformationPopup from "./InformationPopup";

const AddCustomer = ({ onClose, onAddCustomer, customerData }) => {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [mode, setMode] = useState('');
  const [newCustomerData, setNewCustomerData] = useState({
    customer_id: "",
    customer_name: "",
    ica: "",
    sow_start_date: "",
    sow_end_date: "",
    customer_client_mapping:[],
    is_benchmarks_enabled: false,
    customer_billing_details: []
  });
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(()=>{
    if(customerData){
        setNewCustomerData(customerData);
        setMode('edit');
    }
  },[customerData])

//   useEffect(()=>{
//     if(!newCustomerData.is_benchmarks_enabled){
//         setNewCustomerData((prevData) => ({
//             ...prevData,
//             rsb_metrics_fee: 0,
//           }));
//     }
//   },[])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomerData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomer = () => {
    // Validate customer data if needed
    // ...

    // Call the parent component's callback to add the new customer
    if(newCustomerData.customer_id==="" | newCustomerData.customer_name==="" | newCustomerData.ica===""){
        setShowInfoPopup(true);
        setInfoMessage(`Customer Data fields cannot be empty`);
        return;
    }
    if(customerData){
        setShowConfirmationPopup(true);
        // onAddCustomer(newCustomerData);
        return;
    }
    onAddCustomer(newCustomerData);
    
    // Close the popup
    onClose();
  };

  const onUpdateCustomerConfirm = ()=>{
    setShowConfirmationPopup(false);
    onAddCustomer(newCustomerData);
  }
  const onUpdateCustomerCancel = ()=>{
    setShowConfirmationPopup(false);
  }
  const handleInfoOk = () =>{
    setShowInfoPopup(false);
    setInfoMessage('');
  };

  return (
    <div className="add-customer-popup">
      <div className="modal-content">
        {mode==='edit'?(<h2>Update {customerData.customer_name}</h2>):(<h2>Add New Customer</h2>)}
        <label>
          Customer ID:
          <input
            type="text"
            name="customer_id"
            value={newCustomerData.customer_id}
            onChange={handleChange}
            required={true}
            disabled={mode==='edit'?true:false}
          />
        </label>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer_name"
            value={newCustomerData.customer_name}
            onChange={handleChange}
          />
        </label>
        <label>
          ICA:
          <input
            type="text"
            name="ica"
            value={newCustomerData.ica}
            onChange={handleChange}
          />
        </label>
        <label>
          SOW Start Date:
          <input
            type="date"
            name="sow_start_date"
            value={newCustomerData.sow_start_date}
            onChange={handleChange}
          />
        </label>
        <label>
          SOW End Date:
          <input
            type="date"
            name="sow_end_date"
            value={newCustomerData.sow_end_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Benchmarks Enabled:
          <input
            type="checkbox"
            name="is_benchmarks_enabled"
            checked={newCustomerData.is_benchmarks_enabled}
            onChange={handleChange}
          />
        </label>
        {/* <label>
          RSA Metrics Fee:
          <input
            type="number"
            name="rsa_metrics_fee"
            value={newCustomerData.rsa_metrics_fee}
            onChange={handleChange}
          />
        </label>
        <label>
          RSB Metrics Fee:
          <input
            type="number"
            name="rsb_metrics_fee"
            value={newCustomerData.rsb_metrics_fee}
            onChange={handleChange}
            disabled={!newCustomerData.is_benchmarks_enabled}
          />
        </label> */}
        <button onClick={handleCustomer}>{mode==='edit'?'Update Customer':'Add Customer'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      {showConfirmationPopup && <ConfirmationPopup onConfirm={onUpdateCustomerConfirm} onCancel={onUpdateCustomerCancel} message={`Are you sure you want to update customer?`}></ConfirmationPopup>}
      {showInfoPopup && (<InformationPopup onOk={handleInfoOk} message={infoMessage}></InformationPopup>)}
    </div>
  );
};

export default AddCustomer;