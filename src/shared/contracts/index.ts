import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { DocumentSchema } from "../types";

const c = initContract();

export const documentContract = c.router({
  get: {
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
        amount: z.number(),
        liquidValue: z.number(),
        documentName: z.string(),
      })
      .partial(), // Torna todos os campos opcionais
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
});
