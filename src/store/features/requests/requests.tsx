import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const requestsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    setRequestsReducer: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRequestsReducer } = requestsSlice.actions;

export const selectRequests = (state: RootState) => state.requests;
