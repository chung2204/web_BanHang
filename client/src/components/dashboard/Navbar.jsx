import { NavLink } from "react-router-dom";
import ic_analytics from '../../assets/icon/ic_analytics.svg';
import ic_cart from '../../assets/icon/ic_cart.svg';
import ic_disabled from '../../assets/icon/ic_disabled.svg';
import ic_bill from '../../assets/icon/ic_bill.svg';
import ic_feedback from '../../assets/icon/ic_feedback.svg';
import ic_category from '../../assets/icon/ic_category.svg';
import ic_user from '../../assets/icon/ic_user.svg';
import ic_brand from '../../assets/icon/ic_brand.svg';
import avt from '../../assets/image/avatar_25.jpg';
const Navbar = (props) => {
    return (
        <>
            <ul className="nav-dashboard">
                <li>
                    <NavLink to="/admin" className="nav-dash3" >
                        <img src={avt} alt="" /> <p>Admin</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin" className="nav-dash nav-dash2" >
                        <img src={ic_analytics} alt="" /><p>  dashbroad</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showuser" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_user} alt="" /><p> Người dùng</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showproduct" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_category} alt="" /><p> Danh mục</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showproduct" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_brand} alt="" /><p> Thương hiệu</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showproduct" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_cart} alt="" /><p> Sản phẩm</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showproduct" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_bill} alt="" /><p> Hoá Đơn</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="showproduct" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_feedback} alt="" /><p>Phản hồi</p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/" className={({ isActive }) => "nav-dash" + (isActive ? ' act-nav-dashboard' : '')} >
                        <img src={ic_disabled} alt="" /><p>Exit</p>
                    </NavLink>
                </li>
            </ul>
        </>
    )
}
export default Navbar;