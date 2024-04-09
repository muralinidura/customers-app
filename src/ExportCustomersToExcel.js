import React, { useEffect } from "react";
import * as XLSX from 'xlsx';
const ExportCustomersToExcel = (customersData, onProcessFinish) => {
    const exportToExcel = (customersData) => {
    const customer_details_data = customersData.map(entry=>{
        const {customer_client_mapping, customer_billing_details, ...rest}=entry;
        return rest;
      })
      const worksheet = XLSX.utils.json_to_sheet(customer_details_data);
  
      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Details');
  
      const customerClientMappingStrings = customersData.map(entry => ({
        ...entry,
        customer_client_mapping: entry.customer_client_mapping.join(', '),
      }));
      const customer_client_mapping_data = customerClientMappingStrings.map(entry=>{
        const {customer_name, customer_billing_details, ica, is_benchmarks_enabled, sow_start_date, sow_end_date, ...rest} = entry;
        return rest;
      });
  
      const worksheetWithClientMappingStrings = XLSX.utils.json_to_sheet(customer_client_mapping_data);
      XLSX.utils.book_append_sheet(workbook, worksheetWithClientMappingStrings, 'Client Mapping');
  
      const customerBillingDetailsStrings = customersData.map(entry => ({
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
      onProcessFinish();
    }
    // return(
    //     <div>
    //         <button onClick={exportToExcel}>Download</button>
    //     </div>
    //     );

}
export default ExportCustomersToExcel;