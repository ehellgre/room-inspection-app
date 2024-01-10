import React from 'react';
import { usePopup } from '../context/PopUpContext';

const ReminderPopUp = () => {
    const { popup, hidePopup } = usePopup();

    if (!popup.show) {
      return null;
    }
  
    return (
    <div className="popup-overlay">
        <div className="popup-container">
            {/*<div onClick={hidePopup}> */}
            <div className="popup-message">{popup.message}</div>
                <button className="popup-close-btn" onClick={hidePopup}>Sulje</button>
        </div>
    </div>
    );
  };

export default ReminderPopUp;