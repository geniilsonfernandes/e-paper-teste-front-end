import { DataTableDocuments } from "@/components/DataTable";
import { Document } from "@/shared/types";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Document[] = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  code: "123456" + (index + 1),
  documentName: "Document Name" + (index + 1),
  emitter: "Emitter Name",
  amount: 500,
  liquidValue: 100,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function Home() {
  return (
    <div className="py-4">
      <DataTableDocuments data={data} />
    </div>
  );
}
