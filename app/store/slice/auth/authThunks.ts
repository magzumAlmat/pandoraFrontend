import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { END_POINT } from "@/lib/end_point";

interface LoginUserArgs {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginUserArgs, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${END_POINT}/user/login`,
        { email, password },
        config
      );
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
