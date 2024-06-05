import { NavLink } from "react-router-dom";
import UserContext from "../../UserContext";
import React, { useContext } from 'react';

const Header = () => {
    const { user, handleLogout } = useContext(UserContext);

    return (
        <>
            <nav>
                <NavLink to="/" >Home    |</NavLink>

                <NavLink to="register" >register   |</NavLink>

                {user ? (
                    <div>
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                        {user.name === "Admin" ? <NavLink to="admin" >dashbroad    |</NavLink> : ""}
                    </div>
                ) : (
                    <NavLink to="login" >login   |</NavLink>
                )}

            </nav>

        </>
    )
}
export default Header;