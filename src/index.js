import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';

import './index.css';
import { MyApp } from './components/MyApp/MyApp';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <MyApp />
  </React.StrictMode>
);
