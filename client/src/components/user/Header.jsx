import { NavLink } from "react-router-dom";
const Header = (props) => {
    return (
        <>
            <nav>
                <NavLink to="/" >Home    |</NavLink>
                <NavLink to="user" >login   |</NavLink>
                <NavLink to="admin" >dashbroad    |</NavLink>
            </nav>
        </>
    )
}
export default Header;