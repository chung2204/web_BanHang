import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import Slider from 'react-slick';
import { Link, useParams } from "react-router-dom";
import UserContext from '../UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost/web_BanHang/server/public';
const ProductDetail = () => {
    const { user, setUser } = useContext(UserContext);
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const { id } = useParams();
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        prices: '',
        quantity: '',
        brands_id: '',
        product_categories_id: '',
        details: [{ name: '', description: '' }],
        galeries: [{ thumbnail: null, description: '' }],
    });
    useEffect(() => {
        if (id) {
            api.get(`/product/${id}`).then((response) => {
                setProduct(response.data);
            });
        }
    }, [id]);
    useEffect(() => {
        if (product.brands_id) {
            api.get(`/brand/${product.brands_id}`)
                .then(response => {
                    setBrands(response.data);
                })
                .catch(error => {
                    console.error('Error fetching brands:', error);
                });
        }
    }, [product.brands_id]);
    useEffect(() => {
        if (product.product_categories_id) {
            api.get(`/categories/${product.product_categories_id}`)
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, [product.product_categories_id]);
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const handleAddToCart = async (product) => {
        if (!user) {
            alert('Please login first');
            return;
        }
        try {
            const response = await api.post('/add-item', {
                users_id: user.users_id,
                products_id: product.products_id,
                name_product: product.name,
                prices: product.prices,
                image: product.image,
                total_product: product.quantity,
                total: 1
            });
        } catch (error) {
            console.error('Failed to add item to cart', error);
        }
    };
    return (
        <>
            <div className='product-detail'>
                <div className='container'>
                    <div className='item-product' data-aos="fade-up">
                        <li key={product.products_id}>
                            <h3>{product.name}</h3>
                            <h3>{product.description}</h3>
                            <h3>{product.prices}</h3>
                            <h3>{product.quantity}</h3>
                            {/* {brands.name &&
                                <> <h3>{brands.name} with {brands.name}</h3> </>
                            }
                            {categories.category_name &&
                                <> <h3>{categories.category_name}</h3></>
                            } */}

                            <p>{formatCurrency(product.prices)}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </li>
                    </div>
                    <div className='details-product'>
                        {product.details.map((detail, index) => (
                            <>
                                <div key={index} className='item-detail'>
                                    <span>detail{">>"}</span> {detail.name} <br />
                                    <span>mo ta {">>"}</span> {detail.description}
                                </div>
                            </>
                        ))}
                    </div>
                    <div className='img-product'>
                        <img className='item-mg' src={urlImage + product.image} alt={product.name} />
                        {product.galeries.map((galeries, index) => (
                            <>
                                <img key={index} className='item-img' src={urlImage + galeries.thumbnail} />
                            </>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
export default ProductDetail;