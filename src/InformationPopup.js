import "./ConfirmationPopup.css";
const InformationPopup=({onOk, message})=>{
    return (
        <div className="confirmation-popup">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={onOk}>Ok</button>
          </div>
        </div>
    );
}
export default InformationPopup;