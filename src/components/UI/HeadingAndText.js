import React from "react";

export default function HeadingAndText({
  headingType = "primaryHeading",
  verticalGap = "4",
  hLabel = "",
  pLabel = "",
}) {
  return (
    <>
      <h2 className={`${headingType} mb-${verticalGap}`}>{hLabel}</h2>
      <p className={` mb-4 `}>{pLabel}</p>
    </>
  );
}
