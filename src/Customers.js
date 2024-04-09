import { useState, useEffect } from "react";
import CustomerData from "./resources/CustomerData";
import "./Customers.css";
import CustomerDetails from "./CustomerDetails";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import InformationPopup from "./InformationPopup";
import * as XLSX from 'xlsx';
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
  const exportToExcel = () =>{
    const customer_details_data = filteredCustomers.map(entry=>{
      const {customer_client_mapping, customer_billing_details, ...rest}=entry;
      return rest;
    })
    const worksheet = XLSX.utils.json_to_sheet(customer_details_data);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Details');

    const customerClientMappingStrings = filteredCustomers.map(entry => ({
      ...entry,
      customer_client_mapping: entry.customer_client_mapping.join(', '),
    }));
    const customer_client_mapping_data = customerClientMappingStrings.map(entry=>{
      const {customer_name, customer_billing_details, ica, is_benchmarks_enabled, sow_start_date, sow_end_date, ...rest} = entry;
      return rest;
    });

    const worksheetWithClientMappingStrings = XLSX.utils.json_to_sheet(customer_client_mapping_data);
    XLSX.utils.book_append_sheet(workbook, worksheetWithClientMappingStrings, 'Client Mapping');

    const customerBillingDetailsStrings = filteredCustomers.map(entry => ({
      ...entry,
      customer_billing_details: entry.customer_billing_details.map(detail => `${detail.metrics_type}: ${detail.metrics_fee}`).join(', ')
    }));

    const customer_billing_details_data = customerBillingDetailsStrings.map(entry=>{
      const {customer_name, customer_client_mapping, ica, is_benchmarks_enabled, sow_start_date, sow_end_date, ...rest} = entry;
      return rest;
    });

    const worksheetWithBillingDetailsStrings = XLSX.utils.json_to_sheet(customer_billing_details_data);
    XLSX.utils.book_append_sheet(workbook, worksheetWithBillingDetailsStrings, 'Billing Details');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook,  'Customers.xlsx');
  }
  
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
      <button onClick={exportToExcel}>Export To Excel</button>
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
