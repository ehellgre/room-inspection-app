import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [popup, setPopup] = useState({ show: false, message: '' });

    const showPopup = (message) => {
        setPopup({ show: true, message });
    };

    const hidePopup = () => {
        setPopup({ show: false, message: '' });
    };

    return (
        <PopupContext.Provider value={{ popup, showPopup, hidePopup }}>
            {children}
        </PopupContext.Provider>
    );
};