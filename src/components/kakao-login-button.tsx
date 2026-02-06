import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useLoginWithKakao } from "@/api/auth/auth"
import type { ApiResponseTokenResponse } from "@/api/model"
import { getGetMyInfoQueryKey } from "@/api/users/users"
import { Button } from "@/components/ui/button"
import { setTokens } from "@/lib/token"

interface KakaoLoginButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: React.ReactNode
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

function KakaoLoginButton({
  children,
  onSuccess,
  onError,
  ...props
}: KakaoLoginButtonProps) {
  const queryClient = useQueryClient()
  const { mutate: loginWithKakao, isPending } = useLoginWithKakao()

  const handleClick = () => {
    // TODO: 실제 Kakao OAuth 토큰을 받아와야 함
    const accessToken = prompt("Kakao Access Token을 입력하세요:")
    if (!accessToken) return

    loginWithKakao(
      { data: { accessToken } },
      {
        onSuccess: (res) => {
          const tokenData = res.data as unknown as ApiResponseTokenResponse
          if (tokenData.data?.accessToken && tokenData.data?.refreshToken) {
            setTokens(tokenData.data.accessToken, tokenData.data.refreshToken)
            queryClient.invalidateQueries({ queryKey: getGetMyInfoQueryKey() })
          }
          onSuccess?.()
        },
        onError: (error) => {
          onError?.(error)
        },
      }
    )
  }

  return (
    <Button onClick={handleClick} disabled={isPending} {...props}>
      {isPending ? "로그인 중..." : children}
    </Button>
  )
}

export { KakaoLoginButton }
