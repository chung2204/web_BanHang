import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ShowUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        birthday: '',
        email: '',
        phone: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost/web_BanHang/server/public/users', userData);
            alert('User added successfully!');
            // Reset form after successful submission
            setUserData({
                name: '',
                birthday: '',
                email: '',
                phone: '',
                username: '',
                password: ''
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('loi');
            }
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
                <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} placeholder="Birthday" required />
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" required />
                <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default ShowUser;