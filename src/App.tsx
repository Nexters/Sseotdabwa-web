import { NavBar } from "./components/nav-bar";
import TabsExamplePage from "./pages/example/page";

function App() {
  return (
    <div className="mx-auto max-w-[540px]">
      <NavBar />
      <TabsExamplePage />
    </div>
  );
}

export default App;
