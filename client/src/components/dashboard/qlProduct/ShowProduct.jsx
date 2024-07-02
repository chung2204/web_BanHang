import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";

const ShowProduct = () => {
    const urlImage = process.env.REACT_APP_API_BASE_URL + "/";
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(10);
    useEffect(() => {
        fetchCategories();
    }, [searchTerm]);
    const fetchCategories = () => {
        api.get('/product', {
            params: { search: searchTerm }
        })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = products.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const deleteProduct = (id, username) => {
        if (window.confirm(`Bạn có chắc muốn xoá sản phẩm ${username}`)) {
            api.delete(`/product/${id}`)
                .then(() => {
                    setProducts(products.filter(products => products.products_id !== id));
                    toast.success(`Xoá sản phẩm ${username} thành công`);
                })
                .catch(error => {
                    console.error(error);

                    toast.error(` Lỗi xoá sản phẩm ${username}`);
                });
        }
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    return (
        <>
            <div className="title">
                <span>Sản phẩm({products.length})</span>

                <Link className="link-add" to="/admin/showProduct/addProduct">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                        className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"></path>
                    </svg>
                    Thêm sản phẩm</Link>
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
                            <option defaultValue={10}>10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                <div className="show-product">
                    {currentUsers.map((product) => (
                        <div key={product.products_id} className="product">
                            <img src={urlImage + product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p style={{ color: 'red', fontSize: "18px", fontWeight: "700", margin: "0" }}> {formatCurrency(product.prices)}</p>
                            <p>Số lượng: {product.quantity}</p>
                            <p style={{ marginTop: "0" }}>Đã bán: {product.sold_product}</p>
                            <div className="ctr">
                                <div className="btn-update"> <Link to={`/admin/showProduct/updateProduct/${product.products_id}`}>chi tiết</Link></div>
                                <button onClick={() => deleteProduct(product.products_id, product.name)} className="btn-delete"> xóa </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={products.length} // Tổng số người dùng sau khi lọc
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div >
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
export default ShowProduct;