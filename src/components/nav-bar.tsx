import { useNavigate } from "react-router-dom";

import { Logo } from "@/components/ui/logo";
import { Button } from "./ui/button";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[16px] pr-[20px] pb-[16px] pl-[22px]"
    >
      <Logo />
      <Button
        variant="outline"
        size="small"
        onClick={() => navigate("/pre-register")}
      >
        앱 사전 예약하기
      </Button>
    </nav>
  );
}

export { NavBar };
