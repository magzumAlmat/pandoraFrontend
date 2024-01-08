import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT_SPECIAL_EQ } from "@/lib/end_point";

const initialState = {
  basketProposals: [],
  success: false,
  error: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketProposals: (state, action: PayloadAction<any>) => {
      const copy = [...action.payload];
      const sorted = copy.sort(
        (a, b) =>
          parseInt(b.internal_order_number) - parseInt(a.internal_order_number)
      );
      state.basketProposals = sorted;
    },
    setSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { setBasketProposals, setSuccess, setError } = basketSlice.actions;

export default basketSlice.reducer;
