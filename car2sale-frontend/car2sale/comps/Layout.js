import React from 'react'
import { Navbar } from './Navbar'
import { useRouter } from "next/router";

const Layout = ({children}) => {

  const router = useRouter();
  const showNavbar = router.pathname === "/signin" || router.pathname === "/register" ? false : true;
  return (
    <div>
      {showNavbar && <Navbar/>}
      {children}
    </div>
  )
}

export default Layout