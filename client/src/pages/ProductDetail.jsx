import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import Slider from 'react-slick';
import { useParams } from "react-router-dom";
import UserContext from '../UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost/web_BanHang/server/public';
const ProductDetail = () => {
    const { user, setUser } = useContext(UserContext);
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const { id } = useParams();
    const [brands, setBrands] = useState(null);
    const [categories, setCategories] = useState(null);
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
    const [listproducts, setlistProducts] = useState([]);

    useEffect(() => {
        api.get('/getproduct')
            .then(response => {
                setlistProducts(response.data);
            })
            .catch(error => {
                console.error(" error fetching the latest products!", error);
            });
    }, []);
    const slideProductDetail = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
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
    const settingSlide2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
                    dots: true
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
            toast.error("Phải đăng nhập để thực hiện chức năng này")
            return;
        }
        try {
            if (product.quantity > 1) {
                api.post('/add-item', {
                    users_id: user.users_id,
                    products_id: product.products_id,
                    name_product: product.name,
                    prices: product.prices,
                    image: product.image,
                    total_product: product.quantity,
                    total: 1
                });
                toast.success("thêm sản phẩm vào giỏ hàng thành công");
            } else {
                toast.error("Sản phẩm đã hết hàng");
            }

        } catch (error) {
            toast.success("Thêm sản phẩm vào giỏ hàng thất bại");
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            <div className='product-detail'>
                <div className='container'>
                    <div className='content-left'>
                        <div className='img-product'>
                            <Slider {...slideProductDetail} className='slide-category'>
                                <img className='item-mg' src={urlImage + product.image} alt={product.name} />
                                <img className='item-mg' src={urlImage + product.image} alt={product.name} />
                                {product.galeries.map((galeries, index) => (
                                    <>
                                        <img key={index} className='item-img' src={urlImage + galeries.thumbnail} />
                                    </>
                                ))}
                            </Slider>
                        </div>

                        <div className='details-product'>
                            <h3>Thông số kỹ thuật :</h3>
                            {product.details.map((detail, index) => (
                                <>
                                    <div key={index} className='item-detail'>
                                        <span> {detail.name} :{detail.description}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='item-product'>
                            <h3>{product.name}</h3>
                            <p className='price'>{formatCurrency(product.prices)}</p>

                            {categories === null ? "" :
                                <> <p>Danh mục :{categories.category_name}</p></>
                            }
                            {brands === null ? "" :
                                <> <p>{brands.name} tại : {brands.address}</p> </>
                            }
                            <p>Số lượng hàng trong kho: {product.quantity}</p>
                            <div className='add-card' onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</div>
                            <h3>Thông tin mô tả :</h3>
                            <span>{product.description}</span>
                        </div>

                    </div>
                </div>
                <div className="product-new">
                    <div className='container-product-new'>
                        <div className="text-center wow fadeInUp" >
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Sản phẩm</h5>
                        </div>
                        <h2 className="title-listproduct">Sản phẩm mới</h2>
                        <Slider {...settingSlide2}>
                            {listproducts.map(productlist => (
                                <div className='item-product' data-aos="fade-up">
                                    <li key={productlist.products_id}>
                                        <img src={urlImage + productlist.image} alt={productlist.name} />
                                        <h3>{productlist.name}</h3>
                                        <p>{formatCurrency(productlist.prices)}</p>
                                        <div className='link-productdetail'>
                                            <Link to={`/productdetail/${productlist.products_id}`} onClick={handleScrollToTop}>Chi tiết</Link>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </Slider>
                    </div>

                </div>
            </div >
        </>
    )
}
export default ProductDetail;