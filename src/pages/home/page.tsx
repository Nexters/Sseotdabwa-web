import { useState } from "react";

import { AppBridgeBanner } from "@/components/app-bridge-banner";
import { FeedContent } from "@/components/feed-content";
import { NavBar } from "@/components/nav-bar";
import { Chip } from "@/components/ui/chip";
import { Divider } from "@/components/ui/divider";
import { FAB } from "@/components/ui/fab";
import { Group } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="app-layout flex h-screen w-full justify-center">
      <div className="app-bridge hidden h-screen max-w-[412px]">
        <AppBridgeBanner />
      </div>

      <div className="hide-scrollbar relative h-screen w-full max-w-[540px] overflow-y-auto bg-white">
        <Tabs defaultValue="vote-feed">
          <div className="sticky top-0 z-10 bg-white">
            <NavBar />
            <TabsList className="pl-[20px]">
              <TabsTrigger value="vote-feed" className="px-[4px] py-[12px]">
                투표 피드
              </TabsTrigger>
            </TabsList>
            <Divider size="small" className="bg-gray-100" />
          </div>
          <Group gap={8} className="px-[20px] pt-[16px] pb-[4px]">
            <Chip
              checked={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
            >
              전체
            </Chip>
            <Chip
              checked={selectedFilter === "ongoing"}
              onClick={() => setSelectedFilter("ongoing")}
            >
              진행중 투표
            </Chip>
            <Chip
              checked={selectedFilter === "closed"}
              onClick={() => setSelectedFilter("closed")}
            >
              마감된 투표
            </Chip>
          </Group>
          <TabsContent value="vote-feed">
            <FeedContent />
          </TabsContent>
        </Tabs>
        <FAB className="sticky bottom-[20px] float-right mr-[20px]" />
      </div>
    </div>
  );
}

export default HomePage;
