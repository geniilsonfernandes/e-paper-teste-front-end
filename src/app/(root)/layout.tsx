import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

// export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen relative">
      <Header />
      <div className="flex relative">
        <Sidebar className="app-sidebar" menuList={[{ title: "Documentos" }]} />
        <div className="app-content">{children}</div>
        <Footer />
      </div>
    </main>
  );
};
export default Layout;
