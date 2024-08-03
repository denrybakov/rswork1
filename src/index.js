import React from 'react';
import ReactDOM from 'react-dom/client';
import { Form } from './components/Form'
import { MyForm } from './components/MyForm';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <section className={'sectionForm'}>
      <MyForm />
      <Form />
    </section>
  </React.StrictMode>
);
