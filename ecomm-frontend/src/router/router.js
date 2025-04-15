import { createBrowserRouter } from "react-router-dom";
import React from "react"; // Make sure to import React

import Aboutus from "../components/Aboutus";
import Hero from "../components/Hero";
import Foreground from "../components/foreground";
import AdminProductDetail from "../components/AdminProductDetail";
import ProductDetail from "../components/productDetail";

import login from "../components/admin/login";
import register from "../components/admin/register";
import Orders from "../components/admin/orders";
import Stocks from "../components/admin/stocks";
import List from "../components/admin/List";
import Qr from "../components/admin/Qr"
import OrderUpdate from "../components/admin/OrderUpdate";
import Cart from "../components/Cart"


const router = createBrowserRouter([
    { path: '/', element: React.createElement(Hero) },
    { path: 'aboutus', element: React.createElement(Aboutus) },
    { path: 'container', element: React.createElement(Foreground) },
    { path: 'cart', element: React.createElement(Cart) },
    

    { path: 'lists/AdminProductDetails/:id', element: React.createElement(AdminProductDetail) },
    { path: 'ProductDetail/:id', element: React.createElement(ProductDetail) },
    { path: 'lists/getqr/:id', element: React.createElement(Qr) },
    { path: 'orders/orderupdate/:id', element: React.createElement(OrderUpdate) },
    

    { path: 'login', element: React.createElement(login) },
    { path: 'register', element: React.createElement(register) },
    { path: 'orders', element: React.createElement(Orders) },
    { path: 'lists', element: React.createElement(List) },
    { path: 'stocks', element: React.createElement(Stocks) },
    
]);

export default router;
