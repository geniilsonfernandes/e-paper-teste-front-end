import { contract } from "@/shared/contracts";
import prisma from "@/shared/db";

import { createNextRoute, createNextRouter } from "@ts-rest/next";

const postsRouter = createNextRoute(contract.posts, {
  getPosts: async ({ query }) => {
    console.log(query);

    return {
      status: 200,
      body: {
        posts: [
          {
            body: "",
            id: 1,
            title: "title",
            userId: 1,
          },
        ],
        total: 1,
      },
    };
  },
});

const documentsRouter = createNextRoute(contract.documents, {
  getDocuments: async (args) => {
    const {
      query: {
        page = 1,
        docType,
        docOrigin,
        documentName,
        finalDate,
        initialDate,
        amount,
        emitter,
        liquidValue,
      }, // Parâmetros da query com valores padrão
    } = args;

    const invertDate = (date: string) => {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    };

    const currentPage = page;
    const size = 100;

    const skip = (currentPage - 1) * size;

    const totalDocuments = await prisma.document.count();

    const documents = await prisma.document.findMany({
      skip,
      take: size,
      orderBy: { createdAt: "desc" },
      where: {
        ...(docType && { docType: { contains: docType } }),
        ...(docOrigin && { docOrigin: { contains: docOrigin } }),
        ...(documentName && { documentName: { contains: documentName } }),
        ...(emitter && { emitter: { contains: emitter } }),
        ...(amount && { amount: { equals: parseInt(amount.toString()) } }),
        ...(liquidValue && {
          liquidValue: { equals: parseInt(liquidValue.toString()) },
        }),
        ...(initialDate && {
          createdAt: { gte: new Date(invertDate(initialDate)) },
        }),
        ...(finalDate && {
          createdAt: { lte: new Date(invertDate(finalDate)) },
        }),
      },
    });

    // Formatar os documentos
    const formattedDocuments = documents.map((doc) => ({
      ...doc,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));

    return {
      status: 200,
      body: {
        message: "Documents fetched successfully",
        data: formattedDocuments,
        total: totalDocuments,
        totalPages: Math.ceil(totalDocuments / size), // Calcula o total de páginas
        currentPage,
        pageSize: size,
      },
    };
  },
});

// const healthRouter = createNextRoute(apiNested.health, {
//   check: async (args) => {
//     return {
//       status: 200,
//       body: { message: "OK" },
//     };
//   },
// });

const router = createNextRoute(contract, {
  posts: postsRouter,
  documents: documentsRouter,
  // health: healthRouter,
});

export default createNextRouter(contract, router);
