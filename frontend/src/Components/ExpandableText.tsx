"use client";

import React, { useState } from "react";

type CustomProps = {
  children: string;
  onToggle?: (expanded: boolean) => void;
};

type Props = CustomProps & Omit<React.HTMLAttributes<HTMLParagraphElement>, 'onToggle'>;

const ExpandableText = ({ children, onToggle, ...props }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = children.length > 120;

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    onToggle?.(next);
  };

  return (
    <div>
      <p
        className={`text-gray-700 text-base transition-all duration-300 ${
          !expanded && isLong ? "line-clamp-3" : "line-clamp-none"
        }`}
        {...props}
      >
        {children}
      </p>

      {isLong && (
        <button
          onClick={toggle}
          className="mt-2 text-gray-800 hover:underline text-sm"
        >
          {expanded ? "Hide" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
