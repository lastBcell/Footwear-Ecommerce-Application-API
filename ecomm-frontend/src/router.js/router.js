import { createBrowserRouter } from "react-router-dom";
import React from "react"; // Make sure to import React
import Aboutus from "../components/Aboutus";

import Hero from "../components/Hero";
import Foreground from "../components/foreground";

const router = createBrowserRouter([
    { path: '/', element: React.createElement(Hero) },
    { path: 'aboutus', element: React.createElement(Aboutus) },
    { path: 'container', element: React.createElement(Foreground) },
]);

export default router;
