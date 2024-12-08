import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import ContactsSidebar from "./components/ContactSection/ContactsSidebar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-neutral-950 grid grid-cols-3 h-full w-screen text-white">
        <ContactsSidebar />
        {children}
      </div>
    </>
  );
}
