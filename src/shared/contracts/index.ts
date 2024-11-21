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

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const postContract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    responses: {
      200: c.type<{ posts: Post[]; total: number }>(),
    },
    query: z.object({
      take: z.string().transform(Number).optional(),
      skip: z.string().transform(Number).optional(),
      search: z.string().optional(),
    }),
    summary: "Get all posts",
  },
});

export const contract = c.router({
  posts: postContract,
  documents: documentContract,
});