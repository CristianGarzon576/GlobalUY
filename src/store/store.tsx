import { configureStore } from "@reduxjs/toolkit";

import { usersSlice } from "./features/users/users";
import { productsSlice } from "./features/products/products";
import { requestsSlice } from "./features/requests/requests";

import { User } from "../models/user";

export const store = (user: User | null) =>
  configureStore({
    reducer: {
      users: usersSlice.reducer,
      products: productsSlice.reducer,
      requests: requestsSlice.reducer,
    },
    preloadedState: {
      users: {
        user: user,
        usersList: [],
      },
      products: [],
      requests: [],
    },
  });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
