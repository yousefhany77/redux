import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "users",
      transformResponse: (response) => {
        return usersAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});
export const { useUsersQuery } = usersApiSlice;
export const selectUsersResult = usersApiSlice.endpoints.users.select()

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data // normalized state object with ids & entities
)
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)