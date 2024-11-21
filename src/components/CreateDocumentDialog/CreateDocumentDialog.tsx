import { cn } from "@/lib/utils";
import { useDocumentCreate } from "@/modules/dashboard/hooks/useDocumentCreate";
import { useDocumentUpload } from "@/modules/dashboard/hooks/useDocumentUpload";
import { docOrigin, doctypes } from "@/shared/contants/comboxes";
import { CloudinaryFile } from "@/shared/types";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../FileUpload/FileUpload";
import { Badge } from "../ui/badge";
import { Button, TrailingIcon } from "../ui/button";
import { Combobox } from "../ui/Combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type CreateDocumentDialogProps = {
  children: React.ReactNode;
  refetchList?: () => void;
};

export const CreateDocumentDialog = ({
  children,
  refetchList,
}: CreateDocumentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<{
    file?: CloudinaryFile;
    docType: string;
    docOrigin: string;
  }>({
    file: undefined,
    docType: "",
    docOrigin: "",
  });

  const createMutation = useDocumentCreate(
    () => {
      setOpen(false);
      setValues({
        file: undefined,
        docType: "",
        docOrigin: "",
      });
      refetchList?.();
      toast.success("Documento criado com sucesso.");
    },
    () => {
      toast.error("Erro ao criar documento.");
    }
  );

  const uploadMutation = useDocumentUpload(
    (image) => {
      setValues((current) => ({ ...current, file: image }));
    },
    () => {
      toast.error("Erro ao fazer upload do documento.");
    }
  );

  const handleDocOriginChange = (docOrigin: string) => {
    setValues((current) => ({ ...current, docOrigin }));
  };
  const handleDocTypeChange = (docType: string) => {
    setValues((current) => ({ ...current, docType }));
  };

  const handleFileChange = (file: File) => {
    uploadMutation.mutation.mutate({
      file,
    });
  };

  const handleRemoveFile = () => {
    setValues((current) => ({ ...current, image: undefined }));
    uploadMutation.mutation.reset();
  };

  const handleSubmit = async () => {
    createMutation.mutate({
      body: {
        docType: values.docType,
        docOrigin: values.docOrigin,
        documentName: values.file?.original_filename || "",
        url: values.file?.secure_url || "",
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Criar novo documento</DialogTitle>
          <DialogDescription>
            Insira os dados necessários para criar
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "space-y-4 w-full",
            createMutation.isPending && "pointer-events-none opacity-50"
          )}
        >
          <Badge variant="secondary">0000</Badge>
          <div className="flex flex-col gap-4 w-full">
            <Combobox
              options={docOrigin}
              placeholder="escolha uma origem..."
              label="Origem do documento"
              tooltip="Escolha a origem do documento"
              value={values.docOrigin}
              onSelect={handleDocOriginChange}
            />
            <Combobox
              options={doctypes}
              label="Tipo documental"
              tooltip="Escolha o tipo documental"
              placeholder="escolha um tipo..."
              value={values.docType}
              onSelect={handleDocTypeChange}
            />
            <FileUpload
              fileUpload={values.file}
              onFileUpload={handleFileChange}
              isPending={uploadMutation.isPending}
              upLoadProgress={uploadMutation.progress}
              onRemove={handleRemoveFile}
            />
          </div>
        </div>
        <DialogFooter className="border-t border-neutral-200 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            {createMutation.isPending
              ? "Enviando documento..."
              : "Enviar documento"}
            <TrailingIcon>
              <ArrowRight />
            </TrailingIcon>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
