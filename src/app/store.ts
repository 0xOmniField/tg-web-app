import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/gamePlay/gamePlaySlice";
import accountReducer from "../components/Account/accountSlice";
import automataReducer from "../features/automata/automata";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
    automata: automataReducer,
  },
});

// 定义 RootState 和 AppDispatch 类型，方便后续使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
