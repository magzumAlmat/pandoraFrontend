import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT_SPECIAL_EQ } from "@/lib/end_point";

const initialState = {
  companies: [],
  cars: [],
  success: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<any>) => {
      const companiesCopy = [...action.payload];
      const filteredCompanies = companiesCopy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      state.companies = filteredCompanies;
    },
    setSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
    },
    setCars: (state, action: PayloadAction<any>) => {
      state.cars = action.payload;
    },
  },
});

export const { setCompanies, setSuccess, setCars } = companySlice.actions;

export const getAllCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT_SPECIAL_EQ}/company`);
    dispatch(setCompanies(response.data.companies));
  } catch (error) {
    console.error(error);
  }
};

export const addCompany = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${END_POINT_SPECIAL_EQ}/company`, data);
    if (response.status === 200) {
      dispatch(getAllCompanies());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    console.error(error);
  }
};

export const editCompany = (data) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${END_POINT_SPECIAL_EQ}/company/${data.id}`,
      data
    );
    if (response.status === 200) {
      dispatch(getAllCompanies());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllCars = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT_SPECIAL_EQ}/company-car`);
    dispatch(setCars(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCompanyCar = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${END_POINT_SPECIAL_EQ}/company-car/${id}`
    );
    if (response.status === 200) {
      dispatch(getAllCompanies());
    }
  } catch (error) {
    console.error(error);
  }
};

export default companySlice.reducer;
