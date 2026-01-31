import { FeedContent } from "./components/feed-content";
import { NavBar } from "./components/nav-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <div className="mx-auto max-w-[540px]">
      <NavBar />
      <Tabs defaultValue="vote-feed">
        <TabsList className="sticky top-0 z-10 bg-white pl-[20px]">
          <TabsTrigger value="vote-feed" className="px-4 py-[12px]">투표 피드</TabsTrigger>
          <TabsTrigger value="product-review" className="px-4 py-[12px]">상품 리뷰</TabsTrigger>
        </TabsList>
        <TabsContent value="vote-feed">
          <FeedContent />
        </TabsContent>
        <TabsContent value="product-review">
          <div className="p-4">상품 리뷰 콘텐츠</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
