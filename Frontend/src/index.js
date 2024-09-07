import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css'
import './styles/ToastStyles.css'; 
import { ToastContainer } from 'react-toastify'; 


ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer 
      autoClose={2000} 
      hideProgressBar={false}
      closeButton={true}
      pauseOnHover={false}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
