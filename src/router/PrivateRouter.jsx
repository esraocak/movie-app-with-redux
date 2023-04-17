import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.register);
  console.log({currentUser});

  return <> { currentUser? <Outlet/>:<Navigate to="/login" replace />}</>;
  
}

export default PrivateRouter
