import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import food from "../../assets/food.png"
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='footer-img' src={food} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quasi repellat tenetur est inventore eos repudiandae earum aut nam quibusdam possimus, libero ea debitis, dolor hic accusantium dolores! Animi, reiciendis.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+923154676984</li>
                <li>contac@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer
