import { FeedContent } from "./components/feed-content";
import { NavBar } from "./components/nav-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <div className="mx-auto max-w-[540px]">
      <NavBar />
      <Tabs defaultValue="vote-feed">
        <TabsList className="sticky top-0 pl-[20px]">
          <TabsTrigger value="vote-feed">투표 피드</TabsTrigger>
          <TabsTrigger value="product-review">상품 리뷰</TabsTrigger>
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
