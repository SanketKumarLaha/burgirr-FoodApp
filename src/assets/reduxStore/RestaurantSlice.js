import { createSlice } from "@reduxjs/toolkit";

const RestaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    items: [],
  },
  reducers: {
    addRestaurant: (state, action) => {
      state.items.push(action.payload);
    },
    resetRestaurant: (state) => {
      state.items = [];
    },
  },
});

export const { addRestaurant, resetRestaurant } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
