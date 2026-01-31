import * as React from "react";

import { cn } from "@/lib/utils";
import { Group, Stack } from "@/components/ui/flex";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";

interface VoteOption {
  id: string;
  label: string;
}

interface FeedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profileImage?: string;
  username: string;
  category?: string;
  timeAgo: string;
  content: string;
  image?: string;
  price?: number;
  voteOptions: VoteOption[];
  voteCount: number;
  isVoting?: boolean;
  selectedVoteId?: string;
  onVote?: (optionId: string) => void;
  onMoreClick?: () => void;
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
  return (
    <div
      data-slot="feed-card"
      className={cn("w-full bg-white", className)}
      {...props}
    >
      <Stack gap={16} className="px-4 py-4">
        {/* Header */}
        <Group align="center" justify="between">
          <Group gap={10} align="center">
            {/* Profile Image */}
            <div className="size-[32px] rounded-full bg-gray-300 overflow-hidden shrink-0">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={username}
                  className="size-full object-cover"
                />
              )}
            </div>

            {/* User Info */}
            <Stack gap={3}>
              <Group gap={4} align="center">
                <Typography variant="b6-medium" className="text-gray-800">
                  {username}
                </Typography>
                {category && (
                  <>
                    <Icon icon="right" size={12} className="text-gray-600" />
                    <Typography variant="b6-medium" className="text-gray-600">
                      {category}
                    </Typography>
                  </>
                )}
              </Group>
              <Typography variant="b7-medium" className="text-gray-600">
                {timeAgo}
              </Typography>
            </Stack>
          </Group>

          {/* More Button */}
          <button type="button" onClick={onMoreClick} className="p-1">
            <Icon icon="dots-solid" size={20} className="text-gray-600" />
          </button>
        </Group>

        <Stack gap={12} className="bg-gray-100 rounded-2xl px-4 py-3.5">
          {/* Content */}
          <Typography variant="p4-medium" className="text-gray-900">
            {content}
          </Typography>

          {/* Image with Price */}
          {image && (
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
              <img
                src={image}
                alt="Feed content"
                className="size-full object-cover"
              />
              {price !== undefined && (
                <Group
                  gap={4}
                  align="center"
                  className="absolute left-[16px] bottom-[16px]"
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
            {/* Vote Options */}
            <Stack gap={8}>
              {voteOptions.map((option) => {
                const isSelected = selectedVoteId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onVote?.(option.id)}
                    className={cn(
                      "w-full px-[14px] py-[12px] rounded-[8px] text-left transition-colors",
                      isSelected
                        ? "bg-gray-900"
                        : "bg-gray-100 hover:bg-gray-200",
                    )}
                  >
                    <Typography
                      variant="s3-semibold"
                      className={isSelected ? "text-white" : "text-gray-900"}
                    >
                      {option.label}
                    </Typography>
                  </button>
                );
              })}
            </Stack>

            {/* Vote Status */}
            <Typography variant="b7-medium" className="text-gray-600">
              {voteCount}명이 투표했어요 · {isVoting ? "진행중" : "종료"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export { FeedCard };
export type { FeedCardProps, VoteOption };
