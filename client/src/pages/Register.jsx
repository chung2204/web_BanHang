import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from "../api";
import { NavLink } from "react-router-dom";
const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        password: '',
        repassword: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password === userData.repassword) {
            try {
                await api.post('/users', userData);
                toast.success('Đăng ký thành công');
                setUserData({
                    name: '',
                    username: '',
                    password: '',
                    repassword: '',

                });
            } catch (error) {
                toast.error(`Tài khoản đã tồn tại`);
            }
        } else {
            toast.error("Mật khẩu không chính xác");
        }
    }

    return (
        <>
            <div className='form-register'>
                <form onSubmit={handleSubmit} className="form" >
                    <p class="title">Đăng ký </p>
                    <div className="row-form">
                        <label>
                            <input className="input" type="text" name="name" value={userData.name} onChange={handleChange}
                                placeholder="" required />
                            <span>Họ tên</span>
                        </label>
                    </div>

                    <div className="row-form">
                        <label>
                            <input className="input" type="text" name="username" value={userData.username} onChange={handleChange}
                                placeholder="" required pattern=".{5,50}" title="Tài khoản dài 5->50 ký tự" />
                            <span>Tài khoản</span>
                        </label>
                    </div>
                    <div className="row-form">
                        <label>
                            <input className="input" type="password" name="password" value={userData.password} onChange={handleChange}
                                placeholder="" required pattern=".{6,50}" title="Mật khẩu 6->50 ký tự" autoComplete="new-password" />
                            <span>Mật khẩu</span>
                        </label>
                    </div>
                    <div className="row-form">
                        <label>
                            <input className="input" type="password" name="repassword" value={userData.repassword} onChange={handleChange}
                                placeholder="" required pattern=".{6,50}" title="Mật khẩu 6->50 ký tự" autoComplete="new-password" />
                            <span>Nhập lại mật khẩu</span>
                        </label>
                    </div>
                    <div style={{ textAlign: 'center', color: 'black' }}> Bạn đã có tài khoản?<NavLink to="/login" > Đăng nhập ngay</NavLink> </div>
                    <div className="row-formbtn">
                        <button className="submit" type="submit">Đăng ký</button>
                    </div>

                </form >
            </div >
        </>

    );
}

export default Register;