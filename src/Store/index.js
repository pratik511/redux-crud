import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../Component/Home/HomeSlice";

export const Store = configureStore({
  reducer: {
    home: HomeSlice,
  },
});
