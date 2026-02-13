import { Icon } from "@/components/ui/icon"
import { Logo } from "@/components/ui/logo"

function NavBar() {
  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[10px] pr-[20px] pb-[10px] pl-[22px]"
    >
      <Logo />
      <div className="flex items-center gap-[24px]">
        <Icon icon="noti-solid" size={20} className="cursor-pointer text-gray-500" />
        <Icon icon="my-solid" size={20} className="cursor-pointer text-gray-500" />
      </div>
    </nav>
  )
}

export { NavBar }
