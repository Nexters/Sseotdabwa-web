import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useGetFeedList } from "@/api/feeds/feeds";
import { ApiError } from "@/api/api-error";
import {
  GetFeedListFeedStatus,
  VoteRequestChoice,
  type FeedResponse,
  type GetFeedListParams,
  type VoteResponse,
} from "@/api/model";
import { useGuestVote } from "@/api/votes/votes";
import { Divider } from "@/components/ui/divider";
import { Stack } from "@/components/ui/flex";
import { FeedCard } from "@/components/ui/feed-card";
import { FeedCardSkeleton } from "@/components/ui/feed-card-skeleton";
import { PreRegisterBanner } from "@/components/ui/pre-register-banner";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { usePreRegister } from "@/pages/pre-register/components/pre-register-provider";

function formatTimeAgo(createdAt?: string) {
  if (!createdAt) return undefined;

  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return undefined;

  const diffMs = Date.now() - created.getTime();
  const diffMin = Math.max(0, Math.floor(diffMs / (1000 * 60)));

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}

function mapCategory(category?: string) {
  if (!category) return undefined;

  const categoryMap: Record<string, string> = {
    LUXURY: "명품",
    FASHION: "패션",
    BEAUTY: "뷰티",
    FOOD: "음식",
    ELECTRONICS: "전자기기",
    TRAVEL: "여행",
    HEALTH: "건강",
    BOOK: "도서",
    ETC: "기타",
  };

  return categoryMap[category] ?? category;
}

function toImageUrl(feed: FeedResponse) {
  if (feed.viewUrl) return feed.viewUrl;
  const key = feed.s3ObjectKey;
  if (!key) return undefined;
  if (key.startsWith("http://") || key.startsWith("https://")) return key;
  return undefined;
}

function FeedContentErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      data-slot="feed-content-error"
      className="flex w-full flex-col items-center px-5 pt-[140px]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="pt-[10px] pr-[20px] pb-[10px] pl-[16px]">
          <img
            src="/error-image.png"
            alt="피드 로딩 에러"
            className="h-[120px] w-[104px]"
          />
        </div>

        <div className="flex flex-col items-center gap-5">
          <Typography variant="t1-bold" className="text-gray-800">
            내용을 불러오지 못했어요
          </Typography>
          <Button variant="neutral" size="small" onClick={onRetry}>
            새로고침
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeedContentEmptyFallback() {
  return (
    <div
      data-slot="feed-content-empty"
      className="flex w-full flex-col items-center px-5 pt-[140px]"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src="/empty-image.png"
          alt="빈 피드"
          className="h-[120px] w-[104px]"
        />
        <Stack gap={6} align="center">
          <Typography variant="t1-bold" className="text-gray-800">
            아직 올라온 투표가 없어요
          </Typography>
        </Stack>
      </div>
    </div>
  );
}

class FeedContentErrorBoundary extends Component<
  { children: ReactNode; onErrorChange?: (hasError: boolean) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: ReactNode;
    onErrorChange?: (hasError: boolean) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onErrorChange?.(true);
    console.error("FeedContent render error", error, errorInfo);
  }

  handleRetry = () => {
    this.props.onErrorChange?.(false);
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <FeedContentErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

interface VoteState {
  selectedId: string;
  yesCount: number;
  noCount: number;
}

const BANNER_INSERT_AFTER = 3;

type FeedFilter = "all" | "ongoing" | "closed";

function FeedContentBody({ filter }: { filter: FeedFilter }) {
  const [votes, setVotes] = useState<Record<string, VoteState>>({});
  const params = useMemo<GetFeedListParams | undefined>(() => {
    if (filter === "ongoing") {
      return { feedStatus: GetFeedListFeedStatus.OPEN };
    }
    if (filter === "closed") {
      return { feedStatus: GetFeedListFeedStatus.CLOSED };
    }
    return undefined;
  }, [filter]);
  const queryKey = useMemo(
    () => ["/api/v1/feeds", { filter }] as const,
    [filter],
  );
  const { data, isLoading, isError, error } = useGetFeedList(params, {
    query: {
      queryKey,
      refetchOnMount: "always",
    },
  });
  const { mutate: guestVote } = useGuestVote();
  const { open: openPreRegister } = usePreRegister();

  const feeds = useMemo(() => {
    const raw = data as unknown as {
      data?: {
        data?: FeedResponse[] | { content?: FeedResponse[] };
      };
    };
    const payload = raw?.data?.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    return [];
  }, [data]);

  const handleVote = (
    feedId: string,
    optionId: string,
    originalYes: number,
    originalNo: number,
  ) => {
    const numericFeedId = Number(feedId);
    const choice =
      optionId === "yes" ? VoteRequestChoice.YES : VoteRequestChoice.NO;

    guestVote(
      { feedId: numericFeedId, data: { choice } },
      {
        onSuccess: (res) => {
          // customFetch returns { data: ApiResponse, status, headers }
          // ApiResponse is { data: VoteResponse, message, status, errorCode }
          const raw = res as unknown as { data?: { data?: VoteResponse } };
          const voteData = raw?.data?.data;
          setVotes((prev) => ({
            ...prev,
            [feedId]: {
              selectedId: optionId,
              yesCount:
                voteData?.yesCount ??
                originalYes + (optionId === "yes" ? 1 : 0),
              noCount:
                voteData?.noCount ?? originalNo + (optionId === "no" ? 1 : 0),
            },
          }));
        },
        onError: (err) => {
          console.error("[vote error]", err);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div
        data-slot="feed-content"
        className="flex flex-col gap-[20px] px-[20px] pt-[20px] pb-[60px]"
      >
        <FeedCardSkeleton />
        <Divider size="small" className="bg-gray-100" />
        <FeedCardSkeleton />
      </div>
    );
  }

  if (isError)
    throw ApiError.isApiError(error)
      ? error
      : new Error("Failed to fetch feed list");

  if (feeds.length === 0) {
    return <FeedContentEmptyFallback />;
  }

  return (
    <div
      data-slot="feed-content"
      className="flex flex-col gap-[20px] px-[20px] pt-[20px] pb-[60px]"
    >
      {feeds.map((feed, index) => {
        const id = String(feed.feedId ?? index);
        const voteState = votes[id];

        // 로그인 유저의 기존 투표 선택을 서버 응답에서 초기값으로 사용
        const serverSelectedId =
          feed.hasVoted && feed.myVoteChoice
            ? feed.myVoteChoice.toLowerCase() // "YES" -> "yes", "NO" -> "no"
            : undefined;
        const selectedVoteId = voteState?.selectedId ?? serverSelectedId;

        const yes = voteState?.yesCount ?? feed.yesCount ?? 0;
        const no = voteState?.noCount ?? feed.noCount ?? 0;
        const total = yes + no;

        const voteOptions = [
          {
            id: "yes",
            label: "사! 가즈아!",
            percentage: total > 0 ? Math.round((yes / total) * 100) : 0,
          },
          {
            id: "no",
            label: "애매하긴 해..",
            percentage: total > 0 ? Math.round((no / total) * 100) : 0,
          },
        ];

        const showBannerAfter = index === BANNER_INSERT_AFTER - 1;

        return (
          <>
            <FeedCard
              key={id}
              username={feed.author?.nickname}
              profileImage={feed.author?.profileImage}
              category={mapCategory(feed.category)}
              timeAgo={formatTimeAgo(feed.createdAt)}
              content={feed.content}
              image={toImageUrl(feed)}
              imageWidth={feed.imageWidth ?? undefined}
              imageHeight={feed.imageHeight ?? undefined}
              price={feed.price}
              voteOptions={voteOptions}
              voteCount={total}
              isVoting={feed.feedStatus !== "CLOSED"}
              selectedVoteId={selectedVoteId}
              onVote={(optionId) =>
                handleVote(id, optionId, feed.yesCount ?? 0, feed.noCount ?? 0)
              }
              onMoreClick={() => console.log("More clicked:", id)}
            />
            {showBannerAfter && (
              <>
                <PreRegisterBanner onClick={openPreRegister} />
                <Divider size="small" className="bg-gray-100" />
              </>
            )}
            {!showBannerAfter && index < feeds.length - 1 && (
              <Divider
                key={`divider-${id}`}
                size="small"
                className="bg-gray-100"
              />
            )}
          </>
        );
      })}
    </div>
  );
}

interface FeedContentProps {
  filter: FeedFilter;
  onErrorChange?: (hasError: boolean) => void;
}

function FeedContent({ filter, onErrorChange }: FeedContentProps) {
  useEffect(() => {
    onErrorChange?.(false);
  }, [onErrorChange]);

  return (
    <FeedContentErrorBoundary onErrorChange={onErrorChange}>
      <FeedContentBody filter={filter} />
    </FeedContentErrorBoundary>
  );
}

export { FeedContent };
export type { FeedFilter };
