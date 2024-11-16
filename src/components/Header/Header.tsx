import { MenuIcon } from "lucide-react";
import { Divider } from "../Divider";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { Menu } from "../Menu";

type HeaderProps = {
  name?: string;
};

export const Header = ({ name }: HeaderProps) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 " aria-label="Sidebar">
      <IconButton>
        <MenuIcon size={24} />
      </IconButton>
      <Logo />
      <Divider height={7} />
      <Menu name="Soluções" />
    </div>
  );
};
