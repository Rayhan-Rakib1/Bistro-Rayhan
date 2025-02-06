import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menus from "../Pages/menu/Menus";
import Order from "../Pages/Order/Order";
import Login from "../Pages/In/Login";
import SignUp from "../Pages/In/SignUp";
import Secrat from "../Pages/private/Secrat";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Cart from "../Pages/Dashboard.jsx/Cart";
import AllUsers from "../Pages/Dashboard.jsx/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard.jsx/AddItems";
import ManageItems from "../Pages/Dashboard.jsx/ManageItems";
import UpdateItem from "../Pages/Dashboard.jsx/UpdateItem";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard.jsx/UserHome";
import AdminHome from "../Pages/Dashboard.jsx/AdminHome";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/menus',
        element: <Menus></Menus>
      },
      {
        path: '/order',
        element: <Order></Order>
      },
      {
        path: '/order/:category',
        element: <Order></Order>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secrat></Secrat></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: '/dashboard/userHome',
        element: <UserHome></UserHome>
      },
      {
        path: '/dashboard/cart',
        element: <Cart></Cart>
      },
      {
        path: '/dashboard/payment',
        element: <Payment></Payment>
      },
      {
        path: '/dashboard/history',
        element: <PaymentHistory></PaymentHistory>
      },

      // admin routes
      {
        path: '/dashboard/adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: '/dashboard/allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: '/dashboard/addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: '/dashboard/manageItems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: '/dashboard/manageItems/update/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({ params }) => fetch(`https://bistro-boss-server-psi-sand.vercel.app/menu/${params.id}`)
      }
    ]
  }
]);