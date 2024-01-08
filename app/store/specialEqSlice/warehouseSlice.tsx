import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT_SPECIAL_EQ } from "@/lib/end_point";

const initialState = {
  warehouses: [],
  success: false,
  selectedProposals: [],
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setWarsehouses: (state, action: PayloadAction<any>) => {
      state.warehouses = action.payload;
    },
    setSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
    },
    setSelectedProposals: (state, action: PayloadAction<any>) => {
      state.selectedProposals = action.payload;
    },
  },
});

export const { setWarsehouses, setSuccess, setSelectedProposals } =
  warehouseSlice.actions;

export const getAllWarehouses = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT_SPECIAL_EQ}/warehouse`);
    dispatch(setWarsehouses(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const addWarehouse = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${END_POINT_SPECIAL_EQ}/warehouse`,
      data
    );
    if (response.status === 200) {
      dispatch(getAllWarehouses());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    console.error(error);
  }
};

export default warehouseSlice.reducer;
