import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1 pt-[72px] md:pt-[88px]">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
