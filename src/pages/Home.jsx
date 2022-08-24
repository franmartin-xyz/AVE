import React from 'react'
import { getAuth,singOut } from 'firebase/auth'
import { Main, Navbar, Footer } from '../components';
const home = () => {
    const auth = getAuth();
  return (
    <div>
        Home
    </div>
  )
}

export default home