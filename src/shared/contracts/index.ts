import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { DocumentSchema } from "../types";

const c = initContract();

export const documentContract = c.router({
  getDocuments: {
    method: "GET",
    path: "/document",
    query: z
      .object({
        page: z.number(),
        initialDate: z.string(),
        finalDate: z.string(),
        docType: z.string(),
        docOrigin: z.string(),
        emitter: z.string(),
        amount: z.string(),
        liquidValue: z.string(),
        documentName: z.string(),
      })
      .partial(),
    responses: {
      200: z.object({
        message: z.string(),
        total: z.number(),
        totalPages: z.number(),
        data: z.array(DocumentSchema),
      }),
      404: z.object({ error: z.string() }),
      500: z.object({ error: z.string() }),
    },
  },
  createDocument: {
    method: "POST",
    path: "/document",
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ error: z.string() }),
      500: z.object({ error: z.string() }),
    },
    body: z.object({
      docType: z.string(),
      docOrigin: z.string(),
      documentName: z.string(),
      url: z.string().url(),
    }),
  },
});

const healthContract = c.router({
  check: {
    method: "GET",
    path: "/health",
    responses: {
      200: z.object({ message: z.string() }),
    },
  },
});

export const contract = c.router({
  health: healthContract,
  documents: documentContract,
});
