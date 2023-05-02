import { createSlice } from "@reduxjs/toolkit";
import { User, googleUser } from "../../../models/user";
import { RootState } from "../../store";
import { loginWithForm, logout } from "../../../utils/login";

const initialUser: User | null = null;

const initialState: { user: User | null; usersList: User[] } = {
  user: initialUser,
  usersList: [],
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUserReducer: (state, action) => {
      const user = loginWithForm(action.payload);
      state.user = user;
      return state;
    },
    logoutUserReducer: (state) => {
      logout();
      state.user = null;
      return state;
    },
    loginWithGoogleReducer: (state) => {
      state.user = googleUser;
      return state;
    },
    setUsersReducer: (state, action) => {
      state.usersList = action.payload;
      return state;
    },
  },
});

export const {
  loginUserReducer,
  logoutUserReducer,
  loginWithGoogleReducer,
  setUsersReducer,
} = usersSlice.actions;

export const selectAuthUser = (state: RootState) => state.users;
