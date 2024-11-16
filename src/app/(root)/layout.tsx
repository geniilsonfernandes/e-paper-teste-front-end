import { User } from "@/components/User";
import React from "react";

// export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <div className="w-full c-header boder" aria-label="Sidebar">
        <User />
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
