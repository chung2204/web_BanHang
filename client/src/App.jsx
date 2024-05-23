import React from 'react';
import Header from './components/user/Header';
import Footer from './components/user/Footer';
import { Outlet } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <>
        <div className='header'>
          <Header />
        </div>
        <div className='content'>
          <Outlet></Outlet>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </>

    );
  }

}

export default App;
