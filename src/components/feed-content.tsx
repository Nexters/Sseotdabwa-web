import { Component, type ErrorInfo, type ReactNode, useMemo, useState } from "react";

import { useGetFeedList } from "@/api/feeds/feeds";
import type { FeedResponse } from "@/api/model";
import { Divider } from "@/components/ui/divider";
import { FeedCard } from "@/components/ui/feed-card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

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

function toImageUrl(s3ObjectKey?: string) {
  if (!s3ObjectKey) return undefined;
  if (s3ObjectKey.startsWith("http://") || s3ObjectKey.startsWith("https://")) {
    return s3ObjectKey;
  }
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

class FeedContentErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("FeedContent render error", error, errorInfo);
  }

  handleRetry = () => {
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

function FeedContentBody() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const { data, isLoading, isError } = useGetFeedList();

  const feeds = useMemo(() => {
    const raw = data as unknown as { data?: { data?: FeedResponse[] } };
    return raw?.data?.data ?? [];
  }, [data]);

  const handleVote = (feedId: string, optionId: string) => {
    setVotes((prev) => ({ ...prev, [feedId]: optionId }));
  };

  if (isLoading) {
    return (
      <div data-slot="feed-content" className="px-[20px] py-[24px] text-gray-600">
        피드를 불러오는 중...
      </div>
    );
  }

  if (isError) throw new Error("Failed to fetch feed list");

  return (
    <div
      data-slot="feed-content"
      className="flex flex-col gap-[20px] px-[20px] pt-[20px] pb-[60px]"
    >
      {feeds.map((feed, index) => {
        const id = String(feed.feedId ?? index);
        const yes = feed.yesCount ?? 0;
        const no = feed.noCount ?? 0;
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

        return (
          <div key={id}>
            <FeedCard
              username={feed.author?.nickname}
              profileImage={feed.author?.profileImage}
              category={mapCategory(feed.category)}
              timeAgo={formatTimeAgo(feed.createdAt)}
              content={feed.content}
              image={toImageUrl(feed.s3ObjectKey)}
              price={feed.price}
              voteOptions={voteOptions}
              voteCount={total}
              isVoting={feed.feedStatus !== "CLOSED"}
              selectedVoteId={votes[id]}
              onVote={(optionId) => handleVote(id, optionId)}
              onMoreClick={() => console.log("More clicked:", id)}
            />
            {index < feeds.length - 1 && <Divider size="small" className="bg-gray-100" />}
          </div>
        );
      })}
    </div>
  );
}

function FeedContent() {
  return (
    <FeedContentErrorBoundary>
      <FeedContentBody />
    </FeedContentErrorBoundary>
  );
}

export { FeedContent };
