import { useEffect, useState } from "react";

const AddBillingDetails = ({onAddBillingDetails, onCloseBillingDetails, customerData})=>{
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [mode, setMode] = useState('');
    const [newBillingDetails, setNewBillingDetails] = useState([
            {
                metrics_type : "RSA",
                metrics_fee : 0
            },
            {
                metrics_type : "RSB",
                metrics_fee : 0
            }
        ]);
    useEffect(()=>{
        if(customerData.customer_billing_details.length>0){
            setMode("edit");
            setNewBillingDetails(customerData.customer_billing_details);
        }
    },[customerData.customer_billing_details.length])

    const onClose = ()=>{
        setNewBillingDetails(null);
        onCloseBillingDetails();
    }
    
    const handleMetricsFeeChange = (e) => {
        const {name,value} = e.target;
        const index = newBillingDetails.findIndex(detail=>detail.metrics_type===name);
        if(index!==-1){
            setNewBillingDetails(prevDetails=>{
                const updatedDetails = [...prevDetails];
                updatedDetails[index] = {...updatedDetails[index], metrics_fee : value};
                return updatedDetails;
            })
        }
    };
    

    const handleAddBillingDetails = () => {
        customerData.customer_billing_details = newBillingDetails;
        onAddBillingDetails(customerData);
    }

    return (
    <div className="add-customer-popup">
        <div className="modal-content">
            {mode==='edit'?(<h3>Update {customerData.customer_name} billing details</h3>):(<h3>Add billing details</h3>)}
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>
                            Metrics Type
                        </th>
                        <th>
                            Metrics Fee
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            RSA
                        </td>
                        <td>
                                <input
                                    type="number"
                                    name="RSA"
                                    value={newBillingDetails[0].metrics_fee}
                                    onChange={handleMetricsFeeChange}
                                />
                        </td>
                    </tr>
                    {customerData.is_benchmarks_enabled && (<tr>
                        <td>
                            RSB
                        </td>
                        <td>
                                <input
                                    type="number"
                                    name="RSB"
                                    value={newBillingDetails[1].metrics_fee}
                                    onChange={handleMetricsFeeChange}
                                />
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={handleAddBillingDetails}>{mode==='edit'?'Update':'Add'}</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </div>
    )
}
export default AddBillingDetails;