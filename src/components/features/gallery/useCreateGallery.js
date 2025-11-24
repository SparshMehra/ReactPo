/**
 * useCreateGallery Hook
 *
 * @file useCreateGallery.js
 * @author Bhabin Chudal (A00464169) - Gallery data layer and utils
 * @author Abdiaziz Muse (A00471783) - UI integration and cleanup
 * @description React Query mutation hook for creating a gallery item and uploading image.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGallery } from "../../utils/helper";
import toast from "react-hot-toast";

export default function useCreateGallery() {
  const queryClient = useQueryClient();
  const { isPending: isInserting, mutate } = useMutation({
    queryKey: ["gallery"],
    mutationFn: ({ gallery, file }) => createGallery(gallery, file),

    //Success Toast
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
      queryClient.invalidateQueries(["gallery"]); // to invalidate the query
    },

    //  ERROR toast
    onError: (error) => {
      toast.error(error.message || "Upload failed!");
    },
  });

  return { isInserting, mutate };
}
