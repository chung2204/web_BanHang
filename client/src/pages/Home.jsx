import Slider from 'react-slick';
import React, { useEffect, useState } from 'react';
import api from "../api";
import { Link } from "react-router-dom";
const Home = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const settingSlide = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/getproduct')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(" error fetching the latest products!", error);
            });
    }, []);
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    return (
        <>
            <div className="home-container">
                <div className="design-banner">
                    <div className="banner--desktop">
                        <img width="800" height="500" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="1000" src="https://mikotech.vn/wp-content/themes/mikotech/assets/images/home/2022-12-06/Miko%20Tech%20-%20APP%20ch%E1%BB%A5p%20%E1%BA%A3nh.webp" alt="banner" data-ll-status="loaded" />
                    </div>
                    <div className="design-banner-info">
                        <div className="design-banner-title" data-aos="fade-left" data-aos-duration="1000" data-aos-once="true" data-aos-delay="1000"> <b>MiniStore</b></div>
                        <div className="design-banner-description " data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="1000">Website bán lẻ điện thoại di động tốt nhất thị trường</div>
                    </div>
                </div>
                <div className="content-about">
                    <div className="website__left">
                        <div className="element-website__left"></div>
                        <div className="website__left__content" data-delay="0.5">
                            <div className="website__title">MiniStore</div>
                            <div className="website__desc" data-aos="fade-up">
                                Từ sau đại dịch, tôi nhận thức được rằng một website bán hàng là điều cần thiết cho việc phát triển
                                kinh doanh hiện nay. Vì vậy, tôi đã nhanh chóng xây dựng website MiniStore để phục vụ nhu cầu mua sắm điện thoại của khác hàng,
                                khác biệt hơn so với những gian hàng online khác. Đơn vị đã không chỉ hỗ trợ nhiệt tình mà còn hướng dẫn  chu đáo.
                                Hơn nữa, những giải pháp Marketing tổng thể của đơn vị như: branding,
                                sáng tạo nội dung, quảng cáo đa nền tảng,... cũng làm nhều người biết đến MiniStore. Chỉ trong 1 năm triển khai
                                bán hàng trên website mà shop tôi đã có lượng đơn đặt hàng tăng vượt trội, chạm mốc trên 1000 đơn 1 tháng.
                            </div>
                        </div>
                    </div>
                    <div className="website__right">
                        <div className="swiper-slide " >
                            <div className="website-items">
                                <img width="420" height="280" data-aos="fade-right" src="https://i.pinimg.com/564x/ff/0d/59/ff0d590cfc70e6e02c39ec4422710deb.jpg" alt="" data-ll-status="loaded" className="entered lazyloaded" />
                            </div>
                            <div className="website-items">
                                <img width="420" height="280" data-aos="fade-up" alt="" className="entered lazyloaded" src="https://i.pinimg.com/564x/be/4b/f9/be4bf9033f590e001a0a931fa6c6beea.jpg" data-ll-status="loaded" />
                            </div>
                        </div>
                        <div className="swiper-slide" >
                            <div className="website-items">
                                <img width="420" height="280" data-aos="fade-left" src="https://i.pinimg.com/564x/1b/ca/0d/1bca0dd0cb1b69f74db6f330c8354af1.jpg" alt="" data-ll-status="loaded" className="entered lazyloaded" />
                            </div>
                            <div className="website-items">
                                <img width="420" height="280" data-aos="fade-up" alt="" className="entered lazyloaded" src="https://i.pinimg.com/564x/58/d0/5c/58d05c0184743b7e191e9cac3dfa19a9.jpg" data-ll-status="loaded" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-new">
                    <div className='container'>
                        <div className="text-center wow fadeInUp" >
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Sản phẩm</h5>
                        </div>
                        <h1 className="title-listproduct">Sản phẩm mới</h1>
                        <Slider {...settingSlide}>
                            {products.map(product => (
                                <div className='item-product' data-aos="fade-up">
                                    <li key={product.id}>
                                        <img src={urlImage + product.image} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p>{formatCurrency(product.prices)}</p>
                                        <div className='link-productdetail'>
                                            <Link to={`productdeatils/${product.id}`}>Chi tiết</Link>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </Slider>

                        <h1 className="title-listproduct">Sản phẩm mới</h1>
                        <Slider {...settingSlide}>
                            {products.map(product => (
                                <div className='item-product' data-aos="fade-up">
                                    <li key={product.id}>
                                        <img src={urlImage + product.image} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p>Price: {product.prices}</p>
                                        <Link to={`productdeatils/${product.id}`}>Chi tiết</Link>
                                    </li>
                                </div>
                            ))}
                        </Slider>
                        <div className='link-allproduct'>
                            <Link to={`product`}>Xem tất cả sản phẩm</Link>
                        </div>
                    </div>

                </div>
                <div className="team-design">
                    <div className="container">
                        <div className="text-center wow fadeInUp" >
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
                            <h1 className="mb-5">designed by</h1>
                        </div>
                        <div className="info">
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" >
                                <div className="team-item text-center rounded overflow-hidden">
                                    <h5 className="mb-0">Đỗ Thành Chung</h5>
                                    <p>Design</p>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path></svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <h5 className="mb-0">Đỗ Thành Chung</h5>
                                    <p>Design</p>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path></svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <h5 className="mb-0">Đỗ Thành Chung</h5>
                                    <p>Design</p>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path></svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <h5 className="mb-0">Đỗ Thành Chung</h5>
                                    <p>Design</p>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
                                        <a className="btn btn-square btn-primary mx-1" href=""><svg width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path></svg></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Home;