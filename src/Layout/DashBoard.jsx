import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const DashBoard = () => {

    //get admin value from the database
    const [isAdmin] = useAdmin()
    console.log(isAdmin)

    return (
        <div className="flex">
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminhome'><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/additems'><FaUtensils></FaUtensils> Add Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageitems'><FaList></FaList> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/bookings'><FaBook></FaBook> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUsers></FaUsers> All Users</NavLink></li>
                        </>
                            : <>
                                <li><NavLink to='/dashboard/userhome'><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
                                <li><NavLink to='/dashboard/review'><FaAd></FaAd> Add Review</NavLink></li>
                                <li><NavLink to='/dashboard/bookings'><FaList></FaList> My Bookings</NavLink></li>
                            </>
                    }

                    {/* shared navlinks */}
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/order/salad'><FaSearch></FaSearch> Menu</NavLink></li>
                    <li><NavLink to='/order/contact'><FaVoicemail></FaVoicemail> Contact</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;