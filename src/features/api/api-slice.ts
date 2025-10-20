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
  tagTypes: ["Profile"],
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
      providesTags: ["Profile"],
    }),
    createLink: builder.mutation({
      query: (body) => ({
        url: "/users/me/links",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    editLink: builder.mutation({
      query: (body) => ({
        url: `/users/me/links/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteLink: builder.mutation({
      query: (linkId) => ({
        url: `/users/me/links/${linkId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    getPublicProfile: builder.query({
      query: (username: string) => `/users/${username}/public`,
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useGetProfileQuery,
  useCreateLinkMutation,
  useGetPublicProfileQuery,
  useDeleteLinkMutation,
  useEditLinkMutation,
} = apiSlice;
