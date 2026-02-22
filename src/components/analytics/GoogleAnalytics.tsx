import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackPageView, isGAEnabled } from "@/lib/analytics"

/**
 * Google Analytics 4 컴포넌트
 * - GA4 스크립트를 동적으로 로드
 * - React Router와 연동하여 페이지뷰 자동 추적
 */
function GoogleAnalytics() {
  const location = useLocation()

  // GA4 스크립트 로드
  useEffect(() => {
    if (!isGAEnabled()) {
      console.info(
        "[GA4] Google Analytics is disabled. Set VITE_GA_MEASUREMENT_ID in .env to enable."
      )
      return
    }

    // 이미 로드된 경우 스킵
    if (typeof window.gtag === "function") {
      return
    }

    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

    // gtag.js 스크립트 동적 로드
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // dataLayer 초기화
    // GA4는 반드시 arguments 객체를 사용해야 함 (rest params 사용 시 데이터 전송 안 됨)
    window.dataLayer = window.dataLayer || []
    // eslint-disable-next-line prefer-rest-params
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag as typeof window.gtag

    // GA4 초기화
    window.gtag("js", new Date())
    window.gtag("config", measurementId)

    console.info(`[GA4] Initialized with ID: ${measurementId}`)
  }, [])

  // 라우트 변경 시 페이지뷰 추적
  useEffect(() => {
    if (!isGAEnabled()) return

    const path = location.pathname + location.search
    trackPageView(path)
  }, [location])

  return null
}

export { GoogleAnalytics }
