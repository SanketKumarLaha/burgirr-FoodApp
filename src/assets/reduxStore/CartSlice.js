import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalNoOfItems: 0,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let obj = { ...payload, cartQuantity: 1 };
      let itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (itemIndex < 0) {
        state.items.push(obj);
      }
    },
    increaseItem: (state, { payload }) => {
      let itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].cartQuantity += 1;
      }
    },
    decreaseItem: (state, { payload }) => {
      let itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (state.items[itemIndex].cartQuantity > 1) {
        state.items[itemIndex].cartQuantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== payload.id);
      }
    },
    resetCart: (state) => {
      state.items = [];
    },
    totalCost: (state) => {
      const { amount, totalItems } = state.items.reduce(
        (totalAmount, item) => {
          const { price, cartQuantity } = item;
          const itemTotal = (price / 100) * cartQuantity;
          totalAmount.amount += itemTotal;
          totalAmount.totalItems += cartQuantity;
          return totalAmount;
        },
        {
          amount: 0,
          totalItems: 0,
        }
      );
      state.totalAmount = amount;
      state.totalNoOfItems = totalItems;
    },
  },
});

export const {
  addItemToCart,
  increaseItem,
  decreaseItem,
  resetCart,
  totalCost,
} = CartSlice.actions;

export default CartSlice.reducer;
