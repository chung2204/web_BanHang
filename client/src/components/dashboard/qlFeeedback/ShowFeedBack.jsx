

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";
import ic_delete from "../../../assets/icon/ic_delete.svg";

const ShowFeedBack = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [feedbacks, setfeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(5);
    const fetchFeedBack = () => {
        api.get('/feedback', {
            params: { search: searchTerm }
        })
            .then(response => {
                setfeedbacks(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        fetchFeedBack();
    }, [searchTerm]);

    const handleClick = (id) => {
        if (window.confirm(`Bạn có chắc muốn xoá feedback`)) {
            api.delete(`feedback/${id}`)
                .then(() => {
                    fetchFeedBack();
                    toast.success('Xoá phản hồi thành công')
                })
                .catch(error => {
                    console.error(error);
                    toast.error('lỗi Xoá phản hồi')
                });
        }
    }


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = feedbacks.slice(indexOfFirstUser, indexOfLastUser);
    const [stt, setStt] = useState(0);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStt((pageNumber - 1) * usersPerPage);
    };
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };
    return (
        <>
            <div className="title">
                <span>Phản hồi</span>
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
                            <option defaultValue={5}>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>

                <div className='feedback-page'>
                    <div className='container'>
                        {currentUsers.map(fb => (
                            <>
                                <div key={fb.id} className="item-feedback">
                                    <div className="info">
                                        <span>Từ:{fb.name}</span> <span>SĐT : {fb.phone}</span>  <span> Email : {fb.email}</span>
                                        <img className="icon-delete" onClick={() => handleClick(fb.id)} width="25px" src={ic_delete} alt="" />
                                    </div>
                                    <div className="contentfb">
                                        Nội dung:{fb.feedback}
                                    </div>

                                </div>
                            </>
                        ))}
                        <Pagination
                            usersPerPage={usersPerPage}
                            totalUsers={feedbacks.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}
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
export default ShowFeedBack;