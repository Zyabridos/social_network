"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/slices/postsSlice";
import type { RootState, AppDispatch } from "../../store/index";
import type { PostItem } from "../../types/posts";

const Post = () => {
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

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        {list.length === 0 ? (
          <div className="text-gray-500">There are no posts yet</div>
        ) : (
          list.map((post: PostItem) => (
            <div key={post.id} className="font-bold text-xl mb-2">
              <h1>{post.title}</h1>
              <p
                className="text-gray-700 text-base mt-4"
                data-name="post-content"
              >
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="px-6 pt-4 pb-2"></div>
    </div>
  );
};

export default Post;
