import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (idToken) => ({
        url: "/auth/google",
        method: "POST",
        body: { idToken },
      }),
    }),
    getProfile: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export const { useGoogleLoginMutation, useGetProfileQuery } = apiSlice;
