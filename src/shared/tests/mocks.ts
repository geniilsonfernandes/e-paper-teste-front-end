import { DocumentType } from "../types";

export const documentsMock: DocumentType[] = [
  {
    id: "1",
    code: "A123",
    docOrigin: "company",
    docType: "contract",
    documentName: "Invoice",
    emitter: "Company A",
    amount: 1000,
    liquidValue: 950,
    createdAt: "2024-11-19T00:00:00Z",
    updatedAt: "2024-11-19T00:00:00Z",
    url: "https://example.com/invoice.pdf",
  },
];
