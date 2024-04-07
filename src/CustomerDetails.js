import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddCustomer from './AddCustomer';
import ConfirmationPopup from './ConfirmationPopup';
import AddBillingDetails from './AddBillingDetails';
import InformationPopup from './InformationPopup';
import AddClientMapping from './AddClientMapping';

const CustomerDetails = ({ index, customer, userRole, onAddCustomer, onDeleteCustomer }) => {
  const [isCustomerDetailsExpanded, setCustomerDetailsExpanded] = useState(false);
  const [isClientMappingExpanded, setClientMappingExpanded] = useState(false);
  const [isBillingDetailsExpanded, setBillingDetailsExpanded] = useState(false);
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  const [selectedCustomer, setSectedCustomer] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [customerToBeDeleted, setCustomerToBeDeleted] = useState(null);
  const [showBillingDetailsPopup, setShowBillingDetailsPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [showAddClientMappingPopup, setShowAddClientMappingPopup] = useState(false);

  const toggleCustomerDetails = () => {
    setCustomerDetailsExpanded(!isCustomerDetailsExpanded);
  };

  const toggleClientMapping = () => {
    setClientMappingExpanded(!isClientMappingExpanded);
  };

  const toggleBillingDetails = () => {
    setBillingDetailsExpanded(!isBillingDetailsExpanded);
  };

  const handleEditCustomer = (customer) =>{
    setSectedCustomer(customer);
    setShowAddCustomerPopup(true);
  }

  const handleAddCustomer = (customer) =>{
    onAddCustomer(customer);
    setShowAddCustomerPopup(false);
  }
  const handleAddCustomerPopupClose = () =>{
    setShowAddCustomerPopup(false);
    setSectedCustomer(null);
  }

  const handleDeleteCustomer = (customer) => {
    setCustomerToBeDeleted(customer);
    setConfirmationMessage(`Are you sure, you want to delete "${customer.customer_name}" customer?` );
    setShowConfirmationPopup(true);
  }
  const handleDeleteConfirm = () =>{
    setShowConfirmationPopup(false);
    onDeleteCustomer(customerToBeDeleted);
  }
  const handleDeleteCancel = () => {
    setCustomerToBeDeleted(null);
    setConfirmationMessage('');
    setShowConfirmationPopup(false);
  }

  const handleAddBillingDetailsClick = () =>{
    setSectedCustomer(customer);
    setShowBillingDetailsPopup(true);
  }

  const handleClosePopup = () =>{
    setSectedCustomer(null);
    setShowBillingDetailsPopup(false);
    setShowAddClientMappingPopup(false);
  }

  const handleAddBillingDetails = (customerData) => {
    setInfoMessage(`Billing details added for "${customerData.customer_name}" customer!`);
    setShowInfoPopup(true);
    handleClosePopup();
  }

  const handleAddClientMapping = (customerData) => {
    setInfoMessage(`Client Mapping details added for "${customerData.customer_name}" customer!`);
    setShowInfoPopup(true);
    handleClosePopup();
  }

  const handleEditBillingDetails = (customer) => {
    setSectedCustomer(customer);
    setShowBillingDetailsPopup(true);
  }

  const handleAddClientMappingClick = () =>{
    setSectedCustomer(customer);
    setShowAddClientMappingPopup(true);
  }


  return (
    <div className="customer-container">
      <div className="customer-header" onClick={toggleCustomerDetails} >
        <span>{customer.customer_name} (Customer ID: {customer.customer_id})</span>
        {/* <div className="customer-actions">
            <button onClick={()=>handleEditCustomer(customer)}>Edit</button> <button className="delete-button">Delete</button>
        </div> */}
        <div className="customer-header-icons">
          <FaEdit onClick={userRole==="admin"?()=>handleEditCustomer(customer):null}  className={`edit-icon ${userRole!=="admin"?'disabled':''}`}/>
          <FaTrash onClick={userRole==="admin"?()=>handleDeleteCustomer(customer):null} className={`edit-icon ${userRole!=="admin"?'disabled':''}`}/>
        </div>
      </div>

      {isCustomerDetailsExpanded && (
        <div className="customer-details">
          <p><b>ICA:</b> {customer.ica}</p>
          <p><b>SOW Start Date:</b> {customer.sow_start_date}</p>
          <p><b>SOW End Date:</b> {customer.sow_end_date}</p>
          <p><b>Benchmarks:</b> {customer.is_benchmarks_enabled?'Enabled':'Disabled'}</p>
          
          <div className="expandable-section" onClick={toggleClientMapping}>
            Client Mapping
          </div>
          {isClientMappingExpanded &&
              (customer.customer_client_mapping.length>0?(<table className="customer-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th> Client Id</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.customer_client_mapping.map((client_id, index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{client_id}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>):(<p>No Client Mapping</p>))}
          {isClientMappingExpanded && (<button disabled={customer.customer_client_mapping.length>9} onClick={handleAddClientMappingClick}>Add Client Mapping</button>)}

          <div className="expandable-section" onClick={toggleBillingDetails}>
            Billing Details
          </div>
          {isBillingDetailsExpanded && 
            (customer.customer_billing_details.length>0?(<table className="customer-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th> Metrics Type</th>
                        <th> Metrics Fee</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.customer_billing_details.map((billing, index)=>(
                        <tr>
                            <td>{index+1}</td>
                            <td>{billing.metrics_type}</td>
                            <td>{billing.metrics_fee}</td>
                            {index === 0 && ( // Render Actions column for the first row only
                            <td rowSpan={customer.customer_billing_details.length}>
                                <FaEdit onClick={userRole === "admin" ? () => handleEditBillingDetails(customer) : null} className={`edit-icon ${userRole !== "admin" ? 'disabled' : ''}`} />
                            </td>
                            )}
                        </tr>
                    ))
                    }
                </tbody>
            </table>):(<p>No Billing details</p>)
          )
          }
          {isBillingDetailsExpanded && (<button disabled={customer.customer_billing_details.length>1 || (!customer.is_benchmarks_enabled && customer.customer_billing_details.length>0)} onClick={handleAddBillingDetailsClick}>Add Billing Details</button>)}
        </div>
      )}
      {
        showAddCustomerPopup && (<AddCustomer onClose={handleAddCustomerPopupClose} onAddCustomer={handleAddCustomer} customerData={selectedCustomer}></AddCustomer>)
      }
      {showConfirmationPopup &&(<ConfirmationPopup onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} message={confirmationMessage}></ConfirmationPopup>)}
      {showBillingDetailsPopup &&(<AddBillingDetails onCloseBillingDetails={handleClosePopup} onAddBillingDetails={handleAddBillingDetails} customerData={selectedCustomer}></AddBillingDetails>)}
      {showAddClientMappingPopup &&(<AddClientMapping onCloseClientMapping={handleClosePopup} onAddClientMapping={handleAddClientMapping} customerData={selectedCustomer}></AddClientMapping>)}
      {showInfoPopup && (<InformationPopup onOk={()=>{setShowInfoPopup(false)}} message={infoMessage}></InformationPopup>)}
    </div>
  );
};

export default CustomerDetails;