import * as React from "react";

import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/app-url";

function getStoreUrl(userAgent: string): string | null {
  const ua = userAgent.toLowerCase();

  if (ua.includes("android")) return GOOGLE_PLAY_URL;
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return APP_STORE_URL;
  }
  return null;
}

function AppRoutePage() {
  React.useEffect(() => {
    const url = getStoreUrl(window.navigator.userAgent);
    if (url) {
      window.location.replace(url);
    }
  }, []);

  return null;
}

export default AppRoutePage;
