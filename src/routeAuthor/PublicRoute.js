import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLogin = !!sessionStorage.getItem("token");
  return isLogin ?  (alert("잘못된 경로입니다."),<Navigate to="/" />) : children;
};
export default PublicRoute;