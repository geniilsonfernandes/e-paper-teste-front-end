import { contract } from "@/shared/contracts";
import prisma from "@/shared/db";
import { createNextRoute, createNextRouter } from "@ts-rest/next";

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
      },
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
        totalPages: Math.ceil(totalDocuments / size),
        currentPage,
        pageSize: size,
      },
    };
  },
});

const healthRouter = createNextRoute(contract.health, {
  check: async (args) => {
    return {
      status: 200,
      body: { message: "OK" },
    };
  },
});

const router = createNextRoute(contract, {
  health: healthRouter,
  documents: documentsRouter,
});


export default createNextRouter(contract, router);
