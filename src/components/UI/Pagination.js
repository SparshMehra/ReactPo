import React, { useEffect } from "react";

export default function Pagination({
  num = 3,
  classes = ["bodyTextxlg", "bodyTextxxlg"],
  tracker,
  setTracker,
  storageKey = "textSizePreference",
}) {
  useEffect(() => {
    // First, remove any previous size classes
    document.body.classList.remove(...classes);

    // Apply the selected class based on tracker
    // tracker 0 = no class (smallest/default)
    // tracker 1 = first class (medium)
    // tracker 2 = second class (large)
    if (tracker >= 1 && tracker <= classes.length) {
      document.body.classList.add(classes[tracker - 1]);
    }

    // Save preference to localStorage
    localStorage.setItem(storageKey, tracker.toString());
  }, [tracker, classes, storageKey]);

  return (
    <div className="flex gap-4">
      {Array.from({ length: num }, (_, i) => (
        <div
          key={i}
          onClick={() => setTracker(i)}
          className={`h-8 w-8 rounded-full flex ring-amber-400 ring-2 items-center justify-center cursor-pointer transition-all hover:scale-110${
            tracker === i ? " bg-yellow-200 shadow-gray-500 shadow-lg" : ""
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
