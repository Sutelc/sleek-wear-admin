import React from 'react'
import './navbar.css'
import nav_logo from '../../assets/logo33.png'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="" className="nav-logo" />
        <img src={nav_profile} alt="" className="nav-profile" />

    </div>
  )
}

export default Navbar