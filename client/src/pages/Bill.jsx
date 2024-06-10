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
    return (
        <>
            <div className='bill-page'>
                <div className='container'>
                    {currentUsers.map(bill => (
                        <>
                            <table cellSpacing="1" cellPadding="0" className='item-bill' key={bill.shop_orders_id}>
                                <caption>Họ tên :{bill.full_name}  -- Ngày mua:{convertedDate(bill.date_order)}</caption>
                                <caption>Email :{bill.email}  -- Số điện thoại:{bill.phone}</caption>
                                <caption>Địa chỉ :{bill.address}</caption>
                                <caption>Tổng tiền:{formatCurrency(bill.total_prices)} -- Trạng thái:{bill.status_order}
                                    {bill.status_order === "Chờ duyệt" ? <> -- <span onClick={() => handleOnclick(bill.shop_orders_id)}>huỷ hoá đơn</span></> : ""}
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