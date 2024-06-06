import React, { useState, useContext } from 'react';
import api from "../api";
import { toast } from 'react-toastify';
import axios from 'axios';
import UserContext from '../UserContext';
import { NavLink, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost/web_BanHang/server/public';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', formData);
            const userData = response.data.user;
            setMessage(response.data.message);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/');
        } catch (error) {
            setMessage('Login failed');
            toast.error('Tài khoản hoặc mật khẩu không chính xác')
        }
    };

    return (
        <div className='form-register'>

            <form onSubmit={handleSubmit} className="form" >
                <p class="title">Đăng nhập </p>
                <div className="row-form">
                    <label>
                        <input className="input" type="text" name="username" value={formData.username} onChange={handleChange} required />
                        <span>Tài khoản</span>
                    </label>
                </div>
                <div className="row-form">
                    <label>
                        <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
                        <span>Mật khẩu</span>
                    </label>
                </div>
                <div style={{ textAlign: 'center', color: 'black' }}> Bạn chưa có tài khoản?<NavLink to="/register" > Đăng ký ngay</NavLink> </div>
                <div className="row-formbtn">
                    <button className="submit" type="submit">Đăng nhập</button>
                </div>
            </form>

        </div>
    );
};

export default Login;