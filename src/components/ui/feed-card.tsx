import * as React from "react";

import { Group, Stack } from "@/components/ui/flex";
import { Icon } from "@/components/ui/icon";
import { useOpenImageModal } from "@/components/ui/image-modal";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface VoteOption {
  id: string;
  label: string;
  percentage?: number;
}

type VoteStatus = "default" | "voted" | "ended";

interface FeedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profileImage?: string;
  username?: string;
  category?: string;
  timeAgo?: string;
  content?: string;
  image?: string;
  price?: number;
  voteOptions: VoteOption[];
  voteCount?: number;
  isVoting?: boolean;
  selectedVoteId?: string;
  onVote?: (optionId: string) => void;
  onMoreClick?: () => void;
}

function VoteOptionButton({
  option,
  status,
  isSelected,
  isWinner,
  isTie,
  onVote,
}: {
  option: VoteOption;
  status: VoteStatus;
  isSelected: boolean;
  isWinner: boolean;
  isTie: boolean;
  onVote?: (optionId: string) => void;
}) {
  const percentage = option.percentage ?? 0;
  const [animatedWidth, setAnimatedWidth] = React.useState(0);

  React.useEffect(() => {
    if (status !== "default") {
      const timer = setTimeout(() => setAnimatedWidth(percentage), 50);
      return () => clearTimeout(timer);
    }
    setAnimatedWidth(0);
  }, [status, percentage]);

  const isDefault = status === "default";
  const showDark = isDefault
    ? false
    : status === "ended"
      ? isTie || isWinner
      : isSelected;

  const Wrapper = isDefault ? "button" : "div";

  return (
    <Wrapper
      {...(isDefault
        ? {
            type: "button" as const,
            onClick: () => onVote?.(option.id),
          }
        : {})}
      className={cn(
        "relative w-full overflow-hidden rounded-[8px] border text-left",
        isDefault
          ? "cursor-pointer border-gray-300 bg-gray-0 transition-colors hover:bg-gray-100"
          : showDark
            ? "border-gray-300"
            : "border-transparent",
      )}
    >
      {/* 배경 레이어 */}
      {!isDefault && <div className="absolute inset-0 bg-gray-0" />}

      {/* 비율 채움 바 */}
      {!isDefault && (
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-l-[8px] transition-[width] duration-700 ease-out",
            showDark ? "bg-gray-900" : "bg-gray-400",
          )}
          style={{ width: `${animatedWidth}%` }}
        />
      )}

      {/* 기본 콘텐츠 */}
      <div className="relative flex items-center justify-between px-[15px] py-[14px]">
        <Typography
          variant="s3-semibold"
          className={
            isDefault
              ? "text-gray-900"
              : showDark
                ? "text-gray-900"
                : "text-gray-700"
          }
        >
          {option.label}
        </Typography>
        {!isDefault && (
          <Group gap={6} align="center">
            {isSelected && status === "voted" && (
              <Icon icon="my-solid" size={15} className="text-gray-600" />
            )}
            <Typography
              variant="s3-semibold"
              className={showDark ? "text-gray-900" : "text-gray-700"}
            >
              {percentage}%
            </Typography>
          </Group>
        )}
      </div>

      {/* 흰색 텍스트 레이어 (검은 바 위에 clip) */}
      {!isDefault && showDark && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-between px-[15px] py-[14px] transition-[clip-path] duration-700 ease-out"
          style={{
            clipPath: `inset(0 ${100 - animatedWidth}% 0 0)`,
          }}
          aria-hidden="true"
        >
          <Typography variant="s3-semibold" className="text-gray-0">
            {option.label}
          </Typography>
          <Group gap={6} align="center">
            {isSelected && status === "voted" && (
              <Icon icon="my-solid" size={15} className="text-gray-0" />
            )}
            <Typography variant="s3-semibold" className="text-gray-0">
              {percentage}%
            </Typography>
          </Group>
        </div>
      )}
    </Wrapper>
  );
}

function FeedCard({
  profileImage,
  username,
  category,
  timeAgo,
  content,
  image,
  price,
  voteOptions,
  voteCount,
  isVoting = true,
  selectedVoteId,
  onVote,
  onMoreClick,
  className,
  ...props
}: FeedCardProps) {
  const { open: openImageModal } = useOpenImageModal();

  const hasVoted = selectedVoteId !== undefined;
  const status: VoteStatus = hasVoted
    ? isVoting
      ? "voted"
      : "ended"
    : isVoting
      ? "default"
      : "ended";

  const maxPercentage = Math.max(...voteOptions.map((o) => o.percentage ?? 0));
  const winnersCount = voteOptions.filter(
    (o) => (o.percentage ?? 0) === maxPercentage,
  ).length;
  const isTie = winnersCount > 1 && maxPercentage > 0;

  const statusLabel = isVoting ? "진행중" : "최종결과";

  return (
    <div
      data-slot="feed-card"
      className={cn("w-full bg-white", className)}
      {...props}
    >
      <Stack gap={16}>
        {/* Header */}
        <Group align="center" justify="between">
          {(profileImage || username || category || timeAgo) && (
            <Group gap={10} align="center">
              {profileImage && (
                <div className="size-[32px] shrink-0 overflow-hidden rounded-full bg-gray-300">
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt={username}
                      className="size-full object-cover"
                    />
                  )}
                </div>
              )}

              <Stack gap={3}>
                {(username || category) && (
                  <Group gap={4} align="center">
                    {username && (
                      <Typography variant="b6-medium" className="text-gray-800">
                        {username}
                      </Typography>
                    )}
                    {category && (
                      <>
                        <Icon
                          icon="right"
                          size={12}
                          className="text-gray-600"
                        />
                        <Typography
                          variant="b6-medium"
                          className="text-gray-600"
                        >
                          {category}
                        </Typography>
                      </>
                    )}
                  </Group>
                )}
                {timeAgo && (
                  <Typography variant="b7-medium" className="text-gray-600">
                    {timeAgo}
                  </Typography>
                )}
              </Stack>
            </Group>
          )}
        </Group>

        <Stack gap={12} className="rounded-2xl bg-gray-100 px-4 py-3.5">
          {content && (
            <Typography variant="p4-medium" className="text-gray-900">
              {content}
            </Typography>
          )}

          {image && (
            <div className="relative aspect-[1] w-full overflow-hidden rounded-[12px]">
              <img
                src={image}
                alt="Feed content"
                className="size-full object-cover transition-transform duration-300 ease-out hover:scale-105"
              />
              <button
                type="button"
                aria-label="이미지 확대"
                onClick={() => openImageModal(image, "Feed content enlarged")}
                className="absolute right-[12px] top-[12px] inline-flex size-[30px] items-center justify-center rounded-[8px] bg-gray-1000/50 text-gray-300 transition-colors hover:bg-gray-1000/65"
              >
                <Icon icon="expand" size={18} className="text-gray-300" />
              </button>
              {price !== undefined && (
                <Group
                  gap={4}
                  align="center"
                  className="absolute bottom-[16px] left-[16px]"
                >
                  <Icon icon="krw" size={18} className="text-white" />
                  <Typography variant="t1-bold" className="text-white">
                    {price.toLocaleString()}
                  </Typography>
                </Group>
              )}
            </div>
          )}

          <Stack gap={10}>
            <Stack gap={8}>
              {voteOptions.map((option) => {
                const isSelected = selectedVoteId === option.id;
                const isWinner =
                  (option.percentage ?? 0) === maxPercentage &&
                  maxPercentage > 0;

                return (
                  <VoteOptionButton
                    key={option.id}
                    option={option}
                    status={status}
                    isSelected={isSelected}
                    isWinner={isWinner}
                    isTie={isTie}
                    onVote={onVote}
                  />
                );
              })}
            </Stack>

            {voteCount !== undefined && voteCount > 0 && (
              <Typography variant="b7-medium" className="text-gray-600">
                {voteCount}명이 투표했어요 · {statusLabel}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export { FeedCard };
export type { FeedCardProps, VoteOption };
