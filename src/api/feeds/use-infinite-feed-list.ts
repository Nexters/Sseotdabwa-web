import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  InfiniteData,
  QueryClient,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { getFeedList } from "./feeds";
import type { getFeedListResponse } from "./feeds";
import type { GetFeedListParams } from "../model";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getInfiniteGetFeedListQueryKey = (params?: GetFeedListParams) =>
  [`/api/v1/feeds`, "infinite", ...(params ? [params] : [])] as const;

function extractPageData(page: getFeedListResponse) {
  const raw = page as unknown as {
    data?: { data?: { hasNext?: boolean; nextCursor?: number } };
  };
  return raw?.data?.data;
}

export function useInfiniteGetFeedList(
  params?: Omit<GetFeedListParams, "cursor">,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        getFeedListResponse,
        unknown,
        InfiniteData<getFeedListResponse>,
        getFeedListResponse,
        readonly unknown[],
        number | undefined
      >
    >;
    request?: SecondParameter<typeof getFeedList>;
  },
  queryClient?: QueryClient,
): UseInfiniteQueryResult<InfiniteData<getFeedListResponse>, unknown> {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getInfiniteGetFeedListQueryKey(params);

  return useInfiniteQuery(
    {
      queryKey,
      queryFn: ({ pageParam, signal }) =>
        getFeedList(
          { ...params, cursor: pageParam },
          { signal, ...requestOptions },
        ),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => {
        const pageData = extractPageData(lastPage);
        if (!pageData?.hasNext) return undefined;
        return pageData.nextCursor;
      },
      ...queryOptions,
    },
    queryClient,
  );
}
