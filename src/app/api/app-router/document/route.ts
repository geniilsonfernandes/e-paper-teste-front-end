import { documentContract } from "@/shared/contracts";
import prisma from "@/shared/db";
import { createNextHandler } from "@ts-rest/serverless/next";

const handler = createNextHandler(
  documentContract,
  {
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
  },
  {
    basePath: "/api/app-router",
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
  }
);

export {
  handler as DELETE,
  handler as GET,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};

