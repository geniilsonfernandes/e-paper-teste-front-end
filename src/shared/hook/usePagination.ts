import { useCallback, useState } from "react";

export type UsePaginationReturnType = {
  page: number;
  previewPage: () => void;
  nextPage: () => void;
  resetPage: () => void;
};

function usePagination(initialPage = 1): UsePaginationReturnType {
  const [page, setPage] = useState(initialPage);

  // Função para ir para a página anterior
  const previewPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  // Função para ir para a próxima página
  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  // Resetar para a página inicial
  const resetPage = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return {
    page,
    previewPage,
    nextPage,
    resetPage,
  };
}

export default usePagination;
