import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
const ShowUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        api.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            api.delete(`/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user.users_id !== id));
                    setError(''); // Clear any previous error
                })
                .catch(error => {
                    console.error(error);
                    setError('Error deleting user. Please try again.');
                });
        }
    };
    return (
        <>
            <div className="title">
                <span>DetailUser</span>
                <Link to="/admin/addUser">them user</Link>
            </div>
            <ul>
                {currentUsers.map(user => (
                    <li key={user.id}>
                        {user.name}-
                        {user.birthday}-
                        {user.users_id}-
                        <Link to={`/admin/updateUser/${user.users_id}`}>Edit</Link>
                        <button onClick={() => deleteUser(user.users_id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
            />
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