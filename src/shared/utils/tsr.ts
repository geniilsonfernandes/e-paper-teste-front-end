import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { documentContract } from "../contracts";

export const tsr = initTsrReactQuery(documentContract, {
  baseUrl: `${process.env.BASE_URL}`,
  baseHeaders: {
    "x-app-source": "ts-rest",
  },
});
