import { useState } from "react";

const AddBillingDetails = ({onAddBillingDetails, onCloseBillingDetails, billingDetails})=>{
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [mode, setMode] = useState('');
    const [newBillingDetails, setNewBillingDetails] = useState([{
        metrics_type : "",
        metrics_fee : ""
    }])
    return (
        <div>
            <h3>Add billing details</h3>
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
                        <tb>
                            RSA
                        </tb>
                        <tb>
                            RSA Input Text
                        </tb>
                    </tr>
                    <tr>
                        <tb>
                            RSB
                        </tb>
                        <tb>
                            RSB Input Text
                        </tb>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default AddBillingDetails;