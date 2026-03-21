import { Logo } from "@/components/ui/logo";

function NavBar() {
  return (
    <nav
      data-slot="nav-bar"
      className="flex items-center justify-between pt-[16px] pr-[20px] pb-[16px] pl-[22px]"
    >
      <Logo />
    </nav>
  );
}

export { NavBar };
