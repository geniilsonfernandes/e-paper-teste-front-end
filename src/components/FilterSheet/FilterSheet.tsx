import { documentsQueryFilters } from "@/modules/dashboard/hooks/useDocumentsQuery";
import { doctypes } from "@/shared/contants/comboxes";
import { cn, formatDate } from "@/shared/utils";
import { Filter, Info } from "lucide-react";
import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import InputField, { NumericField } from "../InputField/InputField";
import { Alert, AlertDescription } from "../ui/alert";
import { Button, LeadingIcon } from "../ui/button";
import { Combobox } from "../ui/Combobox";
import { DatePicker } from "../ui/DatePicker";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type FilterSheetProps = {
  onApplyFilters?: (
    filters: Pick<
      documentsQueryFilters,
      | "docType"
      | "emitter"
      | "amount"
      | "liquidValue"
      | "initialDate"
      | "finalDate"
    >
  ) => void;
};

export const FilterSheet = ({ onApplyFilters }: FilterSheetProps) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [hasFilters, setHasFilters] = useState(false);
  const [filters, setFilters] = useState<{
    docType?: string;
    date?: DateRange;
    emitter?: string;
    amount?: number;
    liquidValue?: number;
    initialDate?: string;
    finalDate?: string;
  }>({
    docType: undefined,
    emitter: "",
  });

  const clearFilters = () => {
    onApplyFilters?.({
      docType: undefined,
      emitter: undefined,
      amount: undefined,
      liquidValue: undefined,
      initialDate: undefined,
      finalDate: undefined,
    });
    setFilters({
      docType: undefined,
      emitter: "",
      amount: 0,
      liquidValue: 0,
      initialDate: undefined,
      finalDate: undefined,
    });
    setDate(undefined);
    setHasFilters(false);
    toast.success("Filtros limpos com sucesso!");
  };

  const handleDateChange = useCallback((date?: DateRange) => {
    if (!date) {
      return;
    }
    setDate(date);
    setFilters((current) => ({
      ...current,
      initialDate: formatDate(date?.from),
      finalDate: formatDate(date?.to),
    }));
    setHasFilters(true);
  }, []);

  const aplyFilters = () => {
    onApplyFilters?.(filters);
    setHasFilters(true);
    toast.success("Filtros aplicados com sucesso!");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "sm:px-8",
            hasFilters && "border-primary-400 bg-primary-100"
          )}
        >
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
          <DatePicker
            date={date}
            placeholder="Selecionar período"
            onSelect={handleDateChange}
          />
        </div>
        <div className="space-y-2 py-4 w-full relative border-t border-neutral-200">
          <Combobox
            options={doctypes}
            value={filters.docType}
            label="Tipo de documento"
            tooltip="Escolha o tipo documental"
            placeholder="escolha um tipo..."
            onSelect={(value) => {
              setFilters((current) => ({ ...current, docType: value }));
            }}
          />
          <InputField
            label="Emitente"
            name="emitter"
            placeholder="Razão social do emitente"
            value={filters.emitter}
            onChange={(e) => {
              setFilters((current) => ({
                ...current,
                emitter: e.target.value,
              }));
            }}
          />
          <NumericField
            label="Valor total dos tributos"
            name="taxes"
            placeholder="Valor em R$"
            value={filters.amount}
            onValueChange={(e) => {
              setFilters((current) => ({
                ...current,
                amount: e.floatValue,
              }));
            }}
          />
          <NumericField
            label="Valor liquido"
            name="liquid"
            placeholder="Valor em R$"
            value={filters.liquidValue}
            onValueChange={(e) => {
              setFilters((current) => ({
                ...current,
                liquidValue: e.floatValue,
              }));
            }}
          />
        </div>
        <SheetFooter className="border-t border-neutral-200 py-4">
          <SheetClose asChild>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </SheetClose>
          <Button onClick={aplyFilters}>Aplicar filtro</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
