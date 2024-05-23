import { Link, NavLink } from "react-router-dom";
const Header = (props) => {
    return (
        <>
            <nav>
                <NavLink to="/" >Home    |</NavLink>
                <NavLink to="/user" >login</NavLink>
            </nav>

        </>
    )
}
export default Header;