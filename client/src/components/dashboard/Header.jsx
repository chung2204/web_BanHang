import { NavLink } from "react-router-dom";
import main_logo from "../../assets/image/main_logo.png";
const Header = (props) => {
    return (
        <>
            <NavLink to="/admin" ><img src={main_logo} alt="" /></NavLink>
        </>
    )
}
export default Header;