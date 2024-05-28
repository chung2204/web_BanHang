import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from "../../../api";
const AddUser = () => {
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
            await api.post('/users', userData);
            toast.success('thêm user thành công');
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
                console.log(error);
                toast.error(`Tài khoản đã tồn tại`);
            } else {
                setError('loi');
            }
        }
    };
    return (
        <>
            <div className="title">
                <span>Thêm người dùng</span>

                <Link className="link-add" to="/admin/ShowUser">
                    Quay lại</Link>
            </div>
            <div className="form-add">
                <form onSubmit={handleSubmit} className="form" style={{ width: '70%' }}>
                    <div className="row-form">
                        <label>
                            <input className="input" type="text" name="name" value={userData.name} onChange={handleChange}
                                placeholder="" required />
                            <span>Họ tên</span>
                        </label>
                        <label>
                            <input className="input" type="date" name="birthday" value={userData.birthday} onChange={handleChange}
                                placeholder="" required />
                            <span>Ngày sinh</span>
                        </label>
                    </div>
                    <div className="row-form">
                        <label>
                            <input className="input" type="email" name="email" value={userData.email} onChange={handleChange}
                                placeholder="" required />
                            <span>Email</span>
                        </label>
                        <label>
                            <input className="input" type="text" name="phone" value={userData.phone} onChange={handleChange}
                                placeholder="" required pattern="[0-9]{10}" />
                            <span>Số điện thoại</span>
                        </label>
                    </div>
                    <div className="row-form">
                        <label>
                            <input className="input" type="text" name="username" value={userData.username} onChange={handleChange}
                                placeholder="" required pattern=".{5,50}" title="Tài khoản dài 5->50 ký tự" />
                            <span>Tài khoản</span>
                        </label>
                        <label>
                            <input className="input" type="password" name="password" value={userData.password} onChange={handleChange}
                                placeholder="" required pattern=".{6,50}" title="Mật khẩu 6->50 ký tự" autoComplete="new-password" />
                            <span>Mật khẩu</span>
                        </label>
                    </div>
                    <div className="row-formbtn">
                        <button className="submit" type="submit">Thêm người dùng</button>
                    </div>

                </form>
            </div>
        </>
    )
}
export default AddUser;