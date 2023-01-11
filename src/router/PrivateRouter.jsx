import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.register);
  return (
    <div> 
      {currentUser? <Outlet/>:<Navigate to="/login" replace />}
    </div>
  )
}

export default PrivateRouter
