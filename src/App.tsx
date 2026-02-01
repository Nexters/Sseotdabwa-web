import { FeedContent } from "./components/feed-content";
import { NavBar } from "./components/nav-bar";
import { Divider } from "./components/ui/divider";
import { FAB } from "./components/ui/fab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import ExamplePage from "./pages/example/page";

function App() {
  return (
    <div className="hide-scrollbar relative mx-auto h-screen max-w-[540px] overflow-y-auto bg-white">
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
      <FAB className="fixed bottom-[20px] right-[20px]" />
    </div>
  );
}

export default App;
