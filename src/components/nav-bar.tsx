import { useGetMyInfo } from "@/api/users/users"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Icon } from "@/components/ui/icon"
import { Logo } from "@/components/ui/logo"

function NavBar() {
  const { data: userInfo } = useGetMyInfo()

  const isLoggedIn = userInfo?.status === 200

  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[10px] pr-[20px] pb-[10px] pl-[22px]"
    >
      <Logo />
      {isLoggedIn ? (
        <div className="flex items-center gap-[24px]">
          <Icon icon="noti-solid" size={20} className="cursor-pointer text-gray-500" />
          <Icon icon="my-solid" size={20} className="cursor-pointer text-gray-500" />
        </div>
      ) : (
        <GoogleLoginButton variant="outline" size="small">
          로그인/회원가입
        </GoogleLoginButton>
      )}
    </nav>
  )
}

export { NavBar }
