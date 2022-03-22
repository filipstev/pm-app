import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminUsers from '../components/AdminUsers/AdminUsers';
import Categories from '../components/Categories/Categories';
import AdminHeader from '../components/Header/AdminHeader';

const AdminRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <AdminHeader />
        <div
          style={{ width: '100%', height: '4.5em' }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<AdminUsers />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AdminRoutes;
