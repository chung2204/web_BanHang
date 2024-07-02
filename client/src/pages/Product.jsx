import React, { useState, useEffect } from 'react';
import api from '../api';
import Slider from 'react-slick';
import { Link } from "react-router-dom";

const Product = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(8);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('new');
    const [searchQuery, setSearchQuery] = useState('');
    const [clickPrice, setClickPrice] = useState('');
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [selectCategory, sortOption, searchQuery, clickPrice]);
    const fetchProducts = async () => {
        try {
            let url = `/getproductbycategory?sort=${sortOption}&search=${searchQuery}&price=${clickPrice}`;
            if (selectCategory !== null && selectCategory !== 'all') {
                url = `/getproductbycategory/${selectCategory}?sort=${sortOption}&search=${searchQuery}&price=${clickPrice}`;
            }

            const response = await api.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
    };
    const slideProductPage = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            }
        ]
    };
    const fetchCategories = () => {
        api.get('/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {

            });
    };
    const handleOnclick = (category_id) => {
        setSelectCategory(category_id);
    }
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = products.slice(indexOfFirstUser, indexOfLastUser);
    const [stt, setStt] = useState(0);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStt((pageNumber - 1) * usersPerPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const styleAcitive = {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#32dbdb',
        border: '1px solid #32dbdb'
    };
    const stylereAcitive = {
        color: "#32dbdb",
        backgroundColor: 'white'
    };
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }
    const handleClickPrice = (e) => {
        setClickPrice(e.target.value);
    }
    if (loading) {
        return <div style={{ width: "100%", textAlign: "center" }}>Loading...</div>;
    }
    return (
        <>
            <div className='product-page'>
                <div className='container'>
                    {categories ?
                        <Slider {...slideProductPage} className='slide-category'>
                            <div key={'all'}>
                                <p style={selectCategory === "all" ? styleAcitive : stylereAcitive} className='item-category' onClick={() => handleOnclick('all')}>Tất cả</p>
                            </div>
                            {categories.map(category => (
                                <div key={category.product_categories_id}>
                                    <p style={selectCategory === category.product_categories_id ? styleAcitive : stylereAcitive} className='item-category' onClick={() => handleOnclick(category.product_categories_id)}>{category.category_name}</p>
                                </div>
                            ))}
                        </Slider>
                        : ""}
                    <div className='product-items'>
                        <div className='search'>
                            <div className='container'>
                                <h2>Tất cả sản phẩm</h2>
                                <input className='search-product' type="text" placeholder='Tìm kiếm sản phẩm' onChange={handleSearchChange} />
                                <div> Sắp xếp
                                    <select name="" id="" onChange={handleSortChange}>
                                        <option selected value="new">Hàng mới</option>
                                        <option value="bestseller">Bán chạy</option>
                                        <option value="price_asc">Giá thấp đến cao</option>
                                        <option value="price_desc">Giá cao đến thấp</option>
                                    </select>
                                </div>
                                <div className='filter-price'> Giá từ: <br />
                                    <input defaultChecked name="price" type="radio" value="all" onClick={handleClickPrice} />
                                    <label for="html">Tất cả</label> <br />
                                    <input name="price" type="radio" value="under3milliom" onClick={handleClickPrice} />
                                    <label for="html">Dưới 3 triệu</label> <br />
                                    <input name="price" type="radio" value="3to5million" onClick={handleClickPrice} />
                                    <label for="css">Từ 3 triệu đến 5 triệu</label> <br />
                                    <input name="price" type="radio" value="5to10million" onClick={handleClickPrice} />
                                    <label for="javascript">Từ 5 triệu đến 10 triệu</label> <br />
                                    <input name="price" type="radio" value="over10million" onClick={handleClickPrice} />
                                    <label for="javascript">Trên 10 triệu</label>
                                </div>
                                <img style={{ width: "100%", height: "auto" }} src="https://salt.tikicdn.com/ts/tka/49/f0/15/c4c11176b3712a417b0d1742695f3569.png" alt="" />
                            </div>
                        </div>
                        <div className='product'>
                            {currentUsers.map(product => (
                                <>
                                    <div key={product.products_id} className='item-product' data-aos="fade-up">
                                        <div className='container'>
                                            <img src={urlImage + product.image} alt={product.name} />
                                            <h3 style={{ marginBottom: "0" }}>{product.name}</h3>
                                            <span>Đã bán: {product.sold_product}</span>
                                            <p>{formatCurrency(product.prices)}</p>
                                            <div className='link-productdetail'>
                                                <Link to={`/productdetail/${product.products_id}`} onClick={handleScrollToTop}>Chi tiết</Link>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <Pagination
                        usersPerPage={usersPerPage}
                        totalUsers={products.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div >
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
export default Product;