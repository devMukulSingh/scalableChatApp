"use client";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { KeyboardEvent, useState } from "react";
import { useSocket } from "../../../../context/SocketProvider";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
type Props = {};

const MessageInputBar = (props: Props) => {
  const { receiverId } = useParams();
  const { userId: senderId } = useAuth();
  const onkeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnSend();
    }
  };
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleOnSend = () => {
    if (!receiverId || !senderId) {
      console.log(`Receiverid and senderId is required`);
      return;
    }
    sendMessage({  message, senderId, receiverId:receiverId.toString(),createdAt: new Date().toString(),id:"" });
    setMessage("");
  };
  return (
    <div className="w-full flex mt-auto gap-5">
      <Input
        autoFocus
        className="border-white border-2  px-5 py-2 w-full"
        onKeyUp={onkeyUp}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />

      <Button
        disabled={message.trim() === ""}
        onClick={handleOnSend}
        className="bg-white px-4 py-2 text-black rounded-md"
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInputBar;
