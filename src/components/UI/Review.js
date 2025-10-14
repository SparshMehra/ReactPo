import React from "react";
import Box from "./Box";
export default function Review({ label, author }) {
  return (
    <Box>
      <p className="italic text-lg">{label}</p>
      <p className="mt-4 text-right">{author}</p>
    </Box>
  );
}
