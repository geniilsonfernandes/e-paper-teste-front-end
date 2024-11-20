import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { documentContract } from "../contracts";

export const tsr = initTsrReactQuery(documentContract, {
  baseUrl: "http://localhost:3000/api/app-router",
  baseHeaders: {
    "x-app-source": "ts-rest",
  },
});
