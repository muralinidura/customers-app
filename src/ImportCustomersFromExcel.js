import * as XLSX from 'xlsx';
export const importCustomers = (event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();
    const customersAdded = [];
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const importedData = {};
  
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        importedData[sheetName] = data;
      });
  
      // Process the imported data and merge it with existing filteredCustomers
      const customersToAdd = mergeImportedData(importedData);
      customersAdded.push(...customersToAdd);
    };
  
    reader.readAsBinaryString(file);
    return customersAdded;
}

const mergeImportedData = (importedData) => {
    // Merge data from all three sheets into filteredCustomers
    const mergedCustomers = [];
  
    // Merge data from "Customer Details" sheet
    if (importedData['Customer Details']) {
      mergedCustomers.push(...importedData['Customer Details']);
    }
  
    // Merge data from "Client Mapping" sheet
    if (importedData['Client Mapping']) {
      // Assuming each entry in the client mapping sheet has a customer_id matching with filteredCustomers
      mergedCustomers.forEach(customer => {
        const matchingClientMapping = importedData['Client Mapping'].filter(mapping => mapping.customer_id === customer.customer_id);
        if (matchingClientMapping.length > 0) {
          customer.customer_client_mapping = matchingClientMapping[0].customer_client_mapping.split(',');
        }
      });
    }
  
    // Merge data from "Billing Details" sheet
    if (importedData['Billing Details']) {
      // Assuming each entry in the billing details sheet has a customer_id matching with filteredCustomers
      mergedCustomers.forEach(customer => {
        const matchingBillingDetails = importedData['Billing Details'].filter(detail => detail.customer_id === customer.customer_id);
        if (matchingBillingDetails.length > 0) {
          const billingDetails = matchingBillingDetails[0].customer_billing_details.split(',');
          const billingList = [];
          billingDetails.map(billing=>{
            billingList.push({metrics_type:billing.split(':')[0], metrics_fee:billing.split(':')[1]});
          });
          customer.customer_billing_details=billingList;
          // customer.customer_billing_details = matchingBillingDetails.map(detail => ({ metrics_type: detail.metrics_type, metrics_fee: detail.metrics_fee }));
        }
      });
    }
  
    // Update filteredCustomers with merged data
    return mergedCustomers;
  };

const ImportCustomersFromExcel = ()=>{
    return null;
}
export default ImportCustomersFromExcel;