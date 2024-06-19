import React, { useState, useEffect, useContext } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ic_delete from '../assets/icon/ic_delete.svg';
import UserContext from '../UserContext';
const ShoppingCard = () => {
    const urlImage = process.env.REACT_APP_API_IMAGE_URL;
    const { id } = useParams();
    const [card, setCard] = useState([]);
    const [shopCard, setShopCard] = useState();
    const [userData, setUserData] = useState([]);
    const [address, setAddress] = useState('');
    const { fetchShoppingCard } = useContext(UserContext);
    useEffect(() => {
        api.get(`/users/${id}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {

            });
    }, [id]);


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    // console.log(">>>>" + JSON.stringify(card));
    const fetchCard = async () => {
        try {
            const response = await api.get(`/card/${id}`);
            setCard(response.data);
        } catch (error) {
            console.error("There was an error fetching!", error);
        }
    };
    const fetchShopCard = async () => {
        try {
            const response = await api.get(`/shopcard/${id}`);
            setShopCard(response.data);
        } catch (error) {
            console.error("There was an error fetching!", error);
        }
    };

    useEffect(() => {
        fetchShopCard();
        fetchCard();
    }, [id]);
    const handleUpdateItem = async (id_card, total, total_pr) => {
        let newValue = 0;
        if (total === null || total === '') {
            newValue = 0;
        } else {
            newValue = total
        }
        if (/^\d+$/.test(newValue) && parseInt(newValue) >= 0 && parseInt(newValue) <= total_pr) {
            api.post(`/updatecarditem/${id_card}`, {
                users_id: id,
                total: newValue,
            }).then(() => {
                fetchShoppingCard();
                fetchCard();
            })
                .catch(error => {
                    console.error(error);

                });
        } else {
            toast.error("Lỗi! số lượng hàng trong kho còn" + total_pr)
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
    };
    const handleRemoveItem = async (id_card) => {
        try {
            api.post(`/removecarditem/${id_card}`, {
                users_id: id
            }).then(() => {
                fetchCard();
                fetchShoppingCard();
                toast.success("đã bỏ sản phẩm khỏi giỏ hàng")
            })
                .catch(error => {
                    console.error(error);

                });

        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };
    if (card == null || Object.keys(card).length === 0) {
        return <p style={{ width: "100%", textAlign: "center" }}>Bạn không có sản phẩm nào trong giỏ hàng !</p>;
    }
    const totalAmount = card.reduce((acc, item) => acc + item.prices * item.total, 0);
    const totalProduct = card.reduce((acc, item) => acc + item.total, 0);
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('date_order', formattedDate);
        formData.append('full_name', userData.name,);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('address', address.address);
        formData.append('total_prices', totalAmount);
        formData.append('total_product', totalProduct);
        formData.append('status_order', 'Chờ duyệt');
        formData.append('users_id', id);

        card.forEach((detail, index) => {
            formData.append(`details[${index}][name_product]`, detail.name_product);
            formData.append(`details[${index}][products_id]`, detail.products_id);
            formData.append(`details[${index}][image]`, detail.image);
            formData.append(`details[${index}][prices]`, detail.prices);
            formData.append(`details[${index}][total]`, (detail.total_product - detail.total));
            formData.append(`details[${index}][total_product]`, detail.total);
        });
        // const formDataObject = {};
        // for (const [key, value] of formData.entries()) {
        //     formDataObject[key] = value;
        // }
        // console.log(formDataObject);
        api.post(`/order`, formData)
            .then(() => {
                api.post(`/updatetotal`, formData)
                    .then(() => {

                    })
                    .catch(error => {
                        console.error(error);

                    });

                api.delete(`/deleteCard/${shopCard.shopping_cards_id}`)
                    .then(() => {
                        fetchCard();
                    })
                    .catch(error => {
                        console.error(error);

                    });
                toast.success('Đặt hàng thành công')

            })
            .catch(error => {
                console.error(error);

            });
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (

        <>
            <div className='shopcard-page'>
                <div className='container-shopcard'>
                    <div className='content-left'>
                        <div className='title'>
                            <h2>Giỏ hàng</h2>
                            {/* <div class="add-card">Cập nhật giỏ hàng</div> */}
                        </div>
                        {card.map((item) => (
                            <>
                                <div key={item.shopping_card_items_id} className='item-cards'>
                                    <div style={{ width: "350px" }}>
                                        <p>Tên sản phẩm: {item.name_product}</p>
                                        <p>Giá: <span style={{ color: "red" }}>{formatCurrency(item.prices)}</span></p>
                                    </div>
                                    <img style={{ maxWidth: "150px" }} src={urlImage + item.image} alt="" />
                                    <div>
                                        <p>Số lượng kho: {item.total_product}</p>
                                        <span>Số lượng mua: </span>
                                        <input
                                            style={{ width: "50px", textAlign: "center" }}
                                            type="number"
                                            value={item.total}
                                            onChange={(e) => handleUpdateItem(item.shopping_card_items_id, e.target.value, item.total_product)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <div> <img style={{ width: "25px", cursor: "pointer" }} src={ic_delete} onClick={() => handleRemoveItem(item.shopping_card_items_id)} /></div>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                    <div className='content-right'>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="row-form">
                                <label>
                                    <input className="input" type="text" name="name" value={userData.name} onChange={handleChange}
                                        placeholder="" required />
                                    <span>Họ tên</span>
                                </label>
                            </div>
                            <div className="row-form">
                                <label>
                                    <input className="input" type="email" name="email" value={userData.email} onChange={handleChange}
                                        placeholder="" required />
                                    <span>Email</span>
                                </label>
                            </div>
                            <div className="row-form">
                                <label>
                                    <input className="input" type="text" name="phone" value={userData.phone} onChange={handleChange}
                                        placeholder="" required />
                                    <span>Số điện thoại</span>
                                </label>
                            </div>
                            <div className="row-form">
                                <label style={{ textAlign: "center" }}>
                                    <textarea style={{ width: "300px" }} placeholder='Nhập địa chỉ' name="address" id="address" cols="30" rows="10" onChange={handleChangeAddress} required></textarea>
                                </label>
                            </div>
                            <p>Tổng số sản phẩm : {totalProduct}</p>
                            <p> Tổng tiền : <span style={{ color: "red" }}>{formatCurrency(totalAmount)}</span></p>
                            <div className="row-formbtn">
                                <button className="submit" type="submit">Đặt hàng</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShoppingCard;