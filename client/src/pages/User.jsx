
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';

const User = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        birthday: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

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
                setError('');
                toast.success("cập nhật thông tin thành công")
            })
            .catch(error => {
                console.error(error);
                setError('Error updating user. Please try again3.');
            });
    };
    return (
        <>
            <div className='info-user'>
                <div className="title">
                    <span>Thông tin tài khoản: {form.username}</span>
                </div>
                <div className="form-add">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="row-form">
                            <label>
                                <input className="input" type="text" name="name" value={form.name} onChange={handleChange}
                                    placeholder="" required />
                                <span>Họ tên</span>
                            </label>
                            <label>
                                <input className="input" type="date" name="birthday" value={form.birthday} onChange={handleChange}
                                    placeholder="" required />
                                <span>Ngày sinh</span>
                            </label>
                        </div>
                        <div className="row-form">
                            <label>
                                <input className="input" type="email" name="email" value={form.email} onChange={handleChange}
                                    placeholder="" required />
                                <span>Email</span>
                            </label>
                            <label>
                                <input className="input" type="text" name="phone" value={form.phone} onChange={handleChange}
                                    pattern="[0-9]{9,11}" placeholder="" required />
                                <span>Số điện thoại</span>
                            </label>
                        </div>
                        <div className="row-form">
                            <label>
                                <input className="input" type="text" name="username" value={form.username} onChange={handleChange}
                                    readOnly placeholder="" required pattern=".{5,50}" title="Tài khoản dài 5->50 ký tự" />
                                <span className="inp-adm">Tài khoản</span>
                            </label>
                            <label>
                                <input className="input" type="password" name="password" value={form.password} onChange={handleChange}
                                    placeholder="" required pattern=".{6,150}" title="Mật khẩu 6->50 ký tự" />
                                <span>Mật khẩu</span>
                            </label>
                        </div>
                        <div className="row-formbtn">
                            <button className="submit" type="submit">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default User;