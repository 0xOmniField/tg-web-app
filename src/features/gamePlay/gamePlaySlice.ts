import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 slice 的 state 类型
interface CounterState {
  value: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

// 定义初始状态
const initialState: CounterState = {
  value: 0,
  status: "idle",
};
export const fetchData = createAsyncThunk("counter/fetchData", async () => {
  const response = await fetch("https://api.example.com/data");
  return response.json();
});

// 创建 slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading"; // 异步请求正在进行
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded"; // 异步请求成功
        state.value = action.payload; // 将返回的数据保存到 state 中
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed"; // 异步请求失败
      });
  },
});

// 导出 actions 和 reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
