import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

function NavBar() {
  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[10px] pr-[20px] pb-[10px] pl-[22px]"
    >
      <Logo />
      <Button variant="outline" size="small">
        로그인/회원가입
      </Button>
    </nav>
  );
}

export { NavBar };
