import { Logo } from "@/components/ui/logo";
import { Button } from "./ui/button";
import { usePreRegister } from "@/pages/pre-register/components/pre-register-provider";

function NavBar() {
  const { open } = usePreRegister();

  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[16px] pr-[20px] pb-[16px] pl-[22px]"
    >
      <Logo />
      <Button variant="outline" size="small" onClick={open}>
        앱 런칭 사전예약
      </Button>
    </nav>
  );
}

export { NavBar };
