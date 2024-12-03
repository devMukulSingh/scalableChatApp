import ChatSection from "./components/ChatSection/ChatSection";
import ContactsSidebar from "./components/ContactSection/ContactsSidebar";

const page = () => {

  return (
    <div className="grid grid-cols-3 h-full w-screen">
      <ContactsSidebar/>
      <ChatSection/>
    </div>
  );
};

export default page;
