"use client";
import ChatSectionMessages from "./ChatSectionMessages";
import MessageInputBar from "./MessageInputBar";

type Props = {};

const ChatSection = (props: Props) => {

  return (
    <div className="h-full  col-span-2 flex flex-col items-center p-5 gap-5 ">
      <ChatSectionMessages/>
      <MessageInputBar/>
    </div>
  );
};

export default ChatSection;
