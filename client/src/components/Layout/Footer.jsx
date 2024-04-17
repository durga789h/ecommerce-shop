import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-red-400 text-white p-7 w-full text-center'>
    <h1> All right reserve @ testcov </h1> 
    <ul style={{lineHeight:"22px"}}>
        <li>
            <Link to={"/about"}>About</Link>
            </li>
            <li>
            <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
            <Link to={"/policy"}>Privacy Policy</Link>
            </li>
        
    </ul>
    </div>
  )
}

export default Footer
