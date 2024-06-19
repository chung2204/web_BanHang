import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/user/Header';
import Footer from './components/user/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import styleLoginAndRegister from "./styles/styleLoginAndRegister.scss";
import global from "./styles/global.scss";
import homepage from "./styles/homepage.scss";
import UserContext from './UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from './api';
const App = () => {
  const [user, setUser] = useState(null);
  const [shopCard, setShopCard] = useState();
  useEffect(() => {
    AOS.init();
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };
  const fetchShoppingCard = useCallback(async () => {
    if (user !== null && user.users_id !== '') {
      try {
        const response = await api.get(`/shopcard/${user.users_id}`);
        setShopCard(response.data);
      } catch (error) {
        console.error("There was an error fetching!", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchShoppingCard();
  }, [fetchShoppingCard]);
  return (
    <>
      <UserContext.Provider value={{ user, setUser, handleLogout, shopCard, fetchShoppingCard }}>
        <div className='header'>
          <Header />
        </div>
        <div className='content'>

          <Outlet ></Outlet>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </UserContext.Provider>
    </>

  );


}

export default App;
