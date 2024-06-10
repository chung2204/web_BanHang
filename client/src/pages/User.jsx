
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import UserContext from "../UserContext"

const User = () => {
    const { setUser } = useContext(UserContext);
    const { id } = useParams();
    const [formAdd, setFormAdd] = useState(false);
    const [pass, setPass] = useState({
        password: '',
        repassword: ''
    });
    const [form, setForm] = useState({
        name: '',
        birthday: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    useEffect(() => {
        api.get(`/users/${id}`)
            .then(response => {
                setForm(response.data);

            })
            .catch(error => {
                console.error(error);

            });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleChangePass = (e) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/updateinfo/${id}`, form)
            .then(() => {
                toast.success("Cập nhật thông tin thành công")
                setUser(form);
            })
            .catch(error => {
                console.error(error);
                toast.error('Cập nhật thông tin thất bại');
            });
    };
    const toggleFormAdd = () => {
        setFormAdd(prevFormAdd => !prevFormAdd);
    };

    const rePass = async (e) => {
        e.preventDefault();
        try {
            api.put(`/updatepass/${id}`, {
                password: pass.repassword,
                repassword: pass.password
            });
            setUser(null);
            localStorage.removeItem('user');
            navigate('/');
        } catch {
            toast.error("Mật khẩu không chính xác")
        }
    };
    return (
        <>
            <div className='info-user'>
                {formAdd &&
                    <div className="form-addcate">
                        <form className="form" onSubmit={rePass}>
                            <h3>Đổi mật khẩu</h3>
                            <div className="row-form">
                                <label>
                                    <input
                                        className="input"
                                        type="password"
                                        name='password'
                                        onChange={handleChangePass}
                                        required minLength={6}
                                    />
                                    <span>Mật khẩu cũ</span>
                                </label>
                            </div>
                            <div className="row-form">
                                <label>
                                    <input
                                        className="input"
                                        type="password"
                                        name='repassword'
                                        onChange={handleChangePass}
                                        required minLength={6}
                                    />
                                    <span>Mật khẩu mới</span>
                                </label>
                            </div>
                            <div className="row-formbtn">
                                <button className="submit" type="submit">Đổi mật khẩu</button>
                                <button className="submit" onClick={toggleFormAdd}>Huỷ</button>
                            </div>
                        </form>
                    </div>
                }
                <div className="title" >
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
                                    placeholder="" required />
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
                                <input className="input" type="password" name="password" readOnly value={form.password} onChange={handleChange}
                                    placeholder="" required pattern=".{6,150}" title="Mật khẩu 6->50 ký tự" />
                                <span>Mật khẩu</span>
                            </label>
                        </div>
                        <div className="row-formbtn">
                            <button className="submit" type="submit">Cập nhật</button>
                            <div className="submit" onClick={toggleFormAdd}>Đổi mật khẩu</div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default User;