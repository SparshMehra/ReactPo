/**
 * GridContainer Component
 *
 * @file GridContainer.js
 * @author Bhabin Chudal (A00464169) - UI improvements, code cleanup
 * @author Abdiaziz Muse (A00471783) - UI consistency and layout utilities
 * @description Reusable grid layout container with customizable columns, gap, and max width.
 *              Provides responsive grid layouts for content organization.
 *
 * @component
 * @param {React.ReactNode} children - Child elements to render in the grid
 * @param {string} [type="horizontal"] - Grid type (currently only horizontal supported)
 * @param {string} [gridCols="2"] - Number of columns for medium+ screens
 * @param {string} [gap="6"] - Gap spacing between grid items
 * @param {string} [maxWidth="7xl"] - Maximum width constraint
 * @param {string} [className=""] - Additional CSS classes
 *
 * @returns {JSX.Element} Grid container component
 */

import React from "react";

export default function GridContainer({
  children,
  type = "horizontal",
  gridCols = "2",
  gap = "6",
  maxWidth = "7xl",
  className = "",
}) {
  // Horizontal grid layout (default)
  if (type === "horizontal") {
    return (
      <div
        className={`max-w-${maxWidth} mx-auto grid grid-cols-1 md:grid-cols-${gridCols} gap-${gap} ${className}`}
      >
        {children}
      </div>
    );
  }

  // Fallback for unsupported types
  return (
    <div className={`max-w-${maxWidth} mx-auto ${className}`}>
      {children}
    </div>
  );
}

