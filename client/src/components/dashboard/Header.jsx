import { NavLink } from "react-router-dom";
const Header = (props) => {
    return (
        <>
            <nav>
                <NavLink to="/" >Home    |</NavLink>
                <NavLink to="/login" >login</NavLink>
            </nav>

        </>
    )
}
export default Header;