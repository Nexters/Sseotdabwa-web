import { Route, Routes } from "react-router-dom";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SnackbarProvider } from "@/components/ui/snackbar";
import BridgePage from "./pages/app/bridge-page";
import HomePage from "./pages/home/page";
import PreRegisterPage from "./pages/pre-register/page";

function App() {
  return (
    <SnackbarProvider>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<BridgePage />} />
        <Route path="/pre-register" element={<PreRegisterPage />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
