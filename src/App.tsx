import { Route, Routes } from "react-router-dom";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import AppRoutePage from "./pages/app/page";
import HomePage from "./pages/home/page";
import PreRegisterPage from "./pages/pre-register/page";

function App() {
  return (
    <>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<AppRoutePage />} />
        <Route path="/pre-register" element={<PreRegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
