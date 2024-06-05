import React, { useState, useEffect } from 'react';
import Header from './components/user/Header';
import Footer from './components/user/Footer';
import { Outlet } from 'react-router-dom';
import styleLoginAndRegister from "./styles/styleLoginAndRegister.scss";
import UserContext from './UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
