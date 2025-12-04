import React, { useState } from "react";
import Modal2 from "./Modal2";
import { RxAccessibility } from "react-icons/rx";
import TextAdjustment from "./TextAdjustment";
import Pagination from "./Pagination";
import { MdOutlineTextIncrease } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";
import Box from "./Box";
export default function StyleModalContext() {
  // Load saved preferences from localStorage on mount (default to level 1 = tracker 0)
  const [lineHeightTracker, setLineHeightTracker] = useState(() => {
    const saved = localStorage.getItem("lineHeightPreference");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [fontTracker, setFontTracker] = useState(() => {
    const saved = localStorage.getItem("textSizePreference");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Apply saved preferences on component mount
  React.useEffect(() => {
    const textSizeClasses = ["bodyTextxlg", "bodyTextxxlg"];
    const lineHeightClasses = ["lineHeightBigger", "lineHeightBiggest"];

    // Remove all classes first
    document.body.classList.remove(...textSizeClasses, ...lineHeightClasses);

    // Apply saved text size (tracker 0 = no class, 1 = first class, 2 = second class)
    if (fontTracker >= 1 && fontTracker <= textSizeClasses.length) {
      document.body.classList.add(textSizeClasses[fontTracker - 1]);
    }

    // Apply saved line height
    if (lineHeightTracker >= 1 && lineHeightTracker <= lineHeightClasses.length) {
      document.body.classList.add(lineHeightClasses[lineHeightTracker - 1]);
    }
  }, []);

  return (
    <div className="z-50">
      <Modal2>
        <Modal2.Open name="createForm">
          <RxAccessibility className="text-white bg-amber-500 rounded-full p-2 w-10 h-10" />
        </Modal2.Open>
        <Modal2.Window name="createForm">
          <Box>
            <TextAdjustment>
              <MdOutlineTextIncrease className="secondaryHeading" />
              <Pagination
                tracker={fontTracker}
                setTracker={setFontTracker}
                storageKey="textSizePreference"
              />
            </TextAdjustment>
            <TextAdjustment>
              <CiLineHeight className="secondaryHeading" />
              <Pagination
                classes={["lineHeightBigger", "lineHeightBiggest"]}
                tracker={lineHeightTracker}
                setTracker={setLineHeightTracker}
                storageKey="lineHeightPreference"
              />
            </TextAdjustment>
          </Box>
        </Modal2.Window>
      </Modal2>
    </div>
  );
}
