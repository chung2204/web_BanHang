import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../../api";

function UpdateUser() {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        birthday: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    useEffect(() => {
        api.get(`/users/${id}`)
            .then(response => {
                setForm(response.data);
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching user data. Please try again.');
            });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/users/${id}`, form)
            .then(() => {
                navigate('/admin/showUser');
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError('Error updating user. Please try again3.');
            });
    };

    return (
        <div>
            <h1>Edit User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        value={form.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default UpdateUser;