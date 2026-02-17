/**
 * Google Analytics 4 (GA4) 유틸리티
 * 페이지뷰 및 커스텀 이벤트 추적
 */

// GA4 Measurement ID (환경 변수에서 가져옴)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

/**
 * GA4가 로드되었는지 확인
 */
function isGALoaded(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function"
}

/**
 * GA4 초기화 여부 확인
 */
export function isGAEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX")
}

/**
 * 페이지뷰 이벤트 전송
 * React Router의 라우트 변경 시 자동으로 호출됨
 */
export function trackPageView(path: string, title?: string) {
  if (!isGAEnabled() || !isGALoaded()) return

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
  })
}

/**
 * 커스텀 이벤트 전송
 * @param eventName - 이벤트 이름 (예: "button_click", "purchase")
 * @param eventParams - 이벤트 매개변수
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (!isGAEnabled() || !isGALoaded()) return

  window.gtag("event", eventName, eventParams)
}

/**
 * 외부 링크 클릭 추적
 */
export function trackOutboundLink(url: string, eventParams?: Record<string, unknown>) {
  trackEvent("click", {
    link_url: url,
    link_domain: new URL(url).hostname,
    outbound: true,
    ...eventParams,
  })
}

/**
 * 검색 이벤트 추적
 */
export function trackSearch(searchTerm: string) {
  trackEvent("search", {
    search_term: searchTerm,
  })
}

/**
 * 사용자 속성 설정
 */
export function setUserProperties(properties: Record<string, unknown>) {
  if (!isGAEnabled() || !isGALoaded()) return

  window.gtag("set", "user_properties", properties)
}

/**
 * 사용자 ID 설정
 */
export function setUserId(userId: string) {
  if (!isGAEnabled() || !isGALoaded()) return

  window.gtag("config", GA_MEASUREMENT_ID, {
    user_id: userId,
  })
}

// TypeScript 타입 선언
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "set" | "js",
      targetOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
