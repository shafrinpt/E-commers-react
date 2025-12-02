import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // ✅ Create unique ID (based on category + id)
      const uniqueId = `${item.category || "general"}-${item.id}`;
      const existing = state.items.find((i) => i.uniqueId === uniqueId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          uniqueId,
          id: item.id,
          category: item.category || "general",
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: 1,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.uniqueId !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.uniqueId === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.uniqueId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
