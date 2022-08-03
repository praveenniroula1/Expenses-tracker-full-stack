import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
  },
});
const { reducer, actions } = transSlice;
export const { setTransactions } = actions;
export default reducer;
