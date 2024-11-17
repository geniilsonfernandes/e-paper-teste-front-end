"use client";

import { DataTableDocuments } from "@/components/DataTable";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Button, LeadingIcon } from "@/components/ui/button";
import { Combobox } from "@/components/ui/Combobox";
import { Input } from "@/components/ui/input";
import { documentsMock } from "@/shared/tests/mocks";
import { Filter, Plus, Search } from "lucide-react";

const doctypes = [
  { value: "payment", label: "Nota de pagamento" },
  { value: "contract", label: "Contrato de prestação de serviço" },
  { value: "invoice", label: "Fatura" },
  { value: "receipt", label: "Recibo" },
  { value: "statement", label: "Extracto bancário" },
  { value: "contractService", label: "Contrato de prestação de serviço" },
];

const docOrigin = [
  { value: "bank", label: "Banco" },
  { value: "company", label: "Empresa" },
  { value: "person", label: "Pessoa" },
];

export const Dashboard = () => {
  const handleSelect = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="py-4">
      <PageHeader
        title="Dashboard"
        subtitle="Visualize e gerencie seus documentos"
        rightSection={
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Buscar documentos"
              className="w-full md:max-w-[330px]"
              icon={<Search />}
            />
            <Button variant="outline" className="sm:px-8">
              <LeadingIcon>
                <Filter className="mr-2" />
              </LeadingIcon>
              Filtrar
            </Button>
          </div>
        }
      />
      <div className="border-t border-neutral-200 pt-6 pb-4 flex items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Combobox
            options={docOrigin}
            placeholder="escolha uma origem..."
            label="Origem do documento"
            tooltip="Escolha a origem do documento"
            onSelect={handleSelect}
          />
          <Combobox
            options={doctypes}
            label="Tipo documental"
            tooltip="Escolha o tipo documental"
            placeholder="escolha um tipo..."
            onSelect={handleSelect}
          />
        </div>
        <Button variant="default" className="hidden md:flex">
          <LeadingIcon>
            <Plus className="mr-2" />
          </LeadingIcon>
          Novo documento
        </Button>
      </div>
      <DataTableDocuments data={documentsMock} />
      <Button className="md:hidden fixed bottom-4 right-4 w-14 h-14 rounded-full">
        <Plus />
      </Button>
    </div>
  );
};
