"use client";

import { tsr } from "@/shared/utils";
import { useCallback, useState } from "react";

export const CACHE_KEY_DOCUMENTS = "DOCUMENTS";

export type documentsQueryFilters = {
  docType?: string;
  docOrigin?: string;
  documentName?: string;
  amount?: number;
  liquidValue?: number;
  emitter?: string;
  initialDate?: string;
  finalDate?: string;
};

type UseDocumentsProps = {
  initialFilters?: documentsQueryFilters;
  initialPage?: number;
};

export const initialFiltersData: documentsQueryFilters = {
  docType: "",
  docOrigin: "",
  documentName: "",
  amount: 0,
  liquidValue: 0,
  emitter: "",
};

export const useDocumentsQuery = ({
  initialFilters = {},
  initialPage = 1,
}: UseDocumentsProps) => {
  const [filters, setFilters] = useState<documentsQueryFilters>({});
  const [page, setPage] = useState<number>(initialPage);

  const { data, isLoading } = tsr.get.useQuery({
    queryKey: [CACHE_KEY_DOCUMENTS, JSON.stringify(filters)],

    queryData: {
      query: {
        docType: filters.docType,
        docOrigin: filters.docOrigin,
        documentName: filters.documentName,
        amount: filters.amount,
        liquidValue: filters.liquidValue,
        emitter: filters.emitter,
        initialDate: filters.initialDate,
        finalDate: filters.finalDate,
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

  console.log(data);

  return {
    data,
    isLoading,
    filters,
    page,
    updateFilters,
    goToPage,
  };
};
