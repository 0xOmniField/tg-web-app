import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/gamePlay/gamePlaySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
