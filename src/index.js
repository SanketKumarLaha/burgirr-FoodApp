import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import Cart from "./pages/Cart/Cart";
import store from "./assets/reduxStore/store";
import "./style.css";
import LocationProvider from "./assets/context/LocationProvider";

const App = () => {
  return (
    <div className="container">
      <LocationProvider>
        <Provider store={store}>
          <Navbar />
          <Outlet />
        </Provider>
      </LocationProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:id",
        element: <Restaurant />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
