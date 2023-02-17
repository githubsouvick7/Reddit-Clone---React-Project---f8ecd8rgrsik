import React from 'react'
import logo from '../logo.jpg'
import './Navbar.css'
import LoginButton from './Login'

const Navbar = () => {

    return (
        <>
            <div className="mainone">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="input">
                    <input type="text" placeholder='Search Reddit . . .' />
                </div>
                <div className="login">
                    <LoginButton />
                </div>
            </div>
        </>
    )
}

export default Navbar