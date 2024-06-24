import React, { useState } from 'react';
import {
    Route,
    Routes
} from "react-router-dom";
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashBoardContainer from '../layouts/Dashboard';
import ShowUser from '../components/dashboard/qlUser/ShowUser';
import DashBoard from '../components/dashboard/DashBoard';
import ShowProduct from '../components/dashboard/qlProduct/ShowProduct';
import AddProduct from '../components/dashboard/qlProduct/AddProduct';
import UpdateProduct from '../components/dashboard/qlProduct/UpdateProduct';
import AddUser from "../components/dashboard/qlUser/AddUser";
import UpdateUser from "../components/dashboard/qlUser/UpdateUser";
import ShowCategory from "../components/dashboard/qlCategory/ShowCategory";
import ShowBrand from "../components/dashboard/qlBrand/ShowBrand";
import User from '../pages/User';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Product from '../pages/Product';
import ProductDetail from '../pages/ProductDetail';
import ShoppingCard from '../pages/ShoppingCard';
import Bill from '../pages/Bill';
import ShowBill from '../components/dashboard/qlBill/ShowBill';
import ShowFeedBack from '../components/dashboard/qlFeeedback/ShowFeedBack';
const Router = () => {

    return (
        <>
            <Routes>

                <Route path='/' element={<App />} >
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='about' element={<About />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='product' element={<Product />} />
                    <Route path='productdetail/:id' element={<ProductDetail />} />
                    <Route path='shoppingcard/:id' element={<ShoppingCard />} />
                    <Route path='user/:id' element={<User />} />
                    <Route path='bill/:id' element={<Bill />} />
                    <Route index element={<Home />} />
                </Route>
                <Route path='/admin' element={<DashBoardContainer />}>
                    <Route path='showUser' element={<ShowUser />} />
                    <Route path='showUser/addUser' element={<AddUser />} />
                    <Route path='showUser/updateUser/:id' element={<UpdateUser />} />

                    <Route path='showCategory' element={<ShowCategory />} />
                    <Route path='showBrand' element={<ShowBrand />} />
                    <Route path='showBill' element={<ShowBill />} />
                    <Route path='showFeedBack' element={<ShowFeedBack />} />

                    <Route path='showProduct' element={<ShowProduct />} />
                    <Route path='showProduct/addProduct' element={<AddProduct />} />
                    <Route path='showProduct/updateProduct/:id' element={<UpdateProduct />} />
                    <Route index element={<ShowUser />} />
                </Route>

            </Routes>

        </>
    )

};
export default Router;