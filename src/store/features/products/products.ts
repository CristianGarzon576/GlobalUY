import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProductsReducer: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProductsReducer } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
