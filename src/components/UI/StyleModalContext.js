import React, { useState } from "react";
import Modal2 from "./Modal2";
import { RxAccessibility } from "react-icons/rx";
import TextAdjustment from "./TextAdjustment";
import Pagination from "./Pagination";
import { MdOutlineTextIncrease } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";
import Box from "./Box";
export default function StyleModalContext() {
  const [lineHeightTracker, setLineHeightTracker] = useState(0);
  const [fontTracker, setFontTracker] = useState(0);
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
              <Pagination tracker={fontTracker} setTracker={setFontTracker} />
            </TextAdjustment>
            <TextAdjustment>
              <CiLineHeight className="secondaryHeading" />
              <Pagination
                classes={["lineHeightBigger", "lineHeightBiggest"]}
                tracker={lineHeightTracker}
                setTracker={setLineHeightTracker}
              />
            </TextAdjustment>
          </Box>
        </Modal2.Window>
      </Modal2>
    </div>
  );
}
