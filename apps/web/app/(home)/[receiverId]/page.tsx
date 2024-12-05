'use client'
import ChatSectionMessages from "./components/ChatSectionMessages";
import MessageInputBar from "./components/MessageInputBar";


type Props = {};

const ChatPage = (props: Props) => {


  return (
    <div className="h-full  col-span-2 flex flex-col items-center p-5 gap-5 ">
      <ChatSectionMessages />
      <MessageInputBar />
    </div>
  );
};

export default ChatPage;
