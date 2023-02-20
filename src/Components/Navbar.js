import React from 'react'
import './Navbar.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect, logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            <div className="navbar">
                <div className='logo'>
                    <img src="./logo.jpg" width={130} />
                    <div className="act">
                        <i className="fa-solid fa-house"></i> Home
                    </div>
                </div>
                <div className='search'>
                    <input type="text" placeholder='Search. . .' />
                </div>
                <div className='login'>
                    {
                        isAuthenticated ? (
                            <>
                                <button className='btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Log Out
                                </button>
                                <Tippy content={<div>
                                    {user.name} <br />
                                    {user.email}
                                </div>}>
                                    <div className="prof">
                                        <img src={user.picture} width={50} />
                                    </div>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <button className='btn' onClick={() => loginWithRedirect()}>
                                    Login
                                </button>
                                <Tippy content={<p>No User Found</p>}>
                                    <div className="prof">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                </Tippy>
                            </>
                        )
                    }
                    {/* <div className='login'>
                    <button className='btn'>Login</button>
                    <Tippy content={<p>User Not Found</p>}>
                        <div className="prof">
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </Tippy>*/}
                </div>
            </div>
        </>
    )
}

export default Navbar