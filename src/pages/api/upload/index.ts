import prisma from "@/shared/db";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

function runMiddleware(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {
  const multerUpload = multer({ dest: "uploads/" });

  await runMiddleware(req, res, multerUpload.single("file"));
  const file = req.file;
  const { docType, docOrigin } = req.body;

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "documents",
    });

    const document = await prisma.document.create({
      data: {
        docType,
        docOrigin,
        url: result.secure_url,
        amount: Math.floor(Math.random() * 1000),
        code: Math.random().toString(36).substring(2),
        documentName: file.originalname,
        emitter: "user-test",
        liquidValue: Math.floor(Math.random() * 1000),
      },
    });

    res.status(200).json({
      message: "File uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    res.status(500).json({ error: "Error uploading file" });
  }
};

export default handler;
