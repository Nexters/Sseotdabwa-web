import * as React from "react"
import { GoogleLogin } from "@react-oauth/google"
import type { CredentialResponse } from "@react-oauth/google"
import { useQueryClient } from "@tanstack/react-query"
import { useLoginWithGoogle } from "@/api/auth/auth"
import type { ApiResponseTokenResponse } from "@/api/model"
import { getGetMyInfoQueryKey } from "@/api/users/users"
import { Button, type ButtonProps } from "@/components/ui/button"
import { setTokens } from "@/lib/token"

interface GoogleLoginButtonProps extends Omit<ButtonProps, "onClick"> {
  children: React.ReactNode
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

function GoogleLoginButton({
  children,
  onSuccess,
  onError,
  ...props
}: GoogleLoginButtonProps) {
  const queryClient = useQueryClient()
  const { mutate: loginWithGoogle, isPending } = useLoginWithGoogle()

  const handleCredentialResponse = (response: CredentialResponse) => {
    if (!response.credential) {
      onError?.(new Error("No credential received"))
      return
    }

    loginWithGoogle(
      { data: { idToken: response.credential } },
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
          console.error("Login error:", error)
          onError?.(error)
        },
      }
    )
  }

  return (
    <div className="relative inline-block">
      <Button disabled={isPending} className="pointer-events-none" {...props}>
        {isPending ? "로그인 중..." : children}
      </Button>
      <div className="absolute inset-0 overflow-hidden opacity-[0.01] [&>div]:!h-full [&>div>div]:!h-full [&_iframe]:!h-full [&_iframe]:!w-full">
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => onError?.(new Error("Google login failed"))}
          type="icon"
          shape="rectangular"
          size="large"
        />
      </div>
    </div>
  )
}

export { GoogleLoginButton }
