import { useState, useEffect, useRef } from "react";
import CustomerData from "./resources/CustomerData";
import "./Customers.css";
import CustomerDetails from "./CustomerDetails";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import InformationPopup from "./InformationPopup";
import * as XLSX from 'xlsx';
import {exportToExcel} from "./ExportCustomersToExcel";
import { importCustomers } from "./ImportCustomersFromExcel";
const Customers = ({loggedInUser, userRole}) => {
  const [customerData, setCustomerData] = useState(CustomerData);
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mode, setMode] = useState('');
  const navigate = useNavigate();
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(CustomerData);
  const [downloadCustomers, setDownloadCustomers] = useState(false);
  const fileInputRef = useRef(null);

   useEffect(()=>{
    if(searchBy==='customer_id'){
      setFilteredCustomers(customerData.filter((customer)=>customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    else if (searchBy==='customer_name'){
      setFilteredCustomers(customerData.filter((customer)=>customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    else{
      setFilteredCustomers(customerData);
    }
  },[customerData,searchBy,searchTerm])

  const handleLogout = ()=>{
    Login.loggedInUser='';
    Login.userRole='';
    navigate('/');
  }

  const handleAddCustomer = (newCustomerData) => {
    // alert('customer will be added');
    if(mode==='Add'){
      setCustomerData((prevData)=>[...prevData,newCustomerData]);
      setInfoMessage(`Customer added succesfully`);
      setShowInfoPopup(true);
    }
    else {
      setCustomerData((prevCustomerData)=>{
        const updatedCustomerData = prevCustomerData.filter((customer)=>customer.customer_id!==newCustomerData.customer_id);
        return updatedCustomerData;
    });
      setCustomerData((prevData)=>[...prevData,newCustomerData]);
      setInfoMessage(`Customer updated succesfully`);
      setShowInfoPopup(true);
    }
    setMode('');
    setShowAddCustomerPopup(false);
  }
  
  const handleAddCustomerClose = () => {
    // alert('Add customer popup closed');
    setShowAddCustomerPopup(false);
  }

  const handleAddCustomerButtonClick = () => {
    setMode('Add');
    setShowAddCustomerPopup(true);
  }
  const handleInfoOk = () =>{
    setInfoMessage('');
    setShowInfoPopup(false);
  }
  const handleDeleteCustomer = (customerToBeDeleted) =>{
    setCustomerData((prevCustomerData)=>{
      const updatedCustomerData = prevCustomerData.filter((customer)=>customer.customer_id!==customerToBeDeleted.customer_id);
      return updatedCustomerData;
  });
    setInfoMessage('Customer deleted succefully');
    setShowInfoPopup(true);
  }

  const handleSearchByChange =(event)=>{
    setSearchBy(event.target.value);
  }
  const handleSearchTermChange =(event)=>{
    setSearchTerm(event.target.value);
  }
  const handleExportToExcelClick = () =>{
    exportToExcel(filteredCustomers);
    setInfoMessage('Customers information downloaded successfully');
    setShowInfoPopup(true);
  };

  const importExcelData = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const workbook = XLSX.read(e.target.result, { type: 'binary' });
    //   const importedData = {};
  
    //   workbook.SheetNames.forEach(sheetName => {
    //     const worksheet = workbook.Sheets[sheetName];
    //     const data = XLSX.utils.sheet_to_json(worksheet);
    //     importedData[sheetName] = data;
    //   });
  
    //   // Process the imported data and merge it with existing filteredCustomers
    //   mergeImportedData(importedData);
    // };
  
    // reader.readAsBinaryString(file);
    setFilteredCustomers(importCustomers(event));
    setInfoMessage('Customers information uploaded successfully');
    setShowInfoPopup(true);
  };
  
  // const mergeImportedData = (importedData) => {
  //   // Merge data from all three sheets into filteredCustomers
  //   const mergedCustomers = [];
  
  //   // Merge data from "Customer Details" sheet
  //   if (importedData['Customer Details']) {
  //     mergedCustomers.push(...importedData['Customer Details']);
  //   }
  
  //   // Merge data from "Client Mapping" sheet
  //   if (importedData['Client Mapping']) {
  //     // Assuming each entry in the client mapping sheet has a customer_id matching with filteredCustomers
  //     mergedCustomers.forEach(customer => {
  //       const matchingClientMapping = importedData['Client Mapping'].filter(mapping => mapping.customer_id === customer.customer_id);
  //       if (matchingClientMapping.length > 0) {
  //         customer.customer_client_mapping = matchingClientMapping[0].customer_client_mapping.split(',');
  //       }
  //     });
  //   }
  
  //   // Merge data from "Billing Details" sheet
  //   if (importedData['Billing Details']) {
  //     // Assuming each entry in the billing details sheet has a customer_id matching with filteredCustomers
  //     mergedCustomers.forEach(customer => {
  //       const matchingBillingDetails = importedData['Billing Details'].filter(detail => detail.customer_id === customer.customer_id);
  //       if (matchingBillingDetails.length > 0) {
  //         const billingDetails = matchingBillingDetails[0].customer_billing_details.split(',');
  //         const billingList = [];
  //         billingDetails.map(billing=>{
  //           billingList.push({metrics_type:billing.split(':')[0], metrics_fee:billing.split(':')[1]})
  //         });
  //         customer.customer_billing_details=billingList;
  //         // customer.customer_billing_details = matchingBillingDetails.map(detail => ({ metrics_type: detail.metrics_type, metrics_fee: detail.metrics_fee }));
  //       }
  //     });
  //   }
  
  //   // Update filteredCustomers with merged data
  //   setFilteredCustomers(mergedCustomers);
  // };

  const handleFileUpdloadButtonClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div>
      <div className="user-panel">
        <h2>Welcome, {loggedInUser}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h3>All Customers</h3>
      Search By 
      <label htmlFor="dropdown">  </label>
      <select id="dropdown" value={searchBy} onChange={handleSearchByChange}>
        <option value="">Select option...</option>
        <option value="customer_id">Customer ID</option>
        <option value="customer_name">Customer Name</option>
      </select>
      <input
        type="text"
        placeholder="Search Key"
        value={searchTerm}
        disabled={searchBy===""}
        onChange={handleSearchTermChange}
      />
      <br/>
      <br/>
      <button onClick={handleExportToExcelClick}>Download Customers</button>
      &nbsp; &nbsp; &nbsp;
      
        <input type="file" onChange={importExcelData} accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }}/>
        <button onClick={handleFileUpdloadButtonClick}>Upload Customers</button>
      
      <br/>
      <div className="customer-list">
        {filteredCustomers.map((customer, index) => (
            <CustomerDetails key={index} customer={customer} userRole={userRole} onAddCustomer={handleAddCustomer} onDeleteCustomer={handleDeleteCustomer}/>
        ))}
      </div>
      <button disabled={userRole!=='admin'?true:false} onClick={handleAddCustomerButtonClick}>Add Customer</button>
      {
        showAddCustomerPopup && (<AddCustomer onClose={handleAddCustomerClose} onAddCustomer={handleAddCustomer} customerData={null}></AddCustomer>)
      }
      {showInfoPopup && (<InformationPopup onOk={handleInfoOk} message={infoMessage}></InformationPopup>)}
    </div>
  );
};
export default Customers;
