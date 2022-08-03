import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./pages/transaction/transactionSlice";
import userReducer from "./pages/userState/userSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    user: userReducer,
  },
});
export default store;
