import { NavBar } from "./components/nav-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import TabsExamplePage from "./pages/example/page";

function App() {
  return (
    <div className="mx-auto max-w-[540px]">
      <NavBar />
      <Tabs defaultValue="vote-feed">
        <TabsList>
          <TabsTrigger value="vote-feed">투표 피드</TabsTrigger>
          <TabsTrigger value="product-review">상품 리뷰</TabsTrigger>
        </TabsList>
        <TabsContent value="vote-feed">
          <TabsExamplePage />
        </TabsContent>
        <TabsContent value="product-review">
          <div className="p-4">상품 리뷰 콘텐츠</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
