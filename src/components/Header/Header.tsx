"use client";

import { useSidebarStore } from "@/shared/store";
import { MenuIcon } from "lucide-react";
import { Divider } from "../Divider";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { Menu } from "../Menu";
import { Notification } from "../Notification";
import { User } from "../User";

export const Header = () => {
  const { toggleSidebar, isSidebarOpen } = useSidebarStore();

  return (
    <div className="app--header" aria-label="Sidebar">
      <div className="flex items-center gap-2 sm:gap-4 ">
        <IconButton
          aria-hidden={isSidebarOpen}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
          onClick={toggleSidebar}
        >
          <MenuIcon size={24} />
        </IconButton>
        <Logo />
        <Divider height={7} />
        <Menu name="Soluções" />
      </div>
      <div className="flex items-center gap-8">
        <Notification className="hidden sm:flex" />
        <User />
      </div>
    </div>
  );
};
