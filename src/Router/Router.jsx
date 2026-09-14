import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Landing from "../Components/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    children: [
      {
        index:true,
        element:<Landing></Landing>
      }
    ]
  },
]);