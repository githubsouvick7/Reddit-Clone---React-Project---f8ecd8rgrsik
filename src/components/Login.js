import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './login.css'
import Details from "./Details";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [showDiv, setShowDiv] = useState(false);

    const handleButtonClick = () => {
        setShowDiv(!showDiv);
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <div className="login">{
                isAuthenticated ? (
                    <div className="setuser" onClick={handleButtonClick}>
                        {showDiv ? (<Details />) : (<i class="fa-solid fa-user"></i>)}
                    </div>
                ) : (
                    <button className='btn' onClick={() => loginWithRedirect()}>
                        Login
                    </button>
                )}
            </div>
        </>
    )
};


export const Details = () => {
    const { user, isAuthenticated } = useAuth0();
    const { logout } = useAuth0();
    return (
        <>
            <div className="profile">
                <div className="item" >
                    {isAuthenticated && (
                        <div className="box">
                            <img width={50} src={user.picture} alt={user.name} />
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <button className='btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


export default LoginButton;