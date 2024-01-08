import { setBasketProposals, setSuccess, setError } from "./basketSlice";
import axios from "axios";
import { END_POINT } from "@/lib/end_point";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBasketProposalsAsync = createAsyncThunk(
  "basket/getAllBasketProposals",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(`${END_POINT}/proposal-basket/`);
      if (response.status === 200) {
        dispatch(setBasketProposals(response.data));
        return response.data;
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface CreateBasketParams {
  data: any;
}

export const createBasketAsync = createAsyncThunk(
  "basket/createBasket",
  async ({ data }: CreateBasketParams, { dispatch }) => {
    try {
      const response = await axios.post(`${END_POINT}/proposal-basket/`, data);

      if (response.status === 200) {
        dispatch(setSuccess(true));
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface UpdateBasketParams {
  id: string;
  data: any;
}

export const updateBasketAsync = createAsyncThunk(
  "basket/updateBasket",
  async ({ id, data }: UpdateBasketParams, { dispatch }) => {
    try {
      const response = await axios.patch(
        `${END_POINT}/proposal-basket/${id}`,
        data
      );
      if (response.status === 200) {
        dispatch(setSuccess(true));
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);
interface DeleteBasketParams {
  id: string;
}

export const deleteBasketAsync = createAsyncThunk(
  "basket/deleteBasket",
  async ({ id }: DeleteBasketParams, { dispatch }) => {
    try {
      const response = await axios.delete(`${END_POINT}/proposal-basket/${id}`);
      if (response.status === 200) {
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface CreateLocalExpenseParams {
  basketId: string;
  data: any;
}

export const createLocalExpenseAsync = createAsyncThunk(
  "basket/createLocalExpense",
  async ({ basketId, data }: CreateLocalExpenseParams, { dispatch }) => {
    try {
      const response = await axios.post(
        `${END_POINT}/proposal-basket/local-expenses/${basketId}`,
        data
      );
      if (response.status === 200) {
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface DeleteLocalExpenseParams {
  id: string;
}

export const deleteLocalExpenseAsync = createAsyncThunk(
  "basket/deleteLocalExpense",
  async ({ id }: DeleteLocalExpenseParams, { dispatch }) => {
    try {
      const response = await axios.delete(
        `${END_POINT}/proposal-basket/local-expenses/${id}`
      );
      if (response.status === 200) {
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface CreateStockStatusParams {
  basketId: string;
  data: any;
}

export const createStockStatusAsync = createAsyncThunk(
  "basket/createStockStatus",
  async ({ basketId, data }: CreateStockStatusParams, { dispatch }) => {
    try {
      const response = await axios.post(
        `${END_POINT}/proposal-basket/stock-status/${basketId}`,
        data
      );
      if (response.status === 200) {
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);

interface DeleteStockStatusParams {
  id: string;
}

export const deleteStockStatusAsync = createAsyncThunk(
  "basket/deleteStockStatus",
  async ({ id }: DeleteStockStatusParams, { dispatch }) => {
    try {
      const response = await axios.delete(
        `${END_POINT}/proposal-basket/stock-status/${id}`
      );
      if (response.status === 200) {
        dispatch(getAllBasketProposalsAsync());
      }
    } catch (error) {
      console.error(error);
      dispatch(setError(error.response?.data?.error || "An error occurred"));
      throw error;
    }
  }
);
