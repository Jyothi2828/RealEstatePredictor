import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from '../src/performance/reportWebVitals'; // Update the path to the reportWebVitals file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
