export enum docTypes {
  payment = "payment",
  contract = "contract",
  invoice = "invoice",
  receipt = "receipt",
  statement = "statement",
  contractService = "contractService",
}

export enum docOrigin {
  bank = "bank",
  company = "company",
  person = "person",
}

export type Document = {
  id: string;
  code: string;
  docType: docTypes;
  docOrigin: docOrigin;
  documentName: string;
  emitter: string;
  amount: number;
  liquidValue: number;
  createdAt: string;
  updatedAt: string;
};
