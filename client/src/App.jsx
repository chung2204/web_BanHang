import React, { useState, useEffect } from 'react';
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
const App = () => {
  const [user, setUser] = useState(null);
  const [shoppCard, setShoppCard] = useState(null);

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
  return (
    <>
      <UserContext.Provider value={{ user, setUser, handleLogout }}>
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
