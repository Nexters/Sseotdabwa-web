import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/app-url";

export function getAppStoreUrl(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (ua.includes("android")) return GOOGLE_PLAY_URL;
  return APP_STORE_URL;
}
