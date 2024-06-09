import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";

const ShowBill = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const [searchTerm, setSearchTerm] = useState('');
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(5);
    const fetchBill = () => {
        api.get('/shoporder', {
            params: { search: searchTerm }
        })
            .then(response => {
                setBills(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        fetchBill();
    }, [searchTerm]);
    const handleChange = (shop_orders_id) => (e) => {
        const { name, value } = e.target;
        api.put(`shoporder/${shop_orders_id}`, {
            status_order: value
        })
            .then(() => {
                fetchBill();
                toast.success('cập nhật trạng thái đơn hàng thành công');
            })
            .catch(error => {
                console.error(error);
                toast.error('lỗi cập nhật trạng thái đơn hàng');
            });

    };
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = bills.slice(indexOfFirstUser, indexOfLastUser);
    const [stt, setStt] = useState(0);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStt((pageNumber - 1) * usersPerPage);
    };
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    return (
        <>
            <div className="title">
                <span>Hoá đơn</span>
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

                <div className='bill-page'>
                    <div className='container'>
                        {currentUsers.map(bill => (
                            <>
                                <table className='item-bill' key={bill.shop_orders_id}>
                                    <caption>Họ tên :{bill.full_name}  -- Ngày mua:{bill.date_order}</caption>
                                    <caption>Email :{bill.email}  -- Số điện thoại:{bill.phone}</caption>
                                    <caption>Địa chỉ :{bill.address}</caption>
                                    <caption>Tổng tiền:{formatCurrency(bill.total_prices)} --
                                        Trạng thái:{bill.status_order === "Huỷ" ? "Huỷ" : <>
                                            <select name="status_order" onChange={handleChange(bill.shop_orders_id)}>
                                                <option value={bill.status_order}>{bill.status_order}</option>
                                                <option value="Đang giao">Đang giao</option>
                                                <option value="Hoàn Thành">Hoàn Thành</option>
                                                <option value="Từ chối">Từ chối</option>
                                            </select>
                                        </>}
                                    </caption>
                                    <tr>
                                        <th className='item'>Tên sản phẩm</th>
                                        <th className='item'>Ảnh</th>
                                        <th className='item'>Số lượng</th>
                                        <th className='item'>Đơn giá</th>
                                    </tr>
                                    {bill.orderdetails.map(billdetails => (
                                        <>
                                            <tr key={billdetails.shop_order_details_id}>
                                                <td className='item'>{billdetails.name_product}</td>
                                                <td className='item'><img width='100px' src={urlImage + billdetails.image} alt="" /></td>
                                                <td className='item'>{billdetails.total_product}</td>
                                                <td className='item'>{formatCurrency(billdetails.prices)}</td>
                                            </tr>

                                        </>
                                    ))}

                                </table>
                            </>
                        ))}
                        <Pagination
                            usersPerPage={usersPerPage}
                            totalUsers={bills.length}
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
export default ShowBill;