import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRouter = () => {

  return (
    <div> 
      currentUser? <Outlet/>:<Navigate to="/login" />;
    </div>
  )
}

export default PrivateRouter
