import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddClientMapping = ({onAddClientMapping, onCloseClientMapping, customerData})=>{
    const [newCustomerClientMappings, setNewCustomerClientMappings] = useState([{ id: 1, clientId: '' }]);
    useEffect(()=>{
         setNewCustomerClientMappings(customerData.customer_client_mapping.map((clientId, index) => ({
            id: index + 1,
            clientId: clientId
          })));
    },[customerData])

    const handleAddClientMapping = () =>{
        const newClientIds = newCustomerClientMappings.map(mapping=>mapping.clientId);
        customerData.customer_client_mapping = newClientIds;
        onAddClientMapping(customerData);
    }
    
    const onClose = () =>{
        onCloseClientMapping();
    }

    const handleClientMappingChange = (id, newClientId)=>{
        const updatedCustomerClientMappings = newCustomerClientMappings.map(clientMapping=>{
            if(id===clientMapping.id){
                return {...clientMapping, clientId:newClientId};
            }
            return clientMapping;
        });
        setNewCustomerClientMappings(updatedCustomerClientMappings);
    }
    const handleAddClientRowClick = () =>{
        if(newCustomerClientMappings.length<10){
            const newClientRow = {id:newCustomerClientMappings.length+1, clientId:''};
            setNewCustomerClientMappings([...newCustomerClientMappings, newClientRow]);
        }
    }
    const handleRemoveClientRowClick = (id)=>{
        const updatedCustomerClientMappings = newCustomerClientMappings.filter(clientMapping=>id!==clientMapping.id);
        setNewCustomerClientMappings(updatedCustomerClientMappings);
    }

    return (
        <div className="add-customer-popup">
            <div className="modal-content">
            <h3>Add {customerData.customer_name} client mapping details</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            Client Id
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newCustomerClientMappings.map(clientMapping=>(
                            <tr key={clientMapping.id}>
                                <td>{clientMapping.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={clientMapping.clientId}
                                        onChange={(e)=>handleClientMappingChange(clientMapping.id, e.target.value)}
                                    />
                                </td>
                                <td>{newCustomerClientMappings.length>1&&(<FaMinus onClick={()=>handleRemoveClientRowClick(clientMapping.id)} className="action-icon"></FaMinus>)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                {newCustomerClientMappings.length < 10 && (
                <button onClick={handleAddClientRowClick}>
                    <FaPlus className="action-icon" /> Add Client
                </button>
                )}
            </div>
            <button onClick={handleAddClientMapping}>Add</button>
            <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}
export default AddClientMapping;