import React, { useState, useEffect } from 'react';
import api from '../api';
import Slider from 'react-slick';
import { Link } from "react-router-dom";

const Product = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(8);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchCategories();
        const fetchProducts = async () => {
            try {
                if (selectCategory !== null && selectCategory !== 'all') {
                    const response = await api.get(`/getproductbycategory/${selectCategory}`);
                    setProducts(response.data);
                } else {
                    const response = await api.get(`/getproductbycategory`);
                    setProducts(response.data);
                }

            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };

        fetchProducts();
    }, [selectCategory]);
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
                        {currentUsers.map(product => (
                            <>
                                <div key={product.products_id} className='item-product' data-aos="fade-up">
                                    <div className='container'>
                                        <img src={urlImage + product.image} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p>{formatCurrency(product.prices)}</p>
                                        <div className='link-productdetail'>
                                            <Link to={`/productdetail/${product.products_id}`} onClick={handleScrollToTop}>Chi tiết</Link>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ))}
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