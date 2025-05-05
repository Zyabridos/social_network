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
      data-name={`post-${post.id}`}
      data-expanded={expanded}
    >
      <h2 className="font-bold text-xl mb-2" data-name={`post-title-${post.id}`}>
        {post.title}
      </h2>
      <ExpandableText onToggle={setExpanded} data-name={`post-content-${post.id}`}>
        {post.content}
      </ExpandableText>
    </div>
  );
};

export default PostCard;
