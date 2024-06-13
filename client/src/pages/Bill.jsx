import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const Bill = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const { id } = useParams();
    const [bill, setBill] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(5);
    const [showdetail, setShowdetail] = useState(false);
    const fetchBill = async () => {
        try {
            const response = await api.get(`/shoporder/${id}`);
            setBill(response.data);
        } catch (error) {
            console.error("There was an error fetching!", error);
        }
    };

    useEffect(() => {
        fetchBill();
    }, [id]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = bill.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleOnclick = (shop_orders_id) => {
        if (window.confirm(`Bạn có chắc muốn huỷ đơn hàng`)) {
            api.put(`shoporder/${shop_orders_id}`, {
                status_order: 'Huỷ'
            })
                .then(() => {
                    fetchBill();
                    toast.success('Huỷ hoá đơn thành công')
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    if (bill == null || Object.keys(bill).length === 0 || currentUsers == null || Object.keys(currentUsers).length === 0) {
        return <p style={{ width: "100%", textAlign: "center" }}>Bạn không có hoá đơn nào !</p>;
    }
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const convertedDate = (date) => {
        return format(new Date(date), 'dd-MM-yyyy');
    }
    const toggleDetail = (id) => {
        setShowdetail(id);
    };
    const hideDetail = () => {
        setShowdetail(false);
    };
    return (
        <>
            <div className='bill-page'>
                <div className='container'>
                    {currentUsers.map(bill => (
                        <>
                            <div key={bill.shop_orders_id} className='item-bill'>
                                <div className='title-bill'>
                                    <b>MiniStore</b>
                                    <span className='status-bill'> Trạng thái: {bill.status_order}</span>
                                </div>
                                {bill.orderdetails.map(billdetails => (
                                    <>
                                        <div key={billdetails.shop_order_details_id} className='item-billdetail'>

                                            <div className='img-product'>
                                                <img src={urlImage + billdetails.image} alt="" />
                                            </div>
                                            <div className='info-product'>
                                                <div className='name-product'>{billdetails.name_product}</div>
                                                <div className='total-product'> Số lượng: {billdetails.total_product}</div>
                                                <div className='price-product'>Giá: <span style={{ color: "red" }}>{formatCurrency(billdetails.prices)}</span></div>
                                            </div>
                                        </div>

                                    </>
                                ))}
                                <div className='total-price'>Tổng tiền: <span style={{ color: "red" }}>{formatCurrency(bill.total_prices)}</span> </div>
                                {showdetail === false ? <>
                                    <span className='status-bill' onClick={() => toggleDetail(bill.shop_orders_id)}>Xem chi tiết</span>
                                </> : <>
                                    {
                                        showdetail === bill.shop_orders_id ? <>
                                            <div className='info-ship'>
                                                <p>Thông tin giao hàng:</p>
                                                <div>Người nhận: {bill.full_name}  -- Số điện thoại: {bill.phone}</div>
                                                <div>Email: {bill.email}  -- Ngày mua: {convertedDate(bill.date_order)}</div>
                                                <div>Địa chỉ: {bill.address}</div>
                                                {bill.status_order === "Chờ duyệt" ? <><div className='btn-unbill' onClick={() => handleOnclick(bill.shop_orders_id)}>Huỷ đơn hàng</div></> : ""}
                                                <div className='status-bill' onClick={() => hideDetail()}>Ẩn bớt</div>
                                            </div>
                                        </> : <>
                                            <span className='status-bill' onClick={() => toggleDetail(bill.shop_orders_id)}>Xem chi tiết</span>
                                        </>
                                    }
                                </>
                                }
                            </div>
                            <hr />
                        </>
                    ))}
                    <Pagination
                        usersPerPage={usersPerPage}
                        totalUsers={bill.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />

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
                    <div key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </div>
                ))}
            </ul>
        </nav>
    );
};
export default Bill;