import { Route, Routes } from "react-router-dom";

import AppRoutePage from "./pages/app/page";
import HomePage from "./pages/home/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppRoutePage />} />
    </Routes>
  );
}

export default App;
