import { CloudinaryFile } from "@/shared/types";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { FilePreview } from "../Filepreview";
import { PreviewDialog } from "../PreviewDialog";

const convertBytesToMB = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

type FileUploadProps = {
  onFileUpload?: (file: File) => void;
  isPending?: boolean;
  upLoadProgress?: number;
  onRemove?: () => void;
  fileUpload?: CloudinaryFile;
};

const FileUpload = ({
  onFileUpload,
  fileUpload,
  upLoadProgress,
  onRemove,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File>();
  const [openPreview, setOpenPreview] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileUpload?.(acceptedFiles[0]);
      setFiles(acceptedFiles[0]);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (fileRejections: FileRejection[]) => {
      const errosCode = {
        "file-invalid-type":
          "Tipo de arquivo inválido. Por favor, envie um arquivo no formato permitido.",
        "file-too-large":
          "Arquivo muito grande. O tamanho máximo permitido é de 10MB.",
        "file-too-small":
          "Arquivo muito pequeno. Verifique o tamanho mínimo exigido.",
        "too-many-files":
          "Você enviou muitos arquivos. Envie apenas um arquivo por vez.",
      };

      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error: { code: string }) => {
          const errorMessage =
            errosCode[error.code as keyof typeof errosCode] ||
            "Erro desconhecido ao fazer upload.";

          toast.error(errorMessage);
        });
      });
    },
    onDropAccepted: () => {
      toast.success("Arquivo carregado com sucesso!");
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-48 border-2 ${
          isDragActive ? "border-green-500" : "border-dashed border-gray-300"
        } rounded-lg bg-gray-50 cursor-pointer hover:border-green-500 transition`}
      >
        <input {...getInputProps()} />
        <Upload className="text-green-500 mb-2 w-8 h-8" />
        <p className="text-gray-600 text-sm text-center">
          Arraste e solte aqui ou selecione o arquivo para upload
        </p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Procurar e selecionar arquivo
        </button>
        <p className="mt-2 text-gray-400 text-xs">Tamanho máx.: 10MB</p>
      </div>
      {files && (
        <div className="mt-4">
          <FilePreview
            fileUpload={fileUpload}
            fileName={files?.name}
            fileSize={convertBytesToMB(files?.size || 0)}
            progress={upLoadProgress}
            onRemove={() => {
              onRemove?.();
              setFiles(undefined);
            }}
            onPreview={() => setOpenPreview(true)}
          />
        </div>
      )}
      <PreviewDialog
        fileUpload={fileUpload}
        isOpen={openPreview}
        fileName={files?.name || ""}
        totalPages={1}
        onClose={() => setOpenPreview(false)}
      />
    </div>
  );
};

export default FileUpload;
