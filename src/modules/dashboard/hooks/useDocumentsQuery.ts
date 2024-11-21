"use client";

import { tsr } from "@/shared/utils";
import { useCallback, useState } from "react";

export const CACHE_KEY_DOCUMENTS = "DOCUMENTS";

export type documentsQueryFilters = {
  docType?: string;
  docOrigin?: string;
  documentName?: string;
  amount?: string;
  liquidValue?: string;
  emitter?: string;
  initialDate?: string;
  finalDate?: string;
};

type UseDocumentsProps = {
  initialPage?: number;
};

export const initialFiltersData: documentsQueryFilters = {
  docType: "",
  docOrigin: "",
  documentName: "",
  amount: "",
  liquidValue: "",
  emitter: "",
};

export const useDocumentsQuery = ({ initialPage = 1 }: UseDocumentsProps) => {
  const [filters, setFilters] = useState<documentsQueryFilters>({});
  const [page, setPage] = useState<number>(initialPage);

  const { data, isLoading, refetch } = tsr.getDocuments.useQuery({
    queryKey: ["DOCUMENTS", JSON.stringify(filters)],

    queryData: {
      query: {
        docType: filters.docType,
        ...(filters.docOrigin && { docOrigin: filters.docOrigin }),
        ...(filters.documentName && { documentName: filters.documentName }),
        ...(filters.amount && { amount: filters.amount.toString() }),
        ...(filters.liquidValue && {
          liquidValue: filters.liquidValue.toString(),
        }),
        ...(filters.emitter && { emitter: filters.emitter }),
        ...(filters.initialDate && { initialDate: filters.initialDate }),
        ...(filters.finalDate && { finalDate: filters.finalDate }),
      },
    },

    placeholderData: (previousData) => previousData,
  });

  const updateFilters = useCallback(
    (newFilters: Partial<documentsQueryFilters>) => {
      setFilters((current) => ({ ...current, ...newFilters }));
    },
    []
  );

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  return {
    data,
    isLoading,
    filters,
    page,
    updateFilters,
    goToPage,
    refetch,
  };
};
