"use client";

import { Table as TableType, flexRender } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/shared/utils";

type DataTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: TableType<any>;
  isLoading?: boolean;
};

export const DataTable = ({ table, isLoading }: DataTableProps) => {
  return (
    <div
      className={cn("w-full relative", {
        "pointer-events-none opacity-60": isLoading,
      })}
    >
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    {isLoading
                      ? "Carregando..."
                      : "Nenhum registro encontrado."}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div
        className="flex items-center 
      md:justify-end gap-2 py-4"
      >
        <div className="whitespace-nowrap hidden md:flex text-sm text-muted-foreground">
          {`${table.getFilteredSelectedRowModel().rows.length}
          de
          ${table.getFilteredRowModel().rows.length}
          `}
        </div>
        <div className="flex gap-2 w-full md:w-[200px]">
          <Button
            variant="outline"
            size="default"
            className="flex-1 sm:inline-flex"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="default"
            className="flex-1 sm:inline-flex"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
