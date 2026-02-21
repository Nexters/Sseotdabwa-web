import * as React from "react";

import { Typography } from "@/components/ui/typography";

function getTargetFromUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("android")) return "Google Play로 이동";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return "App Store로 이동";
  }
  return "desktop!!!";
}

function AppRoutePage() {
  const target = React.useMemo(
    () => getTargetFromUserAgent(window.navigator.userAgent),
    [],
  );

  return (
    <div className="flex min-h-[100svh] min-h-[100dvh] items-center justify-center bg-gray-100 px-5">
      <Typography variant="h2-bold" className="text-gray-900 text-center">
        {target}
      </Typography>
    </div>
  );
}

export default AppRoutePage;
