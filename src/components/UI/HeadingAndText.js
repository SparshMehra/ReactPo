import React from "react";

export default function HeadingAndText({
  headingType = "primaryHeading",
  verticalGap = "4",
  hLabel = "",
  pLabel = "",
  pSize = "lg",
}) {
  return (
    <>
      <h2 className={`${headingType} mb-${verticalGap}`}>{hLabel}</h2>
      <p className={`text-${pSize} mb-4 `}>{pLabel}</p>
    </>
  );
}
