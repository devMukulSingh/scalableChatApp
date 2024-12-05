import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import ContactsSidebar from "./components/ContactSection/ContactsSidebar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 h-full w-screen">
        <ContactsSidebar />
        {children}
      </div>
    </>
  );
}
