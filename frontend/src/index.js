import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuditsContextProvider } from './context/AuditsContext';
import { AuthContextProvider } from './context/AuthContext';
import { UsersContextProvider } from './context/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UsersContextProvider>
          <AuditsContextProvider>
            <App />
          </AuditsContextProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)