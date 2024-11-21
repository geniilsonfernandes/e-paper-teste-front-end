import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { documentContract } from "../contracts";

export const tsr = initTsrReactQuery(documentContract, {
  baseUrl: `/api`,
  baseHeaders: {
    "x-app-source": "ts-rest",
  },
});
