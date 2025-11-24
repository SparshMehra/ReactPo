import React, { useEffect } from "react";

export default function Pagination({
  num = 3,
  classes = ["bodyTextxlg", "bodyTextxxlg"],
  tracker,
  setTracker,
}) {
  useEffect(() => {
    // First, remove any previous size classes
    document.body.classList.remove(...classes);
    if (tracker === 1 || tracker === 2)
      return document.body.classList.add(classes[tracker - 1]);
    return () => {
      // Cleanup on unmount to avoid leaving stray classes
      document.body.classList.remove(...classes);
    };
  }, [tracker, classes]);
  return (
    <div className="flex gap-4">
      {Array.from({ length: num }, (_, i) => (
        <div
          key={i}
          onClick={() => setTracker(i)}
          className={`h-8 w-8 rounded-full flex ring-amber-400 ring-2 items-center justify-center${
            i <= tracker ? " bg-yellow-200 shadow-gray-500 shadow-lg" : ""
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
