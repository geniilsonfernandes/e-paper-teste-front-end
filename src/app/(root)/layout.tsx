import { Header } from "@/components/Header";
import React from "react";

// export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <Header />
      <div className="flex">
        {/* <Sidebar menuList={[{ title: "Documentos" }]} /> */}
        <section className="app-content">{children}</section>
      </div>
    </main>
  );
};
export default Layout;
