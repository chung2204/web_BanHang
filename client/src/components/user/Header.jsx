import { NavLink } from "react-router-dom";
import UserContext from "../../UserContext";
import React, { useContext, useEffect } from 'react';
import main_logo from "../../assets/image/main_logo.png";
import { toast } from 'react-toastify';

const Header = () => {
    const { user, handleLogout, shopCard } = useContext(UserContext);
    const handleOnclick = () => {
        toast.error("Phải đăng nhập để sử dụng giỏ hàng")
    }
    const getLastWord = (str) => {
        const words = str.split(" ");
        return words[words.length - 1];
    };

    useEffect(() => {

    }, []);
    return (
        <>
            <div className="header-container">
                <div className="logo">
                    <NavLink to="/" ><img src={main_logo} alt="" /></NavLink>
                </div>
                <nav className="main-menu">
                    <div className="menu-item"> <NavLink to="/" className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Trang chủ   </NavLink></div>
                    <div className="menu-item">  <NavLink to="product" className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Sản phẩm</NavLink></div>
                    <div className="menu-item">  <NavLink to="about" className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Giới thiệu</NavLink></div>
                    <div className="menu-item">  <NavLink to="contact" className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Liên hệ</NavLink></div>
                    {user ? (
                        <>
                            <div className="menu-item">
                                <span>Welcome, {getLastWord(user.name)}</span>
                                <ul>

                                    <li>  <NavLink to={`user/${user.users_id}`} className={({ isActive }) => "sub-menu-item" + (isActive ? ' act-nav' : '')}>Tài khoản</NavLink></li>
                                    <li>  <NavLink to={`bill/${user.users_id}`} className={({ isActive }) => "sub-menu-item" + (isActive ? ' act-nav' : '')}>Hoá đơn</NavLink></li>
                                    <li> {user.username === "Admin" ? <NavLink to="admin" className={"sub-menu-item"} >Quản trị</NavLink> : ""}</li>
                                    <li> <div onClick={handleLogout} className={"sub-menu-item"} >Đăng xuất</div></li>
                                </ul>
                            </div>
                            <div className="menu-item"> <NavLink to={`shoppingcard/${user.users_id}`} className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Giỏ hàng
                                {shopCard ? <>({shopCard.total_product ? shopCard.total_product : 0})</> : ("")}
                            </NavLink></div>
                        </>
                    ) : (
                        <>
                            <div className="menu-item">
                                <NavLink to="login" className={({ isActive }) => "nav-menu-item" + (isActive ? ' act-nav' : '')}>Đăng nhập</NavLink>
                                <ul>
                                    <li><NavLink to="register" className={({ isActive }) => "sub-menu-item" + (isActive ? ' act-nav' : '')}>Đăng ký</NavLink></li>
                                </ul>
                            </div>
                            <div className="menu-item" onClick={() => handleOnclick()}>Giỏ hàng</div>
                        </>

                    )}

                </nav>
            </div>
        </>
    )
}
export default Header;