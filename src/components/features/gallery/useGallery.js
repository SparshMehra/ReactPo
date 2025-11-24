/**
 * useGallery Hook
 *
 * @file useGallery.js
 * @author Bhabin Chudal (A00464169) - Gallery data layer and utils
 * @author Abdiaziz Muse (A00471783) - UI integration and cleanup
 * @description React Query hook to fetch gallery entries from backend utils.
 */
import { useQuery } from "@tanstack/react-query";
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
