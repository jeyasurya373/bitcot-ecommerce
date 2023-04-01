import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      console.log(action, "***");
      const { id, data } = action.payload;
      const index = state.findIndex((product) => product.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
      return state;
    },
  },
});

export const { setProducts, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
