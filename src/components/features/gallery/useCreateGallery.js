import { useMutation } from "@tanstack/react-query";
import React from "react";
import { createGallery } from "../../utils/helper";
import toast from "react-hot-toast";

export default function useCreateGallery() {
  const { isLoading: isInserting, mutate } = useMutation({
    queryKey: ["gallery"],
    mutationFn: ({ gallery, file }) => createGallery(gallery, file),

    //Success Toast
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },

    //  ERROR toast
    onError: (error) => {
      toast.error(error.message || "Upload failed!");
    },
  });

  return { isInserting, mutate };
}
