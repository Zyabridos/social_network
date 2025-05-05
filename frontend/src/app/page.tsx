"use client";

import { useEffect } from "react";
import PostsList from "../Lists/PostsList";

const MainPage = () => {
  useEffect(() => {
    console.log("API (client) =", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  return <PostsList />;
};

export default MainPage;
