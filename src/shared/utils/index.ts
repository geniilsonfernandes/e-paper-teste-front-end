import { Document } from "../types";

export const filtersEmitters = (documents: Document[]) => {
  return documents.reduce((uniqueEmitters, document) => {
    if (!uniqueEmitters.includes(document.emitter)) {
      uniqueEmitters.push(document.emitter);
    }
    return uniqueEmitters;
  }, [] as string[]);
};

export const calculateTotal = (
  documents: Document[],
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
    formatted: total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
  };
};
