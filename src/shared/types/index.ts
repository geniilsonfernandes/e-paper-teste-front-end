import { NextApiRequest } from "next";
import { z } from "zod";

export interface MulterRequest extends NextApiRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file?: any;
}

export const docTypes = z.enum([
  "payment",
  "contract",
  "invoice",
  "receipt",
  "statement",
  "contractService",
]);

export const docOrigin = z.enum(["bank", "company", "person"]);

export const DocumentSchema = z.object({
  id: z.string(),
  code: z.string(),
  docType: z.string(),
  docOrigin: z.string(),
  // docType: docTypes,
  // docOrigin: docOrigin,
  documentName: z.string(),
  emitter: z.string(),
  amount: z.number(),
  liquidValue: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  url: z.string().url(),
});

export type DocumentType = z.infer<typeof DocumentSchema>;

// Exemplo de uso
export const validDocument: DocumentType = {
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
};

export type CloudinaryFile = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
};
