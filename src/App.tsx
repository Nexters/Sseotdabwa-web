import { AppBridgeBanner } from "./components/app-bridge-banner";
import { FeedContent } from "./components/feed-content";
import { NavBar } from "./components/nav-bar";
import { Divider } from "./components/ui/divider";
import { FAB } from "./components/ui/fab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import ExamplePage from "./pages/example/page";

function App() {
  return (
    <div className="app-layout flex h-screen w-full justify-center">
      {/* 앱 브릿지 배너 - 1052px 이상에서만 표시 */}
      <div className="app-bridge hidden h-screen max-w-[412px]">
        <AppBridgeBanner />
      </div>

      {/* 메인 앱 영역 */}
      <div className="hide-scrollbar relative h-screen w-full max-w-[540px] overflow-y-auto bg-white">
        <NavBar />
        <Tabs defaultValue="vote-feed">
          <div className="sticky top-0 z-10 bg-white">
            <TabsList className="pl-[20px]">
              <TabsTrigger value="vote-feed" className="px-[4px] py-[12px]">
                투표 피드
              </TabsTrigger>
              <TabsTrigger value="product-review" className="px-[4px] py-[12px]">
                상품 리뷰
              </TabsTrigger>
            </TabsList>
            <Divider size="small" className="bg-gray-100" />
          </div>
          <TabsContent value="vote-feed">
            <FeedContent />
          </TabsContent>
          <TabsContent value="product-review">
            <ExamplePage />
          </TabsContent>
        </Tabs>
        <FAB className="sticky bottom-[20px] float-right mr-[20px]" />
      </div>
    </div>
  );
}

export default App;
