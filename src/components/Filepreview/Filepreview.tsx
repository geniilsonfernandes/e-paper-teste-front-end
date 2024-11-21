import { CloudinaryFile } from "@/shared/types";
import { File, X } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

type FilePreviewProps = {
  fileName?: string;
  fileSize?: string | number;
  progress?: number;
  fileUpload?: CloudinaryFile;
  onRemove?: () => void;
  onPreview?: () => void;
};

export const FilePreview = ({
  fileName,
  fileSize,
  progress,
  onRemove,
  onPreview,
}: FilePreviewProps) => {
  return (
    <>
      <div className="relative">
        <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-white shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              <File className="text-gray-500" size={20} />
            </div>
            <div className="flex flex-col gap-1 flex-1 w-full pr-4">
              <span className="text-sm font-medium text-neutral-800">
                {fileName}
              </span>
              <span className="text-xs text-neutral-500">{fileSize}</span>
              <div className="flex-1 w-full">
                <Progress value={progress} />
              </div>
            </div>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 absolute right-4 top-4"
            onClick={onRemove}
          >
            <X size={20} />
          </button>
        </div>
        <Button
          disabled={!fileName}
          className="text-sm text-green-600 hover:underline px-0"
          onClick={onPreview}
          variant="link"
        >
          Pré-visualizar
        </Button>
      </div>
    </>
  );
};
