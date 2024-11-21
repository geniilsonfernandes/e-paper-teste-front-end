import { useMutation } from "@tanstack/react-query";
import apiServer from "../api";

type uploadDocumentProps = {
  file: File;
  docType: string;
  docOrigin: string;
};

const uploadDocument = async (values: uploadDocumentProps) => {
  const formData = new FormData();

  formData.append("file", values.file);
  formData.append("docType", values.docType);
  formData.append("docOrigin", values.docOrigin);

  return await apiServer.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useDocumentMutate = () => {
  return useMutation({
    mutationFn: uploadDocument,
  });
};

export default useDocumentMutate;
