import React from "react";
import Box from "./Box";

export default function TextAdjustment({ children }) {
  return (
    <Box className="flex bg-gray-100 p-6 rounded-lg shadow-blue-500 shadow-md gap-4 justify-center items-center mb-8">
      {children}
    </Box>
  );
}
