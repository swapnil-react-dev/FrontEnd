import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { constants } from '../../config/constants';

export const PrivateRoute = () => {

  const loginData = localStorage.getItem('loginUser');
  const loginInfor = JSON.parse(loginData);
  // const loginUser = loginInfor.userInfo;

  const auth = loginInfor.userInfo;

  return loginData ? <Outlet /> : <Navigate to="/" />;

};