import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import food from '../../assets/food.png'
import mypic from '../../assets/mypic.jpg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={food} alt="" />
      <span className='admin'>ADMIN MENU</span>
      <img className='profile' src={mypic} alt="" />
    </div>
  )
}

export default Navbar
