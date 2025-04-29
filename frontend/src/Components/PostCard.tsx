"use client";

import React, { useState } from "react";
import type { PostItem } from "../../types/posts";
import ExpandableText from "./ExpandableText";

type Props = {
  post: PostItem;
};

const PostCard = ({ post }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`w-150 rounded shadow-lg border border-gray-200 bg-white transition-all duration-300 p-6 ${
        expanded ? "max-h-none" : "max-h-72 overflow-hidden"
      }`}
    >
      <h2 className="font-bold text-xl mb-2">{post.title}</h2>
      <ExpandableText onToggle={setExpanded}>{post.content}</ExpandableText>
    </div>
  );
};

export default PostCard;
