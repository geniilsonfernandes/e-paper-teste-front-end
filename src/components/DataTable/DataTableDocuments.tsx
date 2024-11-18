"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ChevronsUpDown,
  FileText,
  MoreHorizontal,
  Trash,
  View,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/shared/types";
import { calculateTotal, filtersEmitters, formatValue } from "@/shared/utils";
import { useMemo, useState } from "react";
import { DataTable } from "../ui/DataTable";

// utils

type DataTableDocumentsProps = {
  data: Document[];
};

export const DataTableDocuments = ({ data }: DataTableDocumentsProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Document>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            className="ml-1"
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "documentName",
        footer: ({ table }) => (
          <div className="flex flex-col ">
            <span className="text-neutral-400 text-xs">Total</span>
            <span className="text-neutral-900">
              {table.getPrePaginationRowModel().rows.length} Documentos
            </span>
          </div>
        ),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nome do documento
              <ChevronsUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="font-medium flex items-center">
              <FileText className="mr-2 text-primary-500" />{" "}
              <div className="flex flex-col ">
                <span className="text-neutral-400 text-xs">
                  cód. {row.original.code}
                </span>
                <span>{row.getValue("documentName")}</span>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "emitter",
        footer: () => (
          <div className="flex flex-col ">
            <span className="text-neutral-400 text-xs">nº de emitentes</span>
            <span className="text-neutral-900">
              {filtersEmitters(data).length} Emitentes
            </span>
          </div>
        ),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Emitente
              <ChevronsUpDown />
            </Button>
          );
        },
      },

      {
        footer: () => (
          <div className="flex flex-col ">
            <span className="text-neutral-400 text-xs">Total de tributos</span>
            <span className="text-neutral-900">
              {calculateTotal(data, "amount").formatted}
            </span>
          </div>
        ),
        accessorKey: "amount",
        cell: ({ row }) => {
          return (
            <div className="font-medium flex items-center">
              <span>{formatValue(row.getValue("amount"))}</span>
            </div>
          );
        },
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Valor total dos tributos
              <ChevronsUpDown />
            </Button>
          );
        },
      },

      {
        accessorKey: "liquidValue",
        cell: ({ row }) => {
          return (
            <div className="font-medium flex items-center">
              <span>{formatValue(row.getValue("liquidValue"))}</span>
            </div>
          );
        },
        footer: () => (
          <div className="flex flex-col ">
            <span className="text-neutral-400 text-xs">
              Total valor líquido
            </span>
            <span className="text-neutral-900">
              {calculateTotal(data, "liquidValue").formatted}
            </span>
          </div>
        ),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Valor líquido
              <ChevronsUpDown />
            </Button>
          );
        },
      },

      {
        accessorKey: "createdAt",
        cell: ({ row }) => {
          return (
            <div className="font-medium flex items-center">
              <span>{format(row.getValue("createdAt"), "dd/MM/yyyy")}</span>
            </div>
          );
        },
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Data de criação
              <ChevronsUpDown />
            </Button>
          );
        },
      },

      {
        accessorKey: "updatedAt",
        cell: ({ row }) => {
          return (
            <div className="font-medium flex items-center">
              <span>{format(row.getValue("updatedAt"), "dd/MM/yyyy")}</span>
            </div>
          );
        },
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="flex p-2 "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Ultima atualização
              <ChevronsUpDown />
            </Button>
          );
        },
      },

      {
        id: "actions",
        enableHiding: false,
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <View /> Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash /> Excluir documento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return <DataTable table={table} />;
};
