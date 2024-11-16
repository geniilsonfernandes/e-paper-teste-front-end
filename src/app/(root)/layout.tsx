import { Header } from "@/components/Header";
import { Notification } from "@/components/Notification";
import { User } from "@/components/User";
import React from "react";

// export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <div className="c-header" aria-label="Sidebar">
        <Header />
        <div className="flex items-center gap-8">
          <Notification className="hidden sm:flex" />
          <User />
        </div>
      </div>
      <div>sidebar</div>

      <section className="flex h-full flex-1 flex-col">
        ... main {children}
      </section>
      <footer>Footer</footer>
    </main>
  );
};
export default Layout;
