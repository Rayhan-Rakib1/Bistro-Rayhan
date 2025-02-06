import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelopeSquare, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import UseCart from '../hooks/UseCart';
import UseAdmin from '../hooks/UseAdmin';

const Dashboard = () => {
    const [cart] = UseCart();

    // todo: get isAdmin value from the database
    const [isAdmin] = UseAdmin();

    return (
        <div className='flex'>
            <div className='w-64 min-h-full bg-orange-400'>
                <ul className='menu'>

                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/addItems'><FaUtensils></FaUtensils> Add Items</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/manageItems'>
                                    <FaList></FaList>
                                    manage Items </NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/manageBooking'>
                                    <FaBook></FaBook>
                                    Manage Booking</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/allUsers'>
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </> :
                            <>
                                <li>

                                    <NavLink to='/dashboard/userHome'><FaHome></FaHome>  Home</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/cart'>
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart: ({cart.length})</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/review'>
                                        <FaAd></FaAd>
                                        Review</NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/history'>
                                        <FaList></FaList>
                                        payment History</NavLink>
                                </li>
                            </>
                    }

                    <div className="divider">OR</div>

                    <li>

                        <NavLink to='/'><FaHome></FaHome>  Home</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/salad'><FaSearch></FaSearch>  Menu</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/salad'>
                            <FaEnvelopeSquare></FaEnvelopeSquare> Contact</NavLink>
                    </li>

                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;