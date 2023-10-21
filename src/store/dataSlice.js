import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  products: [],
  transactions: [],
  purchases: [],
  totalSales: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setPurchases: (state, action) => {
      state.purchases = action.payload;
    },
    setTotalSales: (state, action) => {
      state.totalSales = action.payload;
    },
  },
});

export const { setUsers, setProducts, setTransactions, setPurchases, setTotalSales } = dataSlice.actions;
export default dataSlice.reducer;
