// import { createBrowserRouter } from "react-router";
// import Home from "../Home/Home";
// import Landing from "../Components/Landing";
// import NotFound from "../Components/Not/Not";
// import Seniors from "../Components/NavComponents/Seniors";
// import MyRating from "../Components/NavComponents/MyRating";
// import Reviews from "../Components/NavComponents/Reviews";
// import RateSenior from "../Components/NavComponents/Rate";
// import Login from "../Components/Auth/Login";
// import Register from "../Components/Auth/Register";


// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         index: true,
//         element: <Landing />,
//       },
//       {
//         path: "seniors",
//         element: <Seniors></Seniors>
//       },
//       {
//         path: "rate/:id",
//         element: <RateSenior />,
//       },

//       {
//         path: "my-ratings",
//         element: <MyRating></MyRating>
//       },
//       {
//         path: "reviews",
//         element: <Reviews></Reviews>
//       },
//       {
//         path:"login",
//         element:<Login/>
//       },
//       {
//         path:"register",
//         element:<Register/>
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound></NotFound>
//   },
// ]);






import { createBrowserRouter } from "react-router";

import Home from "../Home/Home";
import Landing from "../Components/Landing";
import NotFound from "../Components/Not/Not";
import Seniors from "../Components/NavComponents/Seniors";
import MyRating from "../Components/NavComponents/MyRating";
import Reviews from "../Components/NavComponents/Reviews";
import RateSenior from "../Components/NavComponents/Rate";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import ManageUsers from "../Components/Admin/ManageUsers";
import ManageReviews from "../Components/Admin/ManageReviews";
import Dashboard from "../Components/Admin/Dashboard";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "seniors",
                element: <Seniors />,
            },
            {
                path: "rate/:id",
                element: <RateSenior />,
            },
            {
                path: "my-ratings",
                element: <MyRating />,
            },
            {
                path: "reviews",
                element: <Reviews />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },

    // ================= ADMIN =================
    {
        path: "/admin",
        element: <AdminNavbar />,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>,
            },
            {
                path: "users",
                element: <ManageUsers/>,
            },
            {
                path: "reviews",
                element: <ManageReviews />,
            },
        ],
    },

    // ================= 404 =================
    {
        path: "*",
        element: <NotFound />,
    },
]);
