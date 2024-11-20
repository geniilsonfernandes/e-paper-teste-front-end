import { format } from "date-fns";
import { DocumentType } from "../types";

export const filtersEmitters = (documents?: DocumentType[]) => {
  if (!documents) {
    return [];
  }

  return documents.reduce((uniqueEmitters, document) => {
    if (!uniqueEmitters.includes(document.emitter)) {
      uniqueEmitters.push(document.emitter);
    }
    return uniqueEmitters;
  }, [] as string[]);
};

export const formatValue = (value?: number) => {
  if (!value) {
    return "0,00";
  }
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const calculateTotal = (
  documents: DocumentType[],
  key: "amount" | "liquidValue"
) => {
  if (!["amount", "liquidValue"].includes(key)) {
    return {
      raw: 0,
      formatted: "0,00",
    };
  }

  const total = documents.reduce((acc, document) => {
    const value = document[key];
    if (typeof value === "number") {
      return acc + value;
    }
    return acc;
  }, 0);

  return {
    raw: total,
    formatted: formatValue(total),
  };
};

export const formatDate = (date?: string | Date) => {
  if (!date) {
    return "";
  }
  return format(new Date(date), "dd/MM/yyyy");
};
