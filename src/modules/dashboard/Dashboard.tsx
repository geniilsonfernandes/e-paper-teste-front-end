"use client";

import { CreateDocumentDialog } from "@/components/CreateDocumentDialog";
import { DataTableDocuments } from "@/components/DataTable";
import { FilterSheet } from "@/components/FilterSheet";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Button, LeadingIcon } from "@/components/ui/button";
import { Combobox } from "@/components/ui/Combobox";
import { Input } from "@/components/ui/input";
import { docOrigin, doctypes } from "@/shared/contants/comboxes";
import { documentsMock } from "@/shared/tests/mocks";
import { Plus, Search } from "lucide-react";

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
            <FilterSheet />
          </div>
        }
      />
      <div className="border-t border-neutral-200 pt-6 pb-4 flex items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-96">
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
        <CreateDocumentDialog>
          <Button variant="default" className="hidden md:flex">
            <LeadingIcon>
              <Plus className="mr-2" />
            </LeadingIcon>
            Novo documento
          </Button>
        </CreateDocumentDialog>
      </div>
      <DataTableDocuments data={documentsMock} />
      <CreateDocumentDialog>
        <Button className="md:hidden fixed bottom-32 right-8 w-14 h-14 rounded-full">
          <Plus />
        </Button>
      </CreateDocumentDialog>
    </div>
  );
};
