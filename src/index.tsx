import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './index.css';
import App from './App';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Outlet/>}>
        <Route path='dashboard' element={<App />}/>
        <Route path='task/:taskId' element={<div>taskpage</div>} />
        <Route path='*' element={<div>404</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
