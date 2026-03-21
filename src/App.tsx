import { Route, Routes } from "react-router-dom";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SnackbarProvider } from "@/components/ui/snackbar";
import BridgePage from "./pages/app/bridge-page";
import HomePage from "./pages/home/page";

function App() {
  return (
    <SnackbarProvider>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<BridgePage />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
