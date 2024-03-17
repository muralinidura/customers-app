import "./ConfirmationPopup.css";
const ConfirmationPopup =({onConfirm,onCancel,message})=>{
    return (
        <div className="confirmation-popup">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button> &nbsp;
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
    );
}
export default ConfirmationPopup;