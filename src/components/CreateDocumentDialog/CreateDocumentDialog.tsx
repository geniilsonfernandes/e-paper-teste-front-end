import { docOrigin, doctypes } from "@/shared/contants/comboxes";
import { ArrowRight } from "lucide-react";
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
};

export const CreateDocumentDialog = ({
  children,
}: CreateDocumentDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Criar novo documento</DialogTitle>
          <DialogDescription>
            Insira os dados necessários para criar
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 w-full">
          <Badge variant="secondary">0000</Badge>
          <div className="flex flex-col gap-4 w-full">
            <Combobox
              options={docOrigin}
              placeholder="escolha uma origem..."
              label="Origem do documento"
              tooltip="Escolha a origem do documento"
            />
            <Combobox
              options={doctypes}
              label="Tipo documental"
              tooltip="Escolha o tipo documental"
              placeholder="escolha um tipo..."
            />
            <FileUpload />
          </div>
        </div>
        <DialogFooter className="border-t border-neutral-200 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">
            Enviar documento
            <TrailingIcon>
              <ArrowRight />
            </TrailingIcon>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
