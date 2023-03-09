import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import RestaurantSlice from "./RestaurantSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    restaurant: RestaurantSlice,
  },
});

export default store;
