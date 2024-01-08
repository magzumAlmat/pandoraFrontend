import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { END_POINT } from "@/lib/end_point";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
    }),
    сreateUser: builder.mutation({
      query: (body: any) => ({
        url: "/user/create-user",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { id: string; email: string }) => ({
        url: `/user/reset-password/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    editRole: builder.mutation({
      query: (body: { id: string; role: string }) => ({
        url: `/user/role/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),

    deactivateUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/deactivate/${id}`,
        method: "PATCH",
      }),
    }),
    activateUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/activate/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useСreateUserMutation,
  useResetPasswordMutation,
  useEditRoleMutation,
  useDeactivateUserMutation,
  useActivateUserMutation,
} = userApi;
