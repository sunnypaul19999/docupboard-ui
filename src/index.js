import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FileVaultUI from './component/FileVaultUI';
import Login from './component/Login';

import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom";

// function App() {

//   const nav = useNavigate();

//   useEffect(() => {
//     nav('user/login', { replace: true });
//   }, []);

//   return (<Outlet />);
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/view/files' element={<FileVaultUI />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);