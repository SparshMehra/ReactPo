import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getGallery } from "../../utils/helper";

export default function useGallery() {
  const {
    isLoading,
    data: galleries,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
  });
  return { isLoading, galleries, error };
}
