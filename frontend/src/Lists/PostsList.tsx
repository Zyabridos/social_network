"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/slices/postsSlice";
import type { RootState, AppDispatch } from "../../store";
import type { PostItem } from "../../types/posts";
import PostCard from "../Components/PostCard";
import { useTranslation } from 'react-i18next';

const PostsList = () => {
  const { t } = useTranslation('posts');
  const dispatch = useDispatch<AppDispatch>();
  const { list = [], error } = useSelector((state: RootState) => state.posts);

  const [showNoPostsMessage, setshowNoPostsMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowNoPostsMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="text-red-500">{t('errors.fetching')} {error}</div>
    );
  }

  if (list.length === 0 && showNoPostsMessage) {
    return <div className="text-gray-500">{t('noPosts')}</div>;
  }

  return (
    <div>
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold tracking-wide text-gray-800">
          {t('title')}
        </h1>
      </div>
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
          {list.map((post: PostItem) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
    </div>
  );
};

export default PostsList;
