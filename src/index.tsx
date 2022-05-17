import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Redirect from './components/Redirect';
import Dashboard from './routes/dashboard/Dashboard';
import TaskScreen from './routes/taskscreen/TaskScreen';
import Page404 from './routes/Page404';
import { registerTags } from './utils/BBCodes';

export const getRootElement = () => {
  return document.getElementById('root') as HTMLElement;
}

registerTags();

const root = ReactDOM.createRoot(
  getRootElement()
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Redirect to='/dashboard' replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='task'>
          <Route index element={<Redirect to='/' replace />} />
          <Route path=':taskId' element={<TaskScreen />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
