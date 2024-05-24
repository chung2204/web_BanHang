import {
    Route,
    Routes
} from "react-router-dom";
import App from '../App';
import HomeContainer from '../layouts/HomeContainer';
import LoginContainer from '../pages/LoginContainer';
import DashBoardContainer from '../layouts/Dashboard';
import ShowUser from '../components/dashboard/qlUser/ShowUser';
import DashBoard from '../components/dashboard/DashBoard';
import ShowProduct from '../components/dashboard/qlProduct/ShowProduct';
import AddUser from "../components/dashboard/qlUser/AddUser";
import UpdateUser from "../components/dashboard/qlUser/UpdateUser";

const Router = () => {
    return (
        <>
            <Routes>

                <Route path='/' element={<App />} >
                    <Route path='user' element={<LoginContainer />} />
                    <Route index element={<HomeContainer />} />
                </Route>
                <Route path='/admin' element={<DashBoardContainer />}>
                    <Route path='showUser' element={<ShowUser />} />
                    <Route path='addUser' element={<AddUser />} />
                    <Route path='updateUser/:id' element={<UpdateUser />} />


                    <Route path='showProduct' element={<ShowProduct />} />
                    <Route index element={<DashBoard />} />
                </Route>

            </Routes>

        </>
    )

};
export default Router;