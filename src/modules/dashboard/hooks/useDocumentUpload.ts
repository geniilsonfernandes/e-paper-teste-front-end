import { CloudinaryFile } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type UploadDocumentProps = {
  file: File;
};

const uploadDocument = async (
  values: UploadDocumentProps,
  onProgress: (progress: number) => void
) => {
  const formData = new FormData();
  formData.append("file", values.file);
  formData.append("upload_preset", "ml_default");

  return await axios.post<CloudinaryFile>(
    `https://api.cloudinary.com/v1_1/dbpayojb3/image/upload`,
    formData,
    {
      onUploadProgress: (event) => {
        if (event.total) {
          const progress = Math.round((100 * event.loaded) / event.total);
          onProgress(progress);
        }
      },
    }
  );
};

export const useDocumentUpload = (
  onSuccess: (image: CloudinaryFile) => void,
  onError: () => void
) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (values: UploadDocumentProps) =>
      uploadDocument(values, setProgress),
    onSuccess: (response) => {
      onSuccess(response.data);
      setProgress(100);
    },
    onError: () => {
      onError();
      setProgress(0);
    },
  });

  return {
    mutation,
    progress,
    isPending: mutation.isPending,
  };
};
