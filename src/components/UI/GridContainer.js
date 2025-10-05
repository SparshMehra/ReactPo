import React from "react";

export default function GridContainer({
  children,
  type = "horizontal",
  gridCols = "2",
  gap = "6",
  maxWidth = "7xl",
  className = "",
}) {
  if (type === "horizontal")
    return (
      <div
        className={`max-w-${maxWidth} mx-auto grid md:grid-cols-${gridCols} gap-${gap} ${className}`}
      >
        {children}
      </div>
    );
}
