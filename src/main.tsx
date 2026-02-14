import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter } from "react-router-dom"
import { ImageModalProvider } from "@/components/ui/image-modal"
import { QRModalProvider } from "@/components/ui/qr-modal"
import "./index.css"
import App from "./App.tsx"

const queryClient = new QueryClient()

const GOOGLE_CLIENT_ID =
  "364719359261-17n2pv8jajf3ub8t0fn6q69k2cu1u1i4.apps.googleusercontent.com"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <QRModalProvider>
            <ImageModalProvider>
              <App />
            </ImageModalProvider>
          </QRModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
