import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";
import ic_edit from "../../../assets/icon/ic_edit.svg";
import ic_delete from "../../../assets/icon/ic_delete.svg";
const ShowUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(5);

    useEffect(() => {
        fetchUsers();
    }, [searchTerm]);
    const fetchUsers = () => {
        api.get('/users', {
            params: { search: searchTerm }
        })
            .then(response => {
                setUsers(response.data);
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching users. Please try again.');
            });
    };
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const deleteUser = (id, username) => {
        if (window.confirm(`Bạn có chắc muốn xoá tài khoản ${username}`)) {
            api.delete(`/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user.users_id !== id));
                    setError(''); // Clear any previous error
                    toast.success(`Xoá tài khoản ${username} thành công`);
                })
                .catch(error => {
                    console.error(error);
                    setError('Lỗi xoá tài khoản');
                    toast.error(` Lỗi xoá tài khoản ${username}`);
                });
        }
    };
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="title">
                <span>Người dùng</span>

                <Link className="link-add" to="/admin/addUser">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                        className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"></path>
                    </svg>
                    Thêm người dùng</Link>
            </div>
            <div className="content">
                <div className="content-top">
                    <div className="search">
                        <img src={ic_search} alt="" />
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="perpage">
                        Hiển thị &nbsp;
                        <select value={usersPerPage} onChange={handleSelectChange}>
                            <option value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-1">Tài khoản</th>
                            <th> Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày sinh</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.users_id}>
                                <th className="col-1">{user.username}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{formatDate(user.birthday)}</td>
                                <th className=""><Link to={`/admin/updateUser/${user.users_id}`}><img src={ic_edit} alt="" /></Link> <span>&nbsp;&nbsp;/&nbsp;</span>
                                    <button onClick={() => deleteUser(user.users_id, user.username)}><img src={ic_delete} alt="" /></button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length} // Tổng số người dùng sau khi lọc
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>

        </>
    );
};
const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default ShowUser;