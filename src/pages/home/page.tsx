import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppBridgeBanner } from "@/components/app-bridge-banner";
import { FeedContent, type FeedFilter } from "@/components/feed-content";
import { NavBar } from "@/components/nav-bar";
import { BridgeBanner } from "@/components/ui/bridge-banner";
import { Chip } from "@/components/ui/chip";
import { Divider } from "@/components/ui/divider";
import { Group } from "@/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSnackbar } from "@/components/ui/snackbar";

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState<FeedFilter>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContainer: setSnackbarContainer } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setSnackbarContainer(containerRef.current);
    return () => {
      setSnackbarContainer(null);
    };
  }, [setSnackbarContainer]);

  const handleAppClick = useCallback(() => {
    navigate("/app");
  }, [navigate]);

  return (
    <div className="app-layout flex w-full justify-center h-[100svh]">
      <div className="app-bridge hidden max-w-[412px] sticky top-0 self-start h-[100svh] h-[100dvh]">
        <AppBridgeBanner />
      </div>

      <div ref={containerRef} className="relative w-full max-w-[540px]">
        <div className="bg-white pb-[env(safe-area-inset-bottom)] h-full">
          <Tabs defaultValue="vote-feed" className="h-full">
            <div className="sticky top-0 z-10 bg-white">
              {/* App Bridge Banner */}
              <BridgeBanner onAppClick={handleAppClick} />
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
              <FeedContent filter={selectedFilter} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
