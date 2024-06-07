import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';

const Footer = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        feedback: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/feedback', userData);
            toast.success('Gửi thông tin thành công');
            setUserData({
                name: '',
                email: '',
                phone: '',
                feedback: '',
            });
        } catch (error) {
            toast.error(`Gửi thông tin thất bại`);
        }
    }
    return (
        <>
            <div className="center-layout">
                <div className="footer__grid">
                    <div className="footer__col">
                        <div className="footer-mobile-hidden" id="footer-mobile-hidden-0">
                            <div className="footer-mobile-hidden--content">
                                <div className="footer__desc"><b>MiniStore</b> ra đời với sứ mệnh đồng hành và nâng tầm thương hiệu của bạn trên thị trường
                                    Internet. Chúng tôi giúp bạn phát triển với sự hỗ trợ của hệ sinh thái các giải pháp Marketing toàn diện. Đặc
                                    biệt với dịch vụ thiết kế website chuyên nghiệp tại MIKO TECH, bạn và doanh nghiệp bạn sẽ có bệ phóng vững
                                    chắc cho mọi hoạt động kinh doanh.</div>

                            </div>
                        </div>
                        <div className="footer__title mt-5-">Trụ sở chính
                        </div>
                        <div className="footer-mobile-hidden" id="footer-mobile-hidden-1">
                            <div className="footer-mobile-hidden--content">
                                <div><b>Địa chỉ: </b><a className="text-black" target="_blank" rel="nofollow noopener" href="https://www.google.com/maps">Tầng G, 485B Nguyễn Đình Chiểu, Phường 2, Quận 3, Thành phố Hồ Chí Minh, Việt Nam</a></div>
                                <div><b>Số điện thoại: </b>028 3636 8805 - 0909 326 456</div>
                                <div><b>Email: </b> chung220402@gmail.com
                                </div>
                                <div><b>Thời gian hoạt động: </b>Thứ 2 - Thứ 6 từ 8h30 - 17h30 <br />Thứ 7 từ 8h30 - 12h30</div>
                            </div>
                        </div>
                        <div className="footer-mobile-hidden">
                            <div className="footer__title mt-5-">Kết nối với chúng tôi</div>
                            <div className="d-flex flex-wrap">
                                <a target="_blank" href="https://www.facebook.com" className="footer__social" rel="nofollow noopener">
                                    <svg width="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                    </svg>
                                </a>
                                <a target="_blank" href="https://www.youtube.com" className="footer__social" rel="nofollow noopener">
                                    <svg width="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                                    </svg>
                                </a>
                                <a target="_blank" href="https://www.instagram.com" className="footer__social" rel="nofollow noopener">
                                    <svg width="23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                                    </svg>
                                </a>
                                <a target="_blank" href="https://www.linkedin.com" className="footer__social" rel="nofollow noopener">
                                    <svg width="21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                    </svg>
                                </a>
                                <a target="_blank" href="https://www.tiktok.com" className="footer__social" rel="nofollow noopener">
                                    <svg width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                        <path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer__col2">
                        <div className="footer__title ">Liên hệ với chúng tôi
                        </div>
                        <div className="footer-mobile-hidden" id="footer-mobile-hidden-1">
                            <div className="footer-mobile-hidden--content">
                                <p className="mb-4"><b>MiniStore</b> luôn tư vấn sản phẩm chất lượng tốt nhất. Chúng tôi sẽ liên hệ theo thông tin mà bạn để lại.</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div>
                                <input className='inp' type="text" name="name" value={userData.name} onChange={handleChange} required placeholder="Họ tên" />
                            </div>
                            <div>
                                <input className='inp' type="email" name="email" value={userData.email} onChange={handleChange} required placeholder="Email" />
                            </div>
                            <div>
                                <input className='inp' type="text" name="phone" value={userData.phone} onChange={handleChange} required pattern="[0-9]{10,11}"
                                    title="Số điện thoại là số" placeholder="Số điện thoại" />
                            </div>
                            <div>
                                <textarea className='description' name="feedback" value={userData.feedback} onChange={handleChange} required placeholder="Nội dung" />
                            </div>
                            <div className='btn-submit'>
                                <button type="submit">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        </>
    )
}
export default Footer;