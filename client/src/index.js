import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import HomeContainer from './layouts/HomeContainer';
import LoginContainer from './pages/LoginContainer';
import DashBoardContainer from './layouts/Dashboard';
import ShowUser from './components/dashboard/qlUser/ShowUser';
import DashBoard from './components/dashboard/DashBoard';
import ShowProduct from './components/dashboard/qlProduct/ShowProduct';

import Routerr from './route/Router';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='user' element={<LoginContainer />} />
          <Route index element={<HomeContainer />} />
        </Route>
        <Route path='/admin' element={<DashBoardContainer />}>
          <Route path='showuser' element={<ShowUser />} />
          <Route path='showproduct' element={<ShowProduct />} />
          <Route index element={<DashBoard />} />
        </Route>

      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
