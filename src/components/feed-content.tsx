import { FeedCard } from "@/components/ui/feed-card";
import { Stack } from "@/components/ui/flex";

const mockFeeds = [
  {
    id: "1",
    username: "참새방앗간12456",
    category: "업무·공부 생산성",
    timeAgo: "6시간 전",
    content:
      "가나다라마바사아자차카가나다라마바사아자차카가나다라마바사아자차카가나다라마바사아자차카가나다라마바사아자차카",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    price: 31900,
    voteOptions: [
      { id: "1", label: "사! 가즈아!" },
      { id: "2", label: "애매하긴 해.." },
    ],
    voteCount: 89,
    isVoting: true,
    selectedVoteId: "1",
  },
  {
    id: "2",
    username: "쇼핑러버",
    category: "패션·의류",
    timeAgo: "2시간 전",
    content: "이 가방 너무 이쁜데 가격이 좀 나가네요.. 어떻게 생각하세요?",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    price: 89000,
    voteOptions: [
      { id: "1", label: "갖고 싶으면 사!" },
      { id: "2", label: "좀 더 생각해봐" },
    ],
    voteCount: 156,
    isVoting: true,
  },
  {
    id: "3",
    username: "테크덕후",
    category: "전자기기",
    timeAgo: "1일 전",
    content: "새 키보드 살까 말까 고민중입니다. 기계식 키보드 처음인데 괜찮을까요?",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    price: 159000,
    voteOptions: [
      { id: "1", label: "기계식 좋아! 사!" },
      { id: "2", label: "멤브레인도 괜찮아" },
    ],
    voteCount: 234,
    isVoting: false,
    selectedVoteId: "1",
  },
  {
    id: "4",
    username: "맛집탐험가",
    category: "음식·맛집",
    timeAgo: "3시간 전",
    content: "오마카세 처음 가보려는데 이 가격대면 괜찮은 건가요?",
    voteOptions: [
      { id: "1", label: "가격 대비 좋아보여" },
      { id: "2", label: "좀 비싼 것 같아" },
    ],
    voteCount: 67,
    isVoting: true,
  },
];

function FeedContent() {
  return (
    <div data-slot="feed-content" className="p-[20px]">
      <Stack gap={16}>
        {mockFeeds.map((feed) => (
          <FeedCard
            key={feed.id}
            username={feed.username}
            category={feed.category}
            timeAgo={feed.timeAgo}
            content={feed.content}
            image={feed.image}
            price={feed.price}
            voteOptions={feed.voteOptions}
            voteCount={feed.voteCount}
            isVoting={feed.isVoting}
            selectedVoteId={feed.selectedVoteId}
            onVote={(id) => console.log("Voted:", feed.id, id)}
            onMoreClick={() => console.log("More clicked:", feed.id)}
          />
        ))}
      </Stack>
    </div>
  );
}

export { FeedContent };
