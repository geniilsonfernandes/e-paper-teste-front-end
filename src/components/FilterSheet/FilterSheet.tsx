import { doctypes } from "@/shared/contants/comboxes";
import { Filter, Info } from "lucide-react";
import { toast } from "sonner";
import InputField, { NumericField } from "../InputField/InputField";
import { Alert, AlertDescription } from "../ui/alert";
import { Button, LeadingIcon } from "../ui/button";
import { Combobox } from "../ui/Combobox";
import { DatePicker } from "../ui/DatePicker";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";


export const FilterSheet = () => {
  const aplyFilters = () => {
    toast.success("Filtros aplicados com sucesso");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="sm:px-8">
          <LeadingIcon>
            <Filter className="mr-2" />
          </LeadingIcon>
          Filtrar
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader className="border-b border-neutral-200">
          <SheetTitle>Filtrar documentos</SheetTitle>
          <SheetDescription>
            Indique os dados necessários para realizar a filtragem
          </SheetDescription>
        </SheetHeader>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Selecione o tipo de documento necessário para, a partir dele,
            selecionar os tipos de índice para a filtragem.
          </AlertDescription>
        </Alert>
        <div className="my-4">
          <DatePicker placeholder="Selecionar período" />
        </div>
        <div className="space-y-2 py-4 w-full relative border-t border-neutral-200">
          <Combobox
            options={doctypes}
            label="Tipo de documento"
            tooltip="Escolha o tipo documental"
            placeholder="escolha um tipo..."
          />
          <InputField
            label="Emitente"
            name="emitter"
            placeholder="Razão social do emitente"
          />
          <NumericField
            label="Valor total dos tributos"
            name="taxes"
            placeholder="Valor em R$"
          />
          <NumericField
            label="Valor liquido"
            name="liquid"
            placeholder="Valor em R$"
          />
        </div>
        <SheetFooter className="border-t border-neutral-200 py-4">
          <Button variant="outline">Limpar filtros</Button>
          <Button onClick={aplyFilters}>Aplicar filtro</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
