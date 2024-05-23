import { Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import styleAdmin from "../styles/styleDashBoard.scss";
import Navbar from "../components/dashboard/Navbar";

const Dashboard = (props) => {
    return (
        <>
            <div className="container-dashboard">
                <div className="wrap-header-dasboard">
                    <Header />
                </div>
                <div className="wrap-navbar-dasboard">
                    <Navbar />
                </div>
                <div className="wrap-content">
                    <div className="content-dasboard">
                        <Outlet></Outlet>
                    </div>
                </div>

            </div>

        </>
    )
}
export default Dashboard;