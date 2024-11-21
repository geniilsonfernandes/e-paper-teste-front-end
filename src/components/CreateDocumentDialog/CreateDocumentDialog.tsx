import { cn } from "@/lib/utils";
import { docOrigin, doctypes } from "@/shared/contants/comboxes";
import useDocumentMutate from "@/shared/endpoint/document/useDocumentMutate";
import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
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
  const { mutateAsync, isPending } = useDocumentMutate();
  const [values, setValues] = useState<{
    file: File;
    docType: string;
    docOrigin: string;
  }>({
    file: {} as File,
    docType: "",
    docOrigin: "",
  });

  const handleDocOriginChange = (docOrigin: string) => {
    setValues((current) => ({ ...current, docOrigin }));
  };
  const handleDocTypeChange = (docType: string) => {
    setValues((current) => ({ ...current, docType }));
  };

  const handleFileChange = useCallback((file: File) => {
    setValues((current) => ({ ...current, file }));
  }, []);

  const handleSubmit = async () => {
    if (!values.docOrigin || !values.docType || !values.file) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await mutateAsync({
        docOrigin: values.docOrigin,
        docType: values.docType,
        file: values.file,
      });
      refetchList?.();

      toast.success("Documento criado com sucesso.");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar documento.");
    }
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
            isPending && "pointer-events-none opacity-50"
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
            <FileUpload onFileUpload={handleFileChange} />
          </div>
        </div>
        <DialogFooter className="border-t border-neutral-200 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            {isPending ? "Enviando documento..." : "Enviar documento"}
            <TrailingIcon>
              <ArrowRight />
            </TrailingIcon>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
