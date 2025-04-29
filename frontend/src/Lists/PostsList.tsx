"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/slices/postsSlice";
import type { RootState, AppDispatch } from "../../store";
import type { PostItem } from "../../types/posts";
import PostCard from "../Components/PostCard";

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list = [], error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) {
    return (
      <div className="text-red-500">Error during fetching posts: {error}</div>
    );
  }

  if (list.length === 0) {
    return <div className="text-gray-500">There are no posts yet</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      {list.map((post: PostItem) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
