import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postsApi } from "../../api/postsApi";
import { PostItem, PostsState } from "../../types/posts";

const initialState: PostsState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk<PostItem[]>(
  "posts/fetchPosts",
  async () => {
    return await postsApi.getAll();
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostItem[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        },
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default postsSlice.reducer;
