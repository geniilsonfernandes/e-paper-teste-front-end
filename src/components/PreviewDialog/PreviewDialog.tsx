import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowDown, ArrowUp, Download, ZoomIn } from "lucide-react";
import { useState } from "react";

type PreviewDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  totalPages: number;
};

export const PreviewDialog = ({
  isOpen,
  onClose,
  fileName,
  totalPages,
}: PreviewDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const handleZoom = (amount: number) => {
    setZoom((prevZoom) => Math.max(50, Math.min(200, prevZoom + amount)));
  };

  const handlePageChange = (direction: "up" | "down") => {
    setCurrentPage((prev) =>
      direction === "up"
        ? Math.min(totalPages, prev + 1)
        : Math.max(1, prev - 1)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-md font-semibold">
            Pré-visualização do arquivo
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{fileName}</p>
        </DialogHeader>

        <div
          className="mt-4  shadow-md flex flex-col gap-4 border bg-neutral-100 border-neutral-200 rounded-md"
          aria-label="Visualização"
        >
          <div className="p-2 bg-white flex items-center justify-between border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleZoom(10)}
                className="p-2"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <select
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="rounded-sm border px-2 py-2 text-sm"
              >
                {[50, 75, 100, 125, 150, 200].map((value) => (
                  <option key={value} value={value}>
                    {value}%
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange("up")}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange("down")}
                disabled={currentPage === 1}
                className="p-2"
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                <input
                  type="text"
                  className="rounded-sm w-10 text-center mr-2 border px-2 py-2 text-sm"
                />
                / {totalPages} páginas
              </span>
            </div>

            <Button variant="ghost" size="sm" className="p-2">
              <Download className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 min-h-[300px] "></div>
        </div>

        <DialogFooter>
          <Button variant="default" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
