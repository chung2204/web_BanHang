import React, { useContext, useState, useEffect } from 'react';
import api from "../api";
import UserContext from "../UserContext"
import { useParams } from 'react-router-dom';

const ShoppingCard = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [card, setCard] = useState([]);
    const [shopCard, setShopCard] = useState();
    const [userData, setUserData] = useState([]);
    const [address, setAddress] = useState('');
    const [order, setOrder] = useState({
        date_order: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        total_prices: '',
        total_product: '',
        status_order: '',
    });

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
    const handleUpdateItem = async (id, total) => {

        try {
            const response = await api.post(`/updatecarditem/${id}`, {
                users_id: user.users_id,
                total: total,
            });
            fetchCard();
        } catch (error) {
            console.error('Failed to update item', error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            const response = await api.post(`/removecarditem/${id}`, {
                users_id: user.users_id
            });
            fetchCard();
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };
    if (card == null || Object.keys(card).length === 0) {
        return <p>No items in the shopping card !</p>;
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

            })
            .catch(error => {
                console.error(error);

            });

    };

    return (

        <>
            <div>
                {card.map((item) => (
                    <li key={item.shopping_card_items_id}>
                        <p>Name: {item.name_product}</p>
                        <p>Price: {item.prices}</p>
                        <p>Total_product: {item.total_product}</p>
                        <p>Total: {item.total}</p>
                        <input
                            type="number"
                            value={item.total}
                            onChange={(e) => handleUpdateItem(item.shopping_card_items_id, e.target.value)}
                        />
                        <button onClick={() => handleRemoveItem(item.shopping_card_items_id)}>Remove</button>
                    </li>
                ))}
            </div>
            tong tien : {totalAmount}
            <div>
                <form onSubmit={handleSubmit} className="form" style={{ width: '70%' }}>
                    <div className="row-form">
                        <label>
                            <input className="input" type="text" name="name" value={userData.name} onChange={handleChange}
                                placeholder="" required />
                            <span>Họ tên</span>
                        </label>
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
                        <label>
                            <textarea name="address" id="address" cols="30" rows="10" onChange={handleChangeAddress} required></textarea>
                            <span> address</span>
                        </label>
                    </div>
                    <div className="row-formbtn">
                        <button className="submit" type="submit">Thanh toan</button>
                    </div>

                </form>
            </div>
        </>

    );
};
export default ShoppingCard;