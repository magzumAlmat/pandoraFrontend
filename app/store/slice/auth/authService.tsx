import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { END_POINT } from "@/lib/end_point";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: END_POINT,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.userToken;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (id) => ({
        url: "api/user/profile/" + id,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
