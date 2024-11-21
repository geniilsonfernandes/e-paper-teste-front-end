import { tsr } from "@/shared/utils";

export const useDocumentCreate = (
  onSuccess: () => void,
  onError: () => void
) => {
  const { mutate, isPending, isSuccess } = tsr.createDocument.useMutation({
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
    isSuccess,
  };
};
