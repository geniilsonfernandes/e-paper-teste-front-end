import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Dashboard } from "@/modules/dashboard/Dashboard";

import { CACHE_KEY_DOCUMENTS } from "@/shared/endpoint/document/useDocumentsQuery";
import { tsr } from "@/shared/utils/tsr";

export default async function Home() {
  const tsrQueryClient = tsr.initQueryClient(new QueryClient());

  await tsrQueryClient.get.prefetchQuery({
    queryKey: [CACHE_KEY_DOCUMENTS, JSON.stringify({})],
  });

  return (
    <HydrationBoundary state={dehydrate(tsrQueryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
