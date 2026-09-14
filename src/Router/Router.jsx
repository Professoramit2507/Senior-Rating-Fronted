import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Landing from "../Components/Landing";
import NotFound from "../Components/Not/Not";
import Seniors from "../Components/NavComponents/Seniors";
import MyRating from "../Components/NavComponents/MyRating";
import Reviews from "../Components/NavComponents/Reviews";


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
        path:"seniors",
        element:<Seniors></Seniors>
      },
      {
        path:"my-ratings",
        element:<MyRating></MyRating>
      },
      {
        path:"reviews",
        element:<Reviews></Reviews>
      }
    ],
  },
  {
    path: "*",
    element:<NotFound></NotFound>
  },
]);
