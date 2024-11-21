import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Dashboard } from "@/modules/dashboard/Dashboard";

import { tsr } from "@/shared/utils/tsr";

export default async function Home() {
  const tsrQueryClient = tsr.initQueryClient(new QueryClient());

  await tsrQueryClient.getDocuments.prefetchQuery({
    queryKey: ["DOCUMENTS", JSON.stringify({})],
  });

  return (
    <HydrationBoundary state={dehydrate(tsrQueryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
