import { Logo } from "@/components/ui/logo";
import { Button } from "./ui/button";

function NavBar() {
  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[10px] pr-[20px] pb-[10px] pl-[22px]"
    >
      <Logo />
      <Button variant="outline" size="small">
        앱 사전 예약하기
      </Button>
    </nav>
  );
}

export { NavBar };
